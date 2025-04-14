import { App, Notice, MarkdownView, Command } from 'obsidian';
import { SharpenerCommand } from './Commons/types';

export class MarkdownHeader {
	constructor(
		public lineNumber: number,
		public level: number,
		public text: string
	) { }
}
// [ ] в заговоловке есть ссылка на pdf то нужно перенести ее на другую строку
export class FormatHeadersCommand extends SharpenerCommand {
	id = 'format-headers';
	name = 'Format document headers';
	prefix = 'shfh';
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

		let changed = true;
		while (changed) {
			changed = false
			const headers = this.parseMarkdownHeaders(lines);

			headers.some((header, i) => {
				if (header.lineNumber < 2) return;

				console.log("header", { header, i });
				const isEmptyPrevLine = lines[header.lineNumber - 1].trim() === "" ? true : false;
				const isEmptyPrevPrevLine = lines[header.lineNumber - 2].trim() === "" ? true : false;

				console.log("header", { header, isEmptyPrevLine, isEmptyPrevPrevLine });
				if (!isEmptyPrevLine && !isEmptyPrevPrevLine) {
					if (i > 0 && header.level < headers[i - 1].level) {
						lines.splice(header.lineNumber - 1, 0, '')
						lines.splice(header.lineNumber - 1, 0, '')
						changed = true;
						return true;
					} else {
						lines.splice(header.lineNumber - 1, 0, '')
						changed = true;
						return true;
					}
				} else if (isEmptyPrevLine && !isEmptyPrevPrevLine) {
					if (i > 0 && header.level < headers[i - 1].level) {
						lines.splice(header.lineNumber - 1, 0, '')
						changed = true;
						return true;
					}
				}
				else if (isEmptyPrevLine && isEmptyPrevPrevLine) {
					if (i > 0 && header.level >= headers[i - 1].level) {
						lines.splice(header.lineNumber - 1, 1)
						changed = true;
						return true;
					}
				}
				return false;
			});
		}
		const formattedContent = lines.join('\n');
		editor.setValue(formattedContent);

		/*

		const formattedLines: string[] = [];
		let previousLevel = 0;
		let skippedLevels: number[] = [];
		let isFirstHeaderAfterFrontmatter = false;

		lines.forEach((line: string, index: number) => {
			const headerMatch = line.match(/^(#{1,6})\s(.*)/);

			if (headerMatch) {
				let currentLevel = headerMatch[1].length;
				let headerText = headerMatch[2];

				const linkMatch = headerText.match(/\[\[.*?&color=h(\d)\]\]/);
				if (linkMatch) {
					const specifiedLevel = parseInt(linkMatch[1], 10);
					if (specifiedLevel >= 1 && specifiedLevel <= 6) {
						currentLevel = specifiedLevel;
					}
				}

				if (index > 0 && lines[index - 1].trim() === '---') {
					isFirstHeaderAfterFrontmatter = true;
				}

				if (isFirstHeaderAfterFrontmatter) {
					formattedLines.push('');
					isFirstHeaderAfterFrontmatter = false;
				} else if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1].trim() !== '') {
					formattedLines.push('', '');
				}

				if (previousLevel === 0) {
					if (currentLevel !== 1) {
						formattedLines.push(`# ${headerText}`);
					} else {
						formattedLines.push(line);
					}
					previousLevel = 1;
				} else {
					const expectedMaxLevel = previousLevel + 1;

					if (currentLevel > expectedMaxLevel) {
						formattedLines.push(`${'#'.repeat(expectedMaxLevel)} ${headerText}`);
						previousLevel = expectedMaxLevel;
						if (!skippedLevels.includes(currentLevel)) {
							skippedLevels.push(currentLevel);
						}
					} else {
						formattedLines.push(`${'#'.repeat(currentLevel)} ${headerText}`);
						previousLevel = currentLevel;
					}
				}
			} else {
				this.processLine(line, index, lines, formattedLines);
			}
		});

		editor.setValue(formattedLines.join('\n'));

		if (skippedLevels.length > 0) {
			new Notice(`Исправлены пропущенные уровни заголовков: ${skippedLevels.join(', ')}`);
		} else {
			new Notice('Заголовки отформатированы');
		}
				*/
	}

	parseMarkdownHeaders(lines: string[]): MarkdownHeader[] {
		const headers = [];

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const match = line.match(/^(#{1,6})\s+(.*)/);
			if (match) {
				headers.push(new MarkdownHeader(i + 1, match[1].length, match[2]));
			}
		}
		return headers;
	}
}