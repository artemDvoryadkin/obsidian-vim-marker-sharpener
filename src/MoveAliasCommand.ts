import { App, Notice, MarkdownView } from 'obsidian';
import { Command } from './types';

export class MoveAliasCommand implements Command {
	id = 'move-alias';
	name = 'Move alias';

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
		const alias = splitLine[0];
		const newFile = splitLine[1].slice(2, -2);

		const currentFile = activeView.file;
		const currentFileName = currentFile?.name.replace(/\.md$/, '');
		console.log(`Текущее название файла: ${currentFileName}`);

		console.log(`вводные данные`, { currentFileName, alias, newFile });

		const files = app.vault.getMarkdownFiles();
		console.log("Количество файлов в хранилище", files.length);
		const referencingFiles: string[] = [];

		const pagePatternRegexp = new RegExp(`\\[\\[(${currentFileName})\\|(${alias})\\]\\]|\\[(${alias})\\]\\((${currentFileName})\\)`, 'gi');
		console.log("Регулярное выражение:", pagePatternRegexp);

		const readPromises = files.map(async (file) => {
			const content = await app.vault.read(file);
			if (pagePatternRegexp.test(content)) {
				referencingFiles.push(file.path);
				const updatedContent = content.replace(pagePatternRegexp, (match, p1, p2, p3, p4) => {
					if (p1) {
						return match.replace(new RegExp(p1, 'i'), newFile);
					} else if (p4) {
						return match.replace(new RegExp(p4, 'i'), newFile);
					}
					return match;
				});
				await app.vault.modify(file, updatedContent);
			}
		});
		await Promise.all(readPromises);

		const newFilePath = files.find(file => file.path.includes(newFile + ".md"));
		if (newFilePath) {
			await app.fileManager.processFrontMatter(newFilePath, (frontmatter) => {
				if (!frontmatter.aliases) {
					frontmatter.aliases = [];
				}
				if (!frontmatter.aliases.includes(alias)) {
					frontmatter.aliases.push(alias);
				}
			});
			console.log(`Алиас "${alias}" добавлен в frontmatter файла "${newFile}" через API`);
		} else {
			console.log(`Файл "${newFile}" не найден`);
		}

		editor.setLine(cursor.line, "");

		if (referencingFiles.length > 0) {
			const message = `Файлы, содержащие алиас ${alias}:\n${referencingFiles.join('\n')}`;
			new Notice(message);
			console.log(message);
		} else {
			const message = `Ссылок на алиас ${alias} не найдено`;
			new Notice(message);
			console.log(message);
		}

		new Notice(`Текущая строка: ${splitLine}`);
	}
} 