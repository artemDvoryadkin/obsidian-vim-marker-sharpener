import { App, MarkdownView, Command } from 'obsidian';
import { SharpenerCommand } from './Commons/types';

export class SplitAndCloseTabCommand extends SharpenerCommand {
	id = 'split-and-close-tab';
	name = 'Split Current Tab Vertically and Close';
	prefix = '`sc';
	command: Command;
	async execute(app: App): Promise<void> {
		const markdownView = app.workspace.getActiveViewOfType(MarkdownView);

		if (markdownView) {
			const file = markdownView.file;
			const newLeaf = app.workspace.getLeaf('split', 'vertical');
			if (file) {
				await newLeaf.openFile(file);
				app.workspace.setActiveLeaf(newLeaf, { focus: true });
			}
			markdownView.leaf.detach();
		}
	}
} 