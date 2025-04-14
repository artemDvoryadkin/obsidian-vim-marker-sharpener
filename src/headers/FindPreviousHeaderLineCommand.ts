import { App, Notice, Command } from 'obsidian';
import EditorHelper from '../Helpers/EditorHelper';
import { SharpenerCommand } from '../Commons/types';

export class FindPreviousHeaderLineCommand extends SharpenerCommand {
	id = 'find-previous-header-line';
	name = 'Find Previous Header Line';
	prefix = 'fphl';
	command: Command;

	async execute(app: App): Promise<void> {
		const editorHelper = new EditorHelper(app);


		const headerLine = editorHelper.findPreviousHeaderLine();
		if (headerLine !== null) {
			editorHelper.moveToLineAndScroll(headerLine);
		} else {
			new Notice('No previous header line found.');
		}
	}
} 