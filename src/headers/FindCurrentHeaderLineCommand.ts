import { App, Notice, Command } from 'obsidian';
import EditorHelper from '../Helpers/EditorHelper';
import { SharpenerCommand } from '../Commons/types';

export class FindCurrentHeaderLineCommand extends SharpenerCommand {
	id = 'find-current-header-line';
	name = 'Find Current Header Line';
	prefix = 'fchl';
	command: Command;

	async execute(app: App): Promise<void> {
		const editorHelper = new EditorHelper(app);

		const headerLine = editorHelper.findCurrentHeaderLine();
		if (headerLine !== null) {
			editorHelper.moveToLineAndScroll(headerLine);
		} else {
			new Notice('No current header line found.');
		}
	}
} 