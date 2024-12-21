import { App, Notice, MarkdownView } from 'obsidian';
import { Command } from './types';

export class HelloCommand implements Command {
	id = 'show-hello-notification';
	name = 'Показать приветствие';

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

		new Notice(`Current Line: ${currentLine}`);
	}
} 