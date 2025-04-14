import { App, MarkdownView, Command } from 'obsidian';
import { SharpenerCommand } from './Commons/types';

export class Header {
	lineNumber: number;
	level: number;
	text: string;
	parent: Header | null;
	emptyLineCount: number;
	contentHighlights: boolean

	constructor(lineNumber: number, level: number, text: string, parent: Header | null, emptyLineCount: number) {
		this.lineNumber = lineNumber;
		this.level = level;
		this.text = text;
		this.parent = parent;
		this.emptyLineCount = emptyLineCount;
		this.contentHighlights = false;
	}
	setHighlights(highlights: boolean) {
		this.contentHighlights = highlights;
		if (this.parent && highlights) {
			this.parent.setHighlights(highlights);
		}
	}
}

class Paragraph {
	isFrontmatter: boolean;
	isHeader = false;
	firstLine: number;
	endLine: number;
	countEmptyLine: number;
	lines: string[];
	header: Header | null;
	text: string;
	highlights: string[];
	existHighlights: boolean;

	constructor(isFrontmatter: boolean, firstLine: number, endLine: number, countEmptyLine: number, lines: string[], header: Header | null) {
		this.isFrontmatter = isFrontmatter;
		this.firstLine = firstLine;
		this.endLine = endLine;
		this.countEmptyLine = countEmptyLine;
		this.lines = lines;
		this.header = header;
		this.text = lines.join('\n');
	}

	getHighlights() {
		const intervals: { start: number; end: number }[] = [];
		const regex = /(\*\*)([\s\S]*?)(\*\*|$)/g; // Capture highlights with ** first
		let match;
		this.text = this.lines.join('\n');

		while ((match = regex.exec(this.text)) !== null) {
			const start = match.index;
			const end = start + match[0].length;
			intervals.push({ start, end });
		}

		const regexEqual = /(==)([\s\S]*?)(==|$)/g; // Capture highlights with == after
		while ((match = regexEqual.exec(this.text)) !== null) {
			const start = match.index;
			const end = start + match[0].length;
			intervals.push({ start, end });
		}

		// Merge overlapping intervals
		const mergedIntervals: { start: number; end: number }[] = [];
		intervals.sort((a, b) => a.start - b.start);

		for (const interval of intervals) {
			if (mergedIntervals.length === 0 || mergedIntervals[mergedIntervals.length - 1].end < interval.start) {
				mergedIntervals.push(interval);
			} else {
				mergedIntervals[mergedIntervals.length - 1].end = Math.max(mergedIntervals[mergedIntervals.length - 1].end, interval.end);
			}
		}
		this.highlights = mergedIntervals.map(interval => this.text.substring(interval.start, interval.end));
		this.existHighlights = this.highlights.length > 0;
		if (this.existHighlights) {
			this.header?.setHighlights(true)
		}
	}
}

export class FileMD {
	constructor(content: string) {
		const lines = content.split('\n');
		//	this.headers = this.parseMarkdownHeaders(lines);
		this.headers = [];
		this.paragraphs = this.parseParagraphs(lines);
		this.paragraphs.forEach(paragraph => {
			paragraph.getHighlights();
		});
	}
	headers: Header[];
	paragraphs: Paragraph[];

	toString(): string {
		console.log("paragraphs", this.paragraphs);
		return this.paragraphs.map(p => p.lines.join('\n')).join('\n\n');
	}

	public parseParagraphs(lines: string[]): Paragraph[] {
		const paragraphs: Paragraph[] = [];
		let emptyLineCount = 0;
		let i = 0;
		let currentHeader: Header | null = null;

		for (const line of lines) {
			i++;
			const headerMatch = line.match(/^(#{1,6})\s+(.*)/); // Check if the line is a header
			if (headerMatch) {
				// If it's a header, create a new paragraph with just this line
				const newHeader = new Header(i, headerMatch[1].length, headerMatch[2], null, 0);
				currentHeader = newHeader;
				this.headers.push(newHeader);
				const newParagraph = new Paragraph(false, i, i, 0, [line], newHeader);
				newParagraph.isHeader = true;
				paragraphs.push(newParagraph);
			} else if (line.trim() === '') {
				emptyLineCount++;
				if (paragraphs.length > 0) {
					const currentParagraph = paragraphs[paragraphs.length - 1];
					currentParagraph.countEmptyLine = emptyLineCount;
					currentParagraph.endLine = i;
					currentParagraph.lines.push(line);
				}
			} else {
				if (paragraphs.length === 0 || emptyLineCount > 0) {
					const newParagraph = new Paragraph(false, i, 0, 0, [line], currentHeader);
					paragraphs.push(newParagraph);
				} else {
					const currentParagraph = paragraphs[paragraphs.length - 1];
					currentParagraph.lines.push(line);
				}
				emptyLineCount = 0;
			}
		}



		// Check for the second closing '---' in the current paragraph
		const firstClosingIndex = paragraphs[0].lines.findIndex(line => line.trim() === '---');

		if (firstClosingIndex !== -1) {
			const secondClosingIndex = paragraphs[0].lines.slice(firstClosingIndex + 1).findIndex(line => line.trim() === '---');
			console.log(paragraphs[0].lines);
			if (secondClosingIndex !== -1) {

				const closingLines = paragraphs[0].lines.splice(firstClosingIndex, secondClosingIndex + 2); // Remove lines from the first to the second closing index
				const newParagraph = new Paragraph(false, 1, closingLines.length, 0, closingLines, null);
				newParagraph.countEmptyLine = 0;
				newParagraph.isFrontmatter = true;
				newParagraph.firstLine = 1;
				paragraphs.unshift(newParagraph); // Add the new paragraph with the closing lines as the first element
				paragraphs[0].endLine = paragraphs[0].firstLine + closingLines.length - 1; // Update the end line of the current paragraph
				paragraphs[1].firstLine = paragraphs[0].endLine + 1;
				paragraphs[1].endLine = paragraphs[1].firstLine + paragraphs[1].lines.length - 1;
			}
		}

		// Initialize parent property based on level
		for (let j = 0; j < this.headers.length; j++) {
			const currentHeader = this.headers[j];
			for (let k = j - 1; k >= 0; k--) {
				const parentHeader = this.headers[k];
				if (parentHeader.level < currentHeader.level) {
					currentHeader.parent = parentHeader;
					break;
				}
			}
		}
		paragraphs.forEach(paragraph => {
			paragraph.getHighlights();
			if (paragraph.existHighlights && paragraph.header) {
				paragraph.header.setHighlights(true);
			}
		});

		return paragraphs;
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
	parseMarkdownHeaders(lines: string[]): Header[] {
		const headers: Header[] = [];

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const match = line.match(/^(#{1,6})\s+(.*)/);
			if (match) {
				let emptyLineCount = 0;

				// Check if the next line is empty
				if (i + 1 < lines.length && lines[i + 1].trim() === '') {
					emptyLineCount = 1; // Count the empty line
				}

				headers.push(new Header(i + 1, match[1].length, match[2], null, emptyLineCount));
			}
		}

		// Initialize parent property based on level
		for (let j = 0; j < headers.length; j++) {
			const currentHeader = headers[j];
			for (let k = j - 1; k >= 0; k--) {
				const parentHeader = headers[k];
				if (parentHeader.level < currentHeader.level) {
					currentHeader.parent = parentHeader;
					break;
				}
			}
		}

		console.log("headers", headers);
		return headers;
	}
	save(app: App, activeView: MarkdownView, extractContent: string): void {
		const editor = activeView.editor;
		editor.setValue(extractContent);
	}
}
