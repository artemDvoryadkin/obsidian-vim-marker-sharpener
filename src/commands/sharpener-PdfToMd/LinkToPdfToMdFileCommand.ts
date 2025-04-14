
import { App, Command, } from 'obsidian';
import EditorHelper from '../../Helpers/EditorHelper';
import { BasePdfToMdCommand } from './BasePdfToMdCommand';
import { FileHelper } from 'src/Helpers/FileHelpers';

export class LinkToPdfToMdFileCommand extends BasePdfToMdCommand {
	id = 'LinkToPdfToMdFile';
	name = 'Open Linked to PDF to MD File';
	prefix = 'pdf';
	command: Command;

	execute(app: App): void {

		console.log("check2", true);

		const fileHelper = new FileHelper(app);
		const activeFilePath = fileHelper.getActiveTFile()?.basename;
		const editorHelper = new EditorHelper(app);
		editorHelper.getEditor().getValue
		if (fileHelper.isPdfFileActive() && activeFilePath) {

			const files = fileHelper.getAllFileHasFrontmatterAttributeAndValue(this.frontmannter_source_attribute, activeFilePath)
			console.log("files", files);
			files.forEach(file => {
				editorHelper.splitLiafVertical(file.path);
			});
		}
	}

	check(app: App, checking: boolean): boolean {
		console.log("check", checking);

		if (checking) {
			const fileHelper = new FileHelper(app);
			const activeFilePath = fileHelper.getActiveTFile()?.basename;
			console.log("activeFilePath", activeFilePath);
			if (fileHelper.isPdfFileActive() && activeFilePath) {

				const files = fileHelper.getAllFileHasFrontmatterAttributeAndValue(this.frontmannter_source_attribute, activeFilePath);

				return files.length > 0;
			}

			return false;
		}

		if (this.check(app, true)) {
			this.execute(app);
			return true;
		}

		return false;
	}
}