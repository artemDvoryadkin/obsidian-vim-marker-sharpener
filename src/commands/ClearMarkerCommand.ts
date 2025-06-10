import { Command, App } from 'obsidian';
import { EditorHelper } from 'src/Helpers/EditorHelper';
import { FormaterCommanger } from 'src/Helpers/FormaterHelper';
import { MarkerCommandBase } from './MarkerCommandBase';


export class ClearMarkerCommand extends MarkerCommandBase {
	id = 'clear-marker';
	name = 'Clear marker';
	prefix = '';

	command: Command;

	async execute(app: App): Promise<void> {
		const editorHelper = new EditorHelper(app);
		const cursor = editorHelper.getCursor();
		const lineText = editorHelper.getLineByCursor();

		const formaterCommanger = new FormaterCommanger();
		const resultCall = formaterCommanger.makerClear(lineText, cursor.ch);
		if (resultCall.lineText != lineText) {
			editorHelper.replaseLine(resultCall.lineText, cursor.line);
			editorHelper.setCursor(cursor);
		}
	}
}
