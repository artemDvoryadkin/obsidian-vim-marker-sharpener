import { App, Notice, Command } from 'obsidian';
import LinkHelper from '../Helpers/LinkHelper';
import { MarkdownView } from 'obsidian';
import { SharpenerCommand } from '../Commons/types';

export class ConvertMarkdownLinksCommand extends SharpenerCommand {
	id = 'convert-markdown-links';
	name = 'Convert Markdown Links to Short Links';
	prefix = 'cml';
	command: Command;

	async execute(app: App): Promise<void> {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice('No active editor found.');
			return;
		}

		const editor = activeView.editor;
		const activeFile = activeView.file;
		if (!activeFile) {
			new Notice('No active file found.');
			return;
		}

		const content = await app.vault.read(activeFile);
		let newContent = content;
		/*
		
				const pattern = /\[([^\]]*?)\]\((.*?\.md)\)/g;
				let match;
		
				while ((match = pattern.exec(content)) !== null) {
					const [fullMatch, alias, link] = match;
					const decodedLink = decodeURIComponent(link);
		
					console.log("decodedLink", { fullMatch, alias, link, decodedLink });
					if (alias !== "") {
						const files = app.vault.getMarkdownFiles().filter(file =>
							(file.path.replace('.md', '') == alias || file.basename == alias) && file.name == link
							|| file.name === decodedLink);
		
						if (files.length == 1) {
							const replacement = `[[${files[0].basename}|${alias}]]`;
							newContent = content.replace(fullMatch, replacement);
							continue
						}
					}
					else if (decodedLink.endsWith('.md') && alias === decodedLink.slice(0, -3)) {
						const replacement = `[[${alias}]]`;
						newContent = newContent.replace(fullMatch, replacement);
					}
					else {
						const replacement = `[[${decodedLink.slice(0, -3)}|${alias}]]`;
						newContent = newContent.replace(fullMatch, replacement);
					}
				}
					*/
		const linker = new LinkHelper( app);
		const linkers = linker.extractLinks(content);
		console.log("linkers", { linkers });
		newContent = linker.convertMarkdownLinksToObsidianLinks(content);
		//console.log("newContent", newContent);
		await app.vault.modify(activeFile, newContent);
		new Notice('Markdown links converted to short links.');
	}
} 