import { App, Command, TFile } from 'obsidian';
import EditorHelper from '../../Helpers/EditorHelper';
import { BasePdfToMdCommand } from './BasePdfToMdCommand';
import { FileHelper } from 'src/Helpers/FileHelpers';
import { OpenPdfPageCommand } from './OpenPdfPageCommand';

export class PageDownCommand extends BasePdfToMdCommand {
	id = 'PageDown-in-MD-file';
	name = 'Next Page in MD File';
	prefix = 'pdc';
	command: Command;

	check(app: App, checking: boolean): boolean {
		if (checking) return true

		if (!checking) this.execute(app)

		return true
	}

	execute(app: App): void {
		if (!this.check(app, true)) return;

		const helper = new EditorHelper(app);
		helper.pageDown(this.linesInPage);

		const fileHelper = new FileHelper(app)
		const currnetFileTFile = fileHelper.getActiveTFile()
		if (currnetFileTFile) {
			const frontmatter = fileHelper.getFrontmatter(currnetFileTFile)
			const result = frontmatter[this.frontmannter_syncpage_attribute]

			if (result == "true" || result) {
				const openPdfPage = new OpenPdfPageCommand(this.plugin)
				openPdfPage.execute(app)
			}

			console.log({ frontmatter, result })
		}
	}
}
