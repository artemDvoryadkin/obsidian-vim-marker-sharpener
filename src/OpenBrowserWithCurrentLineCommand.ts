import { App, Notice, MarkdownView, Command } from 'obsidian';
import { RenameFileCommand } from './RenameFileCommand';
import { SharpenerCommand } from './Commons/types';

export class OpenBrowserWithCurrentLineCommand extends SharpenerCommand {
	id = 'open-browser-with-current-line';
	name = 'Open Browser with Current Line';
	prefix = 'obcl';
	command: Command;

	async execute(app: App): Promise<void> {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice('No active editor found.');
			return;
		}

		//const editor = activeView.editor;
		//		const cursor = editor.getCursor();
		//%	const currentLine = editor.getLine(cursor.line).trim();
		/*
				if (!currentLine) {
					new Notice('No content on the current line.');
					return;
				}
		*/
		const file = activeView.file;
		if (!file) {
			new Notice('No active file found.');
			return;
		}

		const basename = file.basename;
		const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter || {};
		let file_id = frontmatter.file_id;
		if (!file_id) {
			await (new RenameFileCommand(this.plugin)).execute(app);
			file_id = frontmatter.file_id;
		}

		const url = `https://chat.openai.com/?q="${basename}",дай определение, справку не менее 5000 символов, обязательно отдельно укажи ссылку на домашнюю страницу и страницу википедии.В конце статьи добавь блок "Популярные Альтернативы".
		---
		[заголовки начинай со второго уровня]
		---
		file: ${basename}
		file_id: ${file_id}
		prompt_version: 2`.replace(/\n/g, '%0A').replace(/ /g, '%20');

		window.open(url, '_blank');
		new Notice('Opened browser with current line content.');

		// Attempt to refocus on the Obsidian app
		setTimeout(() => {
			//window.open('obsidian://open?vault=obsidian-chatgpt&file=obsidian-chatgpt', '_self');
			window.open('obsidian://open?vault=HH.Obsidian', '_self');
		}, 500); // Adjust the timeout as needed
	}
}
/*
https://chatgpt.com/backend-api
67a75dcb-9cb4-8008-b67b-71d3ca36eb8e
https://chatgpt.com/backend-api/c/67a75dcb9cb48008b67b71d3ca36eb8e
*/