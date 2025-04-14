import { App, Notice, Command } from 'obsidian';
import EditorHelper from '../Helpers/EditorHelper';
import { SharpenerCommand } from '../Commons/types';

export class FindPreviousHeaderWithCurrentLevelCommand extends SharpenerCommand {
	id = 'find-previous-header-with-current-level';
	name = 'Find Previous Header With Current Level';
	prefix = 'fphcl';
	command: Command;
	async execute(app: App): Promise<void> {
		const editorHelper = new EditorHelper(app);

		const headerLine = editorHelper.findPreviousHeaderWithCurrentLevel();
		if (headerLine !== null) {
			editorHelper.moveToLineAndScroll(headerLine);
		} else {
			new Notice('No previous header with current level found.');
		}
	}
} 