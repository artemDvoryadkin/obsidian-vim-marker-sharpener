import { TFile } from 'obsidian';
import { App } from 'obsidian';
import { SharpenerCommand } from 'src/Commons/types';
import { FileHelper } from 'src/Helpers/FileHelpers';


export abstract class BasePdfToMdCommand extends SharpenerCommand {

	linesInPage = 40;
	frontmannter_source_attribute = "pdftomd_source";
	frontmannter_target_attribute = "pdftomd_target";
	frontmannter_syncpage_attribute = "pdftomd_syncpage";
	openPdfLeft = true;

	isPdfToMdFile(app: App): boolean {
		const fileHelper = new FileHelper(app);
		const activeFile = app.workspace.getActiveFile();

		if (activeFile) {
			const frontmatter = fileHelper.getFrontmatter(activeFile as TFile);
			const pdftomd_source = frontmatter[this.frontmannter_source_attribute] as string;
			if (pdftomd_source) {
				return true;
			}
		}
		return false;
	}
}
