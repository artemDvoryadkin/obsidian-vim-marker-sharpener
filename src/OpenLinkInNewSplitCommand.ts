import { App, Notice, Command, TFile } from 'obsidian';
import { SharpenerCommand } from './Commons/types';
import EditorHelper from './Helpers/EditorHelper';

export class OpenLinkInNewSplitCommand extends SharpenerCommand {
	id = 'open-link-in-new-split';
	name = 'Open Link in New Split';
	prefix = 'olns';
	command: Command;

	async execute(app: App): Promise<void> {

		const activeFile = app.workspace.getActiveFile();
		if (!activeFile) {
			new Notice('No active file to open link from.');
			return;
		}

		const editorHelper = new EditorHelper(app);
		const editor = editorHelper.getEditor();
		const cursor = editor.getCursor();
		const line = editor.getLine(cursor.line);
		// TODO: линки у который в названии [ ввв] есть скобки не работают
		const linkPattern = /\[\[(.*?)?(\|.*)?\]\]/g;
		//const linkPattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

		let match;
		let linkFound = false;

		while ((match = linkPattern.exec(line)) !== null) {
			const linkStart = match.index;
			console.log("match", match)
			const linkEnd = linkStart + match[0].length;

			if (cursor.ch >= linkStart && cursor.ch <= linkEnd) {
				linkFound = true;
				const linkText = match[1];
				console.log("linkText", linkText)
				const file = app.metadataCache.getFirstLinkpathDest(linkText, activeFile.path);
				if (!file) {
					new Notice('Linked file not found.');
					return;
				}

				const currentLeaf = app.workspace.getMostRecentLeaf();
				const newLeaf = editorHelper.splitLiafVertical(file.path, false, false);

				if (currentLeaf) app.workspace.setActiveLeaf(currentLeaf, { focus: true });

				new Notice(`Link opened in new split: ${file.path}`);
				break;
			}
		}

		if (!linkFound) {
			new Notice('Cursor is not on a link.');
		}
	}
} 