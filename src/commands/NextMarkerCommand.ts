import { Command, App } from 'obsidian';
import { EditorHelper } from 'src/Helpers/EditorHelper';
import { MarkerCommandBase } from './MarkerCommandBase';


export class NextMarkerCommand extends MarkerCommandBase {
	id = 'next-marker';
	name = 'Next marker';
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
