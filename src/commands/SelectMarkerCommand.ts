import { Command, App } from 'obsidian';
import { EditorHelper } from 'src/Helpers/EditorHelper';
import { FormaterCommanger } from 'src/Helpers/FormaterHelper';
import { MarkerCommandBase } from './MarkerCommandBase';
import '../Commons/dev-global';

declare const __DEV__: boolean;

export class SelectMarkerCommand extends MarkerCommandBase {
	id = 'select-marker';
	name = 'Select marker';
	prefix = '';
	command: Command;

	async execute(app: App): Promise<void> {
		const editorHelper = new EditorHelper(app);
		const cursor = editorHelper.getCursor();
		const lineText = editorHelper.getLineByCursor();

		const formaterCommanger = new FormaterCommanger();
		const resultCall = formaterCommanger.getMarkerPosition(lineText, cursor.ch);
		__DEV__ && console.log("resultCall", resultCall);
		const anchor = { line: cursor.line, ch: resultCall.from }

		const head = { line: cursor.line, ch: resultCall.to }

		if (lineText.length > head.ch) head.ch += 1

		__DEV__ && console.log("resultCall", { anchor, head });
		editorHelper.editor!.setSelection(anchor, head);
	}
}
