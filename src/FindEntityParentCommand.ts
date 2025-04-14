import { App, Notice, MarkdownView, Command } from 'obsidian';
import { SharpenerCommand } from './Commons/types';

export class FindEntityParentCommand extends SharpenerCommand {
	id = 'find-entity-parent';
	name = 'Find Entity Parent';
	prefix = 'fep';
	command: Command;
	async execute(app: App): Promise<void> {
		const activeFile = app.workspace.getActiveFile();
		if (!activeFile) {
			new Notice('No active file to search.');
			return;
		}

		const frontmatter: any = app.metadataCache.getFileCache(activeFile)?.frontmatter || {};
		const entityParentItem = frontmatter["entity_ParentItem"];
		const parentItem = Array.isArray(entityParentItem) ? entityParentItem[0] : entityParentItem;
		if (!parentItem) {
			new Notice('No entity parent item found in frontmatter.');
			return;
		}

		const foundPages = await this.findPages(app, parentItem);
		console.log(foundPages)
		new Notice(`Found pages: ${foundPages.join(', ')}`);

		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice('No active editor found.');
			return;
		}

		new Notice(`Found pages saved under 'path' header.`);
	}

	private async findPages(app: App, parentItem: string, foundPages: string[] = []): Promise<string[]> {
		console.log(parentItem)
		const files = app.vault.getMarkdownFiles();
		for (const file of files) {
			const frontmatter: any = app.metadataCache.getFileCache(file)?.frontmatter || {};
			const entityParentItem = frontmatter["entity_ParentItem"];
			if (entityParentItem && Array.isArray(entityParentItem) && entityParentItem.includes(parentItem)) {
				console.log("entityParentITem", entityParentItem)
				foundPages.push(file.path);
				await this.findPages(app, file.basename, foundPages);
			}
		}
		return foundPages;
	}
} 