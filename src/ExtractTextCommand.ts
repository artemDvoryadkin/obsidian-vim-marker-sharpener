import { App, Notice, MarkdownView, TFile, Command } from 'obsidian';
import { SharpenerCommand } from './Commons/types';

interface MarkdownHeader {
	lineNumber: number;
	level: number;
	text: string;
}

interface Paragraph {
	firstLine: number;
	endLine: number;
	countEmptyLine: number;
	lines: string[];
	header: MarkdownHeader[];
}

export class ExtractTextCommand extends SharpenerCommand {
	id = 'extract-text';
	name = 'Extract text from file';
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

		const blocks = this.processContent(lines);
		console.log("blocks", blocks);
		const groupedBlocks = this.groupBlocks(blocks);
		const extractContent = this.formatContent(groupedBlocks);

		await this.saveExtract(app, activeView, extractContent);
	}

	private isHeader(line: string): boolean {
		return /^#{1,6}\s/.test(line);
	}

	private getHeaderLevel(line: string): number {
		const match = line.match(/^(#{1,6})\s/);
		return match ? match[1].length : 0;
	}

	private isHighlightedBlock(text: string): boolean {
		return text.includes('**') || text.includes('==');
	}

	private getHeaderPath(lineIndex: number, lines: string[]): MarkdownHeader[] {
		const headerStack: MarkdownHeader[] = [];

		for (let i = lineIndex; i >= 0; i--) {
			if (this.isHeader(lines[i])) {
				const level = this.getHeaderLevel(lines[i]);
				const headerText = lines[i].replace(/^#{1,6}\s/, '');

				if (headerStack.length === 0 || headerStack[headerStack.length - 1].level > level) {
					headerStack.push({ lineNumber: i, level, text: headerText });
				}
			}
		}

		return headerStack.reverse();
	}

	private processContent(lines: string[]): Paragraph[] {
		const paragraphs: Paragraph[] = [];
		let currentBlock: string[] = [];
		let firstLine = 0;
		let emptyLineCount = 0;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];

			if (!line.trim()) {
				emptyLineCount++;
				if (currentBlock.length > 0) {
					paragraphs.push({
						firstLine,
						endLine: i - 1,
						countEmptyLine: emptyLineCount,
						lines: currentBlock,
						header: this.getHeaderPath(i, lines)
					});
					currentBlock = [];
					emptyLineCount = 0;
				}
				continue;
			}

			if (currentBlock.length === 0) {
				firstLine = i;
			}

			currentBlock.push(line);
		}

		if (currentBlock.length > 0) {
			paragraphs.push({
				firstLine,
				endLine: lines.length - 1,
				countEmptyLine: emptyLineCount,
				lines: currentBlock,
				header: this.getHeaderPath(lines.length - 1, lines)
			});
		}

		return paragraphs;
	}

	private groupBlocks(paragraphs: Paragraph[]): Record<string, string[]> {
		return paragraphs.reduce((acc, paragraph) => {
			const path = paragraph.header.join(' > ');
			const content = paragraph.lines.join('\n');
			if (!acc[path]) {
				acc[path] = [];
			}
			acc[path].push(content);
			return acc;
		}, {} as Record<string, string[]>);
	}

	private formatContent(groupedBlocks: Record<string, string[]>): string {
		return Object.entries(groupedBlocks)
			.map(([path, contents]) => {
				const headers = path.split(' > ')
					.map((header, index) => `${'#'.repeat(index + 1)} ${header}`)
					.join('\n');
				const contentBlocks = contents
					.map(content => `> ${content.replace(/\n/g, '\n> ')}`)
					.join('\n\n');
				return `${headers}\n\n${contentBlocks}\n\n`;
			})
			.join('\n');
	}

	private async saveExtract(app: App, activeView: MarkdownView, extractContent: string): Promise<void> {
		try {
			const currentFile = activeView.file;
			const currentFileName = currentFile?.basename;
			const newFileName = `Выдержка - ${currentFileName} ${new Date().toISOString().split('T')[0]}`;
			const existingFile = app.vault.getAbstractFileByPath(`${newFileName}.md`);

			if (existingFile instanceof TFile) {
				await app.vault.modify(existingFile, extractContent);
			} else {
				await app.vault.create(`${newFileName}.md`, extractContent);
			}
			new Notice(`Выдержка сохранена в файл "${newFileName}.md"`);
		} catch (error) {
			new Notice('Ошибка при создании файла с выдержкой');
			console.error(error);
		}
	}

	private createParagraphs(lines: string[]): string[] {
		const paragraphs: string[] = [];
		let currentParagraph: string[] = [];
		let emptyLineCount = 0;

		for (const line of lines) {
			if (line.trim() === '') {
				emptyLineCount++;
				if (currentParagraph.length > 0) {
					paragraphs.push(currentParagraph.join('\n') + `\n\nEmpty lines: ${emptyLineCount}`);
					currentParagraph = [];
					emptyLineCount = 0;
				}
			} else {
				currentParagraph.push(line);
			}
		}

		// Add the last paragraph if it exists
		if (currentParagraph.length > 0) {
			paragraphs.push(currentParagraph.join('\n') + `\n\nEmpty lines: ${emptyLineCount}`);
		}

		return paragraphs;
	}
} 