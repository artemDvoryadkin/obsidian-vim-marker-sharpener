import { App, Command } from 'obsidian';
import { SharpenerCommand } from './Commons/types';

export class CloseAndSwitchTabCommand extends SharpenerCommand {
	id = 'close-and-switch-tab';
	name = 'Close Current Tab and Switch to Next';
	prefix = '`cs';
	command: Command;

	async execute(app: App): Promise<void> {
		const leaves = app.workspace.getLeavesOfType('markdown');
		const activeLeaf = app.workspace.activeLeaf;

		if (activeLeaf) {
			const currentIndex = leaves.indexOf(activeLeaf);
			const nextIndex = (currentIndex + 1) % leaves.length;
			const nextLeaf = leaves[nextIndex];

			await activeLeaf.detach();
			app.workspace.setActiveLeaf(nextLeaf, { focus: true });
		}
	}
} 