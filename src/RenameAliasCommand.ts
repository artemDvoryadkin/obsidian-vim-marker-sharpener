import { App, Notice, MarkdownView } from 'obsidian';
import { Command } from './types';

export class RenameAliasCommand implements Command {
	id = 'rename-alias';
	name = 'Rename alias';

	async execute(app: App): Promise<void> {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice('Активный редактор не найден.');
			return;
		}

		const editor = activeView.editor;
		const cursor = editor.getCursor();
		const currentLine = editor.getLine(cursor.line);

		const splitLine = currentLine.replace('-', '').split('->').map(part => part.trim());
		const oldAlias = splitLine[0];
		const newAlias = splitLine[1];

		const files = app.vault.getMarkdownFiles();
		console.log("Количество файлов в хранилище", files.length);
		const referencingFiles: string[] = [];

		const regexp = `(?:\\[\\[([^|\\]]+)\\|(${oldAlias})\\]\\]|\\[(${oldAlias})\\]\\(([^)]+)\\))`;
		console.log("Регулярное выражение:", regexp);
		const aliasPattern = new RegExp(regexp, 'gi');

		const readPromises = files.map(async (file) => {
			const content = await app.vault.read(file);
			if (aliasPattern.test(content)) {
				referencingFiles.push(file.path);
				const updatedContent = content.replace(aliasPattern, (match, p1, p2, p3, p4) => {
					if (p2) {
						return match.replace(new RegExp(p2, 'gi'), newAlias);
					} else if (p3) {
						return match.replace(new RegExp(p3, 'gi'), newAlias);
					}
					return match;
				});
				await app.vault.modify(file, updatedContent);
			}
		});
		await Promise.all(readPromises);

		const updatedCurrentLine = "  - " + currentLine.split('->')[1].trim();
		editor.setLine(cursor.line, updatedCurrentLine);

		if (referencingFiles.length > 0) {
			const message = `Файлы, содержащие алиас ${oldAlias}:\n${referencingFiles.join('\n')}`;
			new Notice(message);
			console.log(message);
		} else {
			const message = `Ссылок на алиас ${oldAlias} не найдено`;
			new Notice(message);
			console.log(message);
		}

		new Notice(`Текущая строка: ${splitLine}`);
	}
} 