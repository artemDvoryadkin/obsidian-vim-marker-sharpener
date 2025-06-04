import { Command, App } from 'obsidian';
import { MarkerCommandBase } from './MarkerCommandBase';
import { EditorHelper } from 'src/Helpers/EditorHelper';
import { FormaterCommanger } from 'src/Helpers/FormaterHelper';
import { ParserMarkdown } from 'src/Helpers/ParserMarkdown';

export class ClearMarkerCommand extends MarkerCommandBase {
	id = 'clear-marker';
	name = 'Clear Marker';
	prefix = '';

	command: Command;

	async execute(app: App): Promise<void> {
		const editorHelper = new EditorHelper(app);
		const cursor = editorHelper.getCursor();
		const lineText = editorHelper.getLineByCursor();

		const formaterCommanger = new FormaterCommanger();
		const resultCall = formaterCommanger.makerClear(lineText, cursor.ch)
		if (resultCall.lineText != lineText) {
			editorHelper.replaseLine(resultCall.lineText, cursor.line);
			editorHelper.setCursor(cursor);
		}
	}
}

export class PreviousMarkerCommand extends MarkerCommandBase {
	id = 'previous-marker';
	name = 'Previous Marker';
	prefix = '';
	command: Command;

	async execute(app: App): Promise<void> {
		const editorHelper = new EditorHelper(app);

		const cursor = editorHelper.getCursor();
		const previousMarker = editorHelper.getPreviousMarker(cursor);
		if (previousMarker) {
			editorHelper.setCursor(previousMarker);
		}
	}
}
export class NextMarkerCommand extends MarkerCommandBase {
	id = 'next-marker';
	name = 'Next Marker';
	prefix = '';
	command: Command;

	async execute(app: App): Promise<void> {
		const editorHelper = new EditorHelper(app);

		const cursor = editorHelper.getCursor();
		const nextMarker = editorHelper.getNextMarker(cursor);
		if (nextMarker) {
			editorHelper.setCursor(nextMarker);
		}
	}
}
export class BoldCommand extends MarkerCommandBase {
	id = 'toggle-bold';
	name = 'Toggle Bold';
	prefix = '';
	command: Command;

	async execute(app: App): Promise<void> {
		await this.executeBase(app, 'bold');
	}
}
