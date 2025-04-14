import { App, Notice, Command, TFile } from 'obsidian';
import { SharpenerCommand } from '../../Commons/types';
import EditorHelper from '../../Helpers/EditorHelper';
import { FileHelper } from 'src/Helpers/FileHelpers';

export class ExtractSelectedTextCommand extends SharpenerCommand {
	id = 'extract-selected-text';
	name = 'Extract Selected Text';
	prefix = 'est';
	command: Command;

	async execute(app: App): Promise<void> {
		const activeFile = app.workspace.getActiveFile();
		if (!activeFile) {
			new Notice('No active file to extract text from.');
			return;
		}

		if (!activeFile.parent) {
			new Notice('Active file has no parent directory.');
			return;
		}

		// Create a new file
		const newFileName = `Extracted_${activeFile.basename}.md`;
		const newFilePath = `${activeFile.parent.path}/${newFileName}`;
		let newFile = app.vault.getAbstractFileByPath(newFilePath)
		if (!newFile) {
			newFile = await app.vault.create(newFilePath, '');
		}

		const markdownPattern = /([*_~]{1,2})(.*?)\1/g;
		const fileContent = await app.vault.read(activeFile);
		const fileCache = app.metadataCache.getFileCache(activeFile);
		console.log("fileCache", fileCache)

		const fileHelper = new FileHelper(app)
		const headersExt = fileHelper.getHeadingsExt(activeFile as TFile)

		const lines = fileContent.split('\n');
		let newContent = ''
		const fileCacheContent = await app.vault.cachedRead(activeFile)

		headersExt.forEach(headingExt => {
			const contentLinesOfHeader = lines.slice(headingExt.positionContentStartLine, headingExt.positionContentEndLine)


			console.log(headingExt)
			headingExt.sections.forEach(section => {
				const selectedText = fileHelper.getContentBySectionAndContent(fileCacheContent, section)
				const ifd = markdownPattern.test(selectedText)

				if (ifd) {
					headingExt.selectedText += selectedText
					headingExt.hasCildrenSelectedText = true

					let parent = headingExt.parentHeading;
					while (parent && !parent.hasCildrenSelectedText) {
						parent.hasCildrenSelectedText = true;
						parent = parent.parentHeading;
					}
				}
			})
		})

		headersExt.forEach(headingExt => {
			if (headingExt.hasCildrenSelectedText) {
				newContent += "\n\n" + "#".repeat(headingExt.level) + ' ' + headingExt.heading + '\n\n'
				newContent += headingExt.selectedText
			}
		})


		await app.vault.modify(newFile as TFile, newContent);

		new Notice(`Selected text extracted to: ${newFilePath}`);
	}
} 