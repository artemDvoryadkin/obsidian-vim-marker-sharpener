import { App, Notice, Command } from 'obsidian';
import EditorHelper from '../Helpers/EditorHelper';
import { SharpenerCommand } from '../Commons/types';

export class FindNextHeaderWithCurrentLevelCommand extends SharpenerCommand {
	id = 'find-next-header-with-current-level';
	name = 'Find Next Header With Current Level';
	prefix = 'fnhcl';
	command: Command;

	async execute(app: App): Promise<void> {
		const editorHelper = new EditorHelper(app);


		const headerLine = editorHelper.findNextHeaderWithCurrentLevel();
		if (headerLine !== null) {
			editorHelper.moveToLineAndScroll(headerLine);
		} else {
			new Notice('No next header with current level found.');
		}
	}
} 