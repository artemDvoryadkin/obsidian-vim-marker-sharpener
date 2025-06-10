import { Command, App } from 'obsidian';
import { EditorHelper } from 'src/Helpers/EditorHelper';
import { MarkerCommandBase } from './MarkerCommandBase';


export class PreviousMarkerCommand extends MarkerCommandBase {
	id = 'previous-marker';
	name = 'Previous marker';
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
