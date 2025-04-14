import { App, Notice, Command } from 'obsidian';
import { SharpenerCommand } from './Commons/types';

export class FindReferencesCommand extends SharpenerCommand {
	id = 'find-references';
	name = 'Найти ссылки на команда.md';
	prefix = '`cf';
	command: Command;

	async execute(app: App): Promise<void> {
		const searchTerm = "Команда.md";
		const files = app.vault.getMarkdownFiles();
		const referencingFiles: string[] = [];

		for (const file of files) {
			const content = await app.vault.read(file);
			if (content.includes(searchTerm)) {
				referencingFiles.push(file.path);
			}
		}

		if (referencingFiles.length > 0) {
			new Notice(`Файлы, ссылающися на ${searchTerm}:\n${referencingFiles.join('\n')}`);
		} else {
			new Notice(`Ссылок на ${searchTerm} не найдено`);
		}
	}
} 