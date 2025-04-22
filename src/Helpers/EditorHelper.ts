import { App, Editor, EditorPosition, MarkdownView } from 'obsidian';
import { FormaterCommanger } from './FormaterHelper';
import { ParserMarkdown } from './ParserMarkdown';
export class EditorHelper {
	private app: App;
	editor: Editor | null;

	constructor(app: App) {
		this.app = app;
		this.editor = this.getEditor();
	}

	getEditor(): Editor | null {
		const view = this.getActiveView();
		return view?.editor || null;
	}

	getActiveView(): MarkdownView | null {
		return this.app.workspace.getActiveViewOfType(MarkdownView);
	}

	getCodeMirror(view: MarkdownView) {
		// @ts-ignore - Access to private property
		return view.editor.cm;
	}

	getCursor(): EditorPosition {
		if (!this.editor) throw new Error("No active editor");
		return this.editor.getCursor();
	}

	setCursor(pos: EditorPosition, scrollIntoView = 1): void {
		if (!this.editor) throw new Error("No active editor");
		this.editor.setCursor(pos, scrollIntoView);
	}

	getLinesFromTo(fromLine: number, toLine: number): string[] {
		if (!this.editor) throw new Error("No active editor");
		const lines = [];
		for (let i = fromLine; i <= toLine; i++) {
			lines.push(this.getLineByNumber(i));
		}
		return lines;
	}
	getNextMarker(editor: EditorPosition): EditorPosition | undefined {
		return this.getMarker('next');
	}

	getPreviousMarker(editor: EditorPosition): EditorPosition | undefined {
		return this.getMarker('previous');
	}

	getMarker(direction: 'next' | 'previous'): EditorPosition | undefined {
		const formaterCommanger = new FormaterCommanger();
		const parser = new ParserMarkdown();

		const cursor = this.getCursor();
		let lineNumber = cursor.line;
		let ch = cursor.ch;
		const maxIterations = this.editor!.lineCount();
		let iterations = 0;

		do {
			const lineString = this.getLineByNumber(lineNumber);
			const chainsText = parser.parseLine(lineString);

			if (chainsText.length > 1) {
				let nextChain;
				if (direction === 'next') {
					nextChain = formaterCommanger.getNextChainByTypeAndPositionAndMarkered(ch, 'text', chainsText);
				} else {
					nextChain = formaterCommanger.getPreviousChainByTypeAndPositionAndMarkered(ch, 'text', chainsText);
				}

				if (nextChain !== undefined && direction === 'next') {
					return { line: lineNumber, ch: nextChain.from }
				} else if (nextChain !== undefined && direction === 'previous') {
					return { line: lineNumber, ch: nextChain.to }
				}
			}

			// Move to the next/previous line or wrap around
			if (direction === 'next') {
				ch = 0;
				if (lineNumber === this.editor!.lastLine()) {
					lineNumber = 0;
				} else {
					lineNumber++;
				}
			} else {
				if (lineNumber === 0) {
					lineNumber = this.editor!.lastLine();
				} else {
					lineNumber--;
				}
				ch = this.editor!.getLine(lineNumber).length;
			}

			iterations++;
		} while (iterations < maxIterations);

		return cursor;
	}

	getLineByNumber(line: number): string {
		if (!this.editor) throw new Error("No active editor");
		return this.editor.getLine(line);
	}

	getLineByCursor(): string {
		if (!this.editor) throw new Error("No active editor");
		const cursor = this.getCursor();
		return this.editor.getLine(cursor.line);
	}

	replaseLine(text: string, line: number): void {
		if (!this.editor) throw new Error("No active editor");
		const from = { line, ch: 0 };
		const to = { line, ch: this.editor.getLine(line).length };
		this.editor.replaceRange(text, from, to);
	}

	replaseLines(lines: string[], fromLine: number, toLine: number): void {
		if (!this.editor) throw new Error("No active editor");
		const from = { line: fromLine, ch: 0 };
		const to = { line: toLine, ch: this.editor.getLine(toLine).length };
		this.editor.replaceRange(lines.join('\n'), from, to);
	}
} 