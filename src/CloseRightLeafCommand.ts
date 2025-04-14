import { App, Notice, WorkspaceLeaf } from 'obsidian';
import { SharpenerCommand } from './Commons/types';

export class CloseRightLeafCommand extends SharpenerCommand {
	id = 'close-right-leaf-command';
	name = 'Close Right Leaf Command';
	prefix = 'crl';

	async execute(app: App): Promise<void> {
		const activeLeaf = app.workspace.activeLeaf;
		if (!activeLeaf) {
			new Notice('No active leaf found.');
			return;
		}

		let rightLeaf: WorkspaceLeaf | null = null;
		let foundActiveLeaf = false;

		app.workspace.iterateAllLeaves(leaf => {
			if (leaf === activeLeaf) {
				foundActiveLeaf = true;

				leaf.setGroup("tessssgroup2222<(8888+<(88888882")
				console.log("leaf", leaf)
			} else if (foundActiveLeaf) {
				if (leaf.getViewState().type === 'markdown' || leaf.getViewState().type === 'pdf') {

					rightLeaf = leaf;
					return true; // Stop iteration
				}
			}
		});

		if (!rightLeaf) {
			new Notice('No leaf to the right to close.');
			return;
		}

		(rightLeaf as WorkspaceLeaf).detach()
		new Notice('Right leaf closed.');
	}
} 