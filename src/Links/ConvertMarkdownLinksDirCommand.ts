import { App, Notice, Command } from 'obsidian';
import LinkHelper from '../Helpers/LinkHelper';
import { MarkdownView } from 'obsidian';
import { SharpenerCommand } from '../Commons/types';

export class ConvertMarkdownLinksDirCommand extends SharpenerCommand {
	id = 'convert-markdown-links-dir';
	name = 'Convert Markdown Links in Directory to Short Links';
	prefix = 'cmd';
	command: Command;
	async execute(app: App): Promise<void> {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice('No active editor found.');
			return;
		}

		const activeFile = activeView.file;
		if (!activeFile || !activeFile.parent) {
			new Notice('No active file or directory found.');
			return;
		}

		const directoryPath = activeFile.parent.path;
		const markdownFiles = app.vault.getMarkdownFiles().filter(file => file.parent?.path === directoryPath);

		for (const file of markdownFiles) {
			const content = await app.vault.read(file);
			const linker = new LinkHelper( app);
			const newContent = linker.convertMarkdownLinksToObsidianLinks(content);
			await app.vault.modify(file, newContent);
		}

		new Notice('Markdown links in directory converted to short links.');
	}
} 