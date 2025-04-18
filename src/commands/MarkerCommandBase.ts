import { Command, App, EditorPosition } from 'obsidian';
import { SharpenerCommand } from 'src/Commons/SharpenerCommand';
import EditorHelper from 'src/Helpers/EditorHelper';
import { MarkerAction, FormaterCommanger } from 'src/Helpers/FormaterHelper';


export abstract class MarkerCommandBase extends SharpenerCommand {
	command: Command;

	async executeBase(app: App, markerAction: MarkerAction): Promise<void> {

		//ставим ервым так как елси ктото всызовет измение leaf ,то выделение пропадет
		const selectedVim = this.plugin.currentSelection;

		const editorHelper = new EditorHelper(app);
		editorHelper.editor

		const formatterCommanger = new FormaterCommanger();

		const isSelected = selectedVim && selectedVim[0].anchor.ch != selectedVim[0].head.ch;

		const head = isSelected && selectedVim[0].head;

		if (isSelected) {
			let from = selectedVim[0].head as EditorPosition;
			let to = selectedVim[0].anchor as EditorPosition;

			if (from.ch == -1) from.ch = 0;

			if (from.line > to.line || from.line == to.line && from.ch > to.ch)
				[from, to] = [to, from];

			const lines = editorHelper.getLinesFromTo(from.line, to.line);

			// так как при выделении строки в режиме линий, передается /r и длинна ch больше на 1 нужно его уменьшить
			if (lines.length > 1) {
				const lastLine = lines[lines.length - 1];
				if (lastLine.length <= to.ch) to.ch = lastLine.length - 1;
			}

			const selected = { anchor: { ch: from.ch, line: from.line }, head: { ch: to.ch - 1, line: to.line } };
			const newLinesText = formatterCommanger.markerMultiline(markerAction, lines, selected);

			let changesLines = false;
			for (let i = 0; i < newLinesText.length; i++) {
				if (i == 0) from.ch = newLinesText[i].fromSelectPosition;
				if (i == newLinesText.length - 1) to.ch = (newLinesText[i].toSelectPosition ?? newLinesText[i].lineText.length);
				if (newLinesText[i].lineText != lines[i]) {
					changesLines = true;
				}
			}

			const linesText = newLinesText.map(line => line.lineText);
			if (changesLines) {
				editorHelper.replaseLines(linesText, from.line, to.line);
				selectedVim[0].anchor.ch = from.ch;
				selectedVim[0].head.ch = to.ch;
				//	editorHelper.getEditor().setSelection(selectedVim[0].anchor, selectedVim[0].head)
				editorHelper.setCursor(selectedVim[0].head);
			}
		}
		else {

			const cursor = editorHelper.getCursor();
			const lineText = editorHelper.getLineByNumber(cursor.line);

			const newLineText = formatterCommanger.markerMarkerAction(markerAction, lineText, cursor.ch);
			if (newLineText.lineText != lineText) {
				editorHelper.replaseLine(newLineText.lineText, cursor.line);
				editorHelper.setCursor(cursor, 2);
			}
		}
	}
}
