import { App, Command, TFile } from 'obsidian';
import EditorHelper from '../../Helpers/EditorHelper';
import { BasePdfToMdCommand } from './BasePdfToMdCommand';
import { FileHelper } from 'src/Helpers/FileHelpers';
import { OpenPdfPageCommand } from './OpenPdfPageCommand';
import { PdfToMdHelper } from './PdfToMdHelper';

export class SyncMdAndPagePdfCommand extends BasePdfToMdCommand {
	id = 'SyncMdAndPagePdf';
	name = 'SyncMdAndPagePdf';
	prefix = '';
	command: Command;
	private pdfToMdHelper: PdfToMdHelper;


	check(app: App, checking: boolean): boolean {

		console.log("```%1$")
		if (checking)
			return true

		this.execute(app)
		return true
		/*
		this.pdfToMdHelper = new PdfToMdHelper(app)
		const activeFile = this.pdfToMdHelper.getActiveTFile()
		if (checking) {
			if (activeFile)
				return this.pdfToMdHelper.isFilePdfToMd(activeFile)

			return false
		}

		if (!checking) this.execute(app)

		return true
		*/
	}

	async execute(app: App): Promise<void> {
		try {
			console.log("```%2")
			//if (!this.check(app, true)) return;
			console.log("```%3")

			this.pdfToMdHelper = new PdfToMdHelper(app)
			const activeFile = this.pdfToMdHelper.getActiveTFile()!
			const fileHelper = new FileHelper(app)
			const syncpage = fileHelper.getFrontmatter(activeFile)[this.frontmannter_syncpage_attribute]

			console.log("```%4", syncpage)
			await app.fileManager.processFrontMatter(activeFile, (frontmatter) => {
				if (syncpage) {
					delete frontmatter[this.frontmannter_syncpage_attribute]
				}
				else {
					frontmatter[this.frontmannter_syncpage_attribute] = true
				}
			});
			console.log("```%5")


		} catch (error) {
			console.error('Error executing scripts:', error);
			return;
		}
	}
}