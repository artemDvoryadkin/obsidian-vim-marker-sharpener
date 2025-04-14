import { App, Notice, Command } from 'obsidian';
import EditorHelper from '../Helpers/EditorHelper';
import { SharpenerCommand } from '../Commons/types';

export class FindHeaderAboveCommand extends SharpenerCommand {
	id = 'find-header-above';
	name = 'Find Header Above';
	prefix = 'fha';
	command: Command;

	async execute(app: App): Promise<void> {
		const editorHelper = new EditorHelper(app);

		const headerLine = editorHelper.findHeaderAbove();
		console.log({ headerLine })
		if (headerLine !== null) {
			editorHelper.moveToLineAndScroll(headerLine);
		} else {
			new Notice('No header found above.');
		}
	}
} 