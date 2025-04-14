import { App, Notice, MarkdownView, Command } from 'obsidian';
import { FileMD, Header } from './FileMD';
import { SharpenerCommand } from './Commons/types';

export class ExtractHighlightsCommand extends SharpenerCommand {
	id = 'extract-highlights';
	name = 'Extract highlights from file';
	prefix = '`be';
	command: Command;

	async execute(app: App): Promise<void> {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice('Активный редактор не найден.');
			return;
		}

		const editor = activeView.editor;
		const content = editor.getValue();
		const lines = content.split('\n');
		const fileMD = new FileMD(content);
		fileMD.parseParagraphs(lines);

		let newContent = lines.join('\n');
		newContent += "\n\n# Выдержка";
		let currentHeader: Header | null = null;
		fileMD.paragraphs.forEach(paragraph => {
			if (paragraph.header && currentHeader != paragraph.header && paragraph.header?.contentHighlights) {
				currentHeader = paragraph.header;
				newContent += `\n\n${'#'.repeat(paragraph.header.level)} ${paragraph.header.text}`;
			}
			if (paragraph.existHighlights) {
				console.log(paragraph);
				newContent += "\n\n- " + paragraph.highlights.map(highlight => highlight.trim()).join('\n');
			}
		});

		const activeFile = app.workspace.getActiveFile();
		if (!activeFile) {
			new Notice('Активный файл не найден.');
			return;
		}
		await app.vault.modify(activeFile, newContent);
	}
} 