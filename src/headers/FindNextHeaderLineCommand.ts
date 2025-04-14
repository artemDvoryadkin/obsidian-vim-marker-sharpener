import { App, Notice, Command } from 'obsidian';
import EditorHelper from '../Helpers/EditorHelper';
import { SharpenerCommand } from '../Commons/types';

export class FindNextHeaderLineCommand extends SharpenerCommand {
	id = 'find-next-header-line';
	name = 'Find Next Header Line';
	prefix = 'fnhl';
	command: Command;

	async execute(app: App): Promise<void> {
		const editorHelper = new EditorHelper(app);


		const headerLine = editorHelper.findNextHeaderLine();
		if (headerLine !== null) {
			editorHelper.moveToLineAndScroll(headerLine);
		} else {
			new Notice('No next header line found.');
		}
	}
} 