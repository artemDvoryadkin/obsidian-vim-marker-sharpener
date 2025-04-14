import { App, Notice, MarkdownView, Command } from 'obsidian';
import { FileMD } from './FileMD';
import { SharpenerCommand } from './Commons/types';

export class HelloCommand extends SharpenerCommand {
	id = 'show-hello-notification';
	name = 'hello';
	prefix = '`h';
	command: Command;
	execute(app: App): void {
		const currentTime = new Date().toLocaleTimeString();
		new Notice(`Привет! Текущее время: ${currentTime}`);

		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice('No active editor found.');
			return;
		}

		const editor = activeView.editor;
		const cursor = editor.getCursor();
		const currentLine = editor.getLine(cursor.line);
		const fileMD = new FileMD(editor.getValue());
		console.log("fileMD", fileMD);
		console.log("fileMD.headers", fileMD.toString());
		console.log("fileMD.setHighlights", fileMD.paragraphs.forEach(paragraph => console.log("paragraph", paragraph.getHighlights())));
		new Notice(`Current Line: ${currentLine}`);
	}
} 