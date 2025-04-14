import { App, Command, WorkspaceLeaf } from 'obsidian';
import { SharpenerCommand } from './Commons/types';

export class CloseRightLeavesCommand extends SharpenerCommand {
	id = 'close-right-leaves-command';
	name = 'Close Right Leaves Command';
	prefix = 'scr';

	async execute(app: App): Promise<void> {
		const activeLeaf = app.workspace.getMostRecentLeaf();
		if (!activeLeaf) return;

		let foundActiveLeaf = false;
		let isFounded = true

		while (isFounded) {
			isFounded = false
			app.workspace.iterateAllLeaves(leaf => {
				if (leaf === activeLeaf) {
					foundActiveLeaf = true;
					leaf.setGroup("tessssgroup")
				} else if (foundActiveLeaf) {
					if (leaf.getViewState().type === 'markdown' || leaf.getViewState().type === 'pdf') {
						leaf.detach()
						isFounded = true
					}
				}
			});
		}
	}
} 