import { App, Notice, Command } from 'obsidian';
import { SharpenerCommand } from './Commons/types';

export class RenameBasedOnFrontmatterCommand extends SharpenerCommand {
	id = 'rename-based-on-frontmatter';
	name = 'Rename Based on Frontmatter';
	prefix = 'rbof';
	command: Command;
	async execute(app: App): Promise<void> {
		const activeFile = app.workspace.getActiveFile();
		if (!activeFile) {
			new Notice('No active file to rename.');
			return;
		}

		const frontmatter: any = app.metadataCache.getFileCache(activeFile)?.frontmatter || {};
		const fileTypeMd = frontmatter["file_type-md"] || frontmatter["file_type"];
		let newFileName = "";

		switch (fileTypeMd) {
			case '#article':
				newFileName = '03.Articles/01.Site/';
				break;
			case '#youtube':
				newFileName = '03.Articles/02.Youtube/';
				break;
			case '#telegram-post':
				newFileName = '03.Articles/03.Telegram-post/';
				break;
			case '#chatgpt':
				newFileName = '03.Articles/42.ChatGPT/ø ';
				break;
			case '#entity':
				newFileName = '01.Entities/';
				break;
			case '#moc':
				newFileName = '01.Entities/MoC/µ ';
				break;
			case '#book':
				newFileName = '02.Books/09.Backlog';
				break;
			case '#project':
				newFileName = '04.Projects/';
				break;
			default:
				new Notice('Unknown file type.');
				return;
		}

		newFileName += activeFile.basename + ".md";

		try {
			const filenameold = activeFile.path
			console.log("rename", { filenameold, newFileName })
			if (filenameold !== newFileName) {

				const fileExists = app.vault.getAbstractFileByPath(newFileName);
				if (fileExists) {
					new Notice(`A file with the name ${newFileName} already exists.`);
					return;
				}

				await app.fileManager.renameFile(activeFile, newFileName);
				new Notice(`File successfully moved to ${newFileName}`);
			} else {
				new Notice('The new file name is the same as the current one. No renaming needed.');
			}
		} catch (error) {
			console.error("Error moving file:", error);
		}
	}
} 