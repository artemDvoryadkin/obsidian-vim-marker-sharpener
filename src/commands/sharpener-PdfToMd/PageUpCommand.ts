import { App, Command, } from 'obsidian';
import EditorHelper from '../../Helpers/EditorHelper';
import { BasePdfToMdCommand } from './BasePdfToMdCommand';
import { FileHelper } from 'src/Helpers/FileHelpers';
import { OpenPdfPageCommand } from './OpenPdfPageCommand';


export class PageUpCommand extends BasePdfToMdCommand {
	id = 'PageUp-in-MD-file';
	name = 'Prev Page in MD File';
	prefix = 'puc';
	command: Command;

	execute(app: App): void {
		const helper = new EditorHelper(app);
		helper.pageUp(this.linesInPage);
		const fileHelper = new FileHelper(app)
		const currnetFileTFile = fileHelper.getActiveTFile()
		if (currnetFileTFile) {
			const frontmatter = fileHelper.getFrontmatter(currnetFileTFile)
			const result = frontmatter["pdftomd_syncpage"]

			if (result == "true" || result) {
				const openPdfPage = new OpenPdfPageCommand(this.plugin)
				openPdfPage.execute(app)
			}

			console.log({ frontmatter, result })
		}
	}

	check(app: App, checking: boolean): boolean {
		if (checking) {
			//return this.isPdfToMdFile(app);
			return true;
		}
		else {
			//if (this.isPdfToMdFile(app)) {
			this.execute(app);
			return true;
			//}
			//return false;
		}
	}
} 