import { App, Notice, TFile, Command } from 'obsidian';
import { SharpenerCommand } from './Commons/types';

const GROUP_PATTERNS = {
	group100: /^aliases.*/,
	group200: /^tags.*/,
	group300: /^entity_.*/,
	group350: /^gpt_.*/,
	group400: /^source_.*/,
	group425: /^page\\-.*/,
	group437: /^web\\-.*/,
	group444: /^book_.*/, // В Python это было повторено, здесь можно уточнить
	group450: /^youtube_.*/, // В Python это было повторено, здесь можно уточнить
	group475: /^media_.*/, // В Python это было повторено, здесь можно уточнить
	group500: /^(?!createdAt|updatedAt|file_).*/,
	group550: /^file_.*/,
	group600: /^updatedAt.*/,
	group700: /^createdAt.*/,
};

export class SortFrontmatterCommand extends SharpenerCommand {
	id = 'sort-frontmatter';
	name = 'Frontmatter sort';
	prefix = '`fs';
	command: Command;
	async execute(app: App): Promise<void> {

		const activeFile = app.workspace.getActiveFile();
		console.log({ activeFile });
		if (!activeFile) {
			new Notice('No active file to rename.');
			return;
		}
		const frontmatter: any = app.metadataCache.getFileCache(activeFile)?.frontmatter || {};
		await frontmatter_sort(frontmatter, activeFile, app);

		new Notice('Frontmatter отсортирован.');
	}
}

async function frontmatter_sort(frontmatter: Record<any, any>, file_md: TFile, app: App): Promise<Record<any, any>> {
	// Группируем свойства по ключам, соответствующим регулярным выражениям
	const grouped = Object.keys(GROUP_PATTERNS).reduce((acc: any, group: string) => {
		acc[group] = {};
		return acc;
	}, {});

	const otherProperties: Record<string, any> = {};

	console.log('frontmatter');
	console.log(frontmatter);
	for (const [key, value] of Object.entries(frontmatter)) {
		let matched = false;

		// Если ключ "aliases", сортируем значения (если это массив)
		if (key === "aliases" && Array.isArray(value)) {
			frontmatter[key] = value.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
		}
		if (key === "entity_ParentItem" && typeof value === "string") {
			frontmatter[key] = [value];
		}

		for (const [group, pattern] of Object.entries(GROUP_PATTERNS)) {
			if (pattern.test(key)) {
				grouped[group][key] = value;
				matched = true;
				break;
			}
		}

		if (!matched) {
			if (!otherProperties.hasOwnProperty(key)) {
				otherProperties[key] = value;
			}
		}
	}

	// Сортируем свойства в каждой группе
	for (const group in grouped) {
		grouped[group] = Object.fromEntries(Object.entries(grouped[group]).sort());
	}

	// Сортируем "другие" свойства
	const sortedOtherProperties = Object.fromEntries(Object.entries(otherProperties).sort());

	// Собираем обратно все отсортированные группы
	const sortedFrontmatter: Record<string, any> = {};
	for (const group in grouped) {
		Object.assign(sortedFrontmatter, grouped[group]);
	}
	Object.assign(sortedFrontmatter, sortedOtherProperties);

	await app.fileManager.processFrontMatter(file_md, (frontmatter) => {
		// Обновление frontmatter
		Object.keys(frontmatter).forEach(key => delete frontmatter[key]); // Очистка оригинального объекта
		Object.assign(frontmatter, sortedFrontmatter); // Доб
	});
	return sortedFrontmatter;
}
