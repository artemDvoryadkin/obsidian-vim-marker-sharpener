import { EditorView } from '@codemirror/view';
import { App, Editor, EditorPosition, FileView, MarkdownView, Notice, TFile, WorkspaceLeaf } from 'obsidian';

// import { CodeMirror } from 'obsidian';

export class EditorHelper {
	private app: App;
	private _editor: Editor
	private _activeView: MarkdownView | FileView | null;
	private activeLeaf: WorkspaceLeaf | null;

	constructor(app: App) {
		this.app = app;
	}

	get editor() {
		if (!this._editor && this.activeView) {
			if (this._activeView!.getViewType() === 'markdown') {
				this._editor = (this._activeView as MarkdownView).editor;
			}
		}
		return this._editor
	}

	get activeView() {
		if (!this._activeView) {
			const activeView = this.app.workspace.getActiveViewOfType(FileView)
			if (!activeView || !(activeView.getViewType() == 'markdown' || activeView.getViewType() == 'pdf')) {
				throw new Error('Invalid editor view');
			}
			this._activeView = activeView

		}
		return this._activeView
	}
	replaseLine(lineText: string, lineNumber: number) {

		const line = this.getLineByNumber(lineNumber)
		this.editor.replaceRange(lineText, { line: lineNumber, ch: 0 }, { line: lineNumber, ch: line.length })
	}

	replaseLines(linesText: string[], fromLineNumber: number, toLineNumber: number) {
		const textLines = linesText.join('\n')
		const lenLastLine = this.getLineByNumber(toLineNumber).length
		this.editor.replaceRange(textLines, { line: fromLineNumber, ch: 0 }, { line: toLineNumber, ch: lenLastLine })
	}

	setCursor(cursor: EditorPosition, offset = 0) {
		this.editor.setCursor(cursor.line, cursor.ch + offset);
	}

	async getClipboardText() {
		try {
			const text = await navigator.clipboard.readText();
			return text;
		} catch (err) {
			console.error("Failed to read clipboard:", err);
		}
	}
	getEditor(): Editor {
		return this.editor;
	}
	getCursor(): EditorPosition {
		return this.editor.getCursor()
	}

	getLineByCursor(): string {
		const cursor = this.editor.getCursor()
		return this.editor.getLine(cursor.line)
	}

	getLineByNumber(lineNumber: number): string {
		return this.editor.getLine(lineNumber)
	}
	getActiveView(): MarkdownView {
		return this.app.workspace.getActiveViewOfType(MarkdownView) as MarkdownView;
	}

	getCodeMirror(view: MarkdownView): CodeMirror.Editor {
		return (view as any).editMode?.editor?.cm?.cm;
	}

	getLinesFromTo(fromLineNumber: number, toLineNumber: number): string[] {
		const lines = []
		for (let i = fromLineNumber; i <= toLineNumber; i++) {
			lines.push(this.editor.getLine(i))
		}
		return lines
	}
	private getLines(): string[] {
		return this.editor.getValue().split('\n');
	}

	getEditorView(): EditorView {
		if (!this.editor) {
			throw new Error('Editor not initialized');
		}
		const view = (this.editor as any).cm;
		if (!(view instanceof EditorView)) {
			throw new Error('Invalid editor view');
		}
		return view;
	}


	async splitLiafVertical(filePath: string, activeLeaf = true, before = true): Promise<WorkspaceLeaf | null> {


		const newFile = this.app.vault.getAbstractFileByPath(filePath);

		if (newFile instanceof TFile && this.activeLeaf) {

			//const rightLeaf = this.app.workspace.getLeaf('split', 'vertical');

			const rightLeaf = this.app.workspace.createLeafBySplit(this.activeLeaf, 'vertical', before);
			await rightLeaf.openFile(newFile, { active: activeLeaf });

			return rightLeaf;
		}
		return null;
	}
	getActiveLeaf(): WorkspaceLeaf | null {
		return this.app.workspace.getActiveViewOfType(MarkdownView) as WorkspaceLeaf | null;
	}

	getLeafByTFile(file: TFile): WorkspaceLeaf | null {
		return this.getLeafByFilePath(file.path)
	}

	getLeafByFilePath(filePath: string): WorkspaceLeaf | null {
		let sleaf: WorkspaceLeaf | null = null;
		this.app.workspace.iterateAllLeaves(leaf => {
			const viewState = leaf.getViewState();
			const file = viewState && viewState.state && viewState.state.file;
			if (file === filePath) {
				sleaf = leaf;
				return true;
			}
			return false;
		});
		return sleaf;
	}


	private findHeaderLine(startLine: number, direction: number, level?: number): number | null {
		const lines = this.getLines();

		for (let i = startLine; i >= 0 && i < lines.length; i += direction) {
			const line = lines[i];
			const headerMatch = line.match(/^(#{1,6})\s/);

			if (headerMatch) {

				//const currentLevel = this.getHeaderLevel(i)
				const headerLevel = headerMatch[1].length;
				if (level !== undefined && level !== null && level > 0 && headerLevel <= level) return i

				if (level === undefined || headerLevel === level || (level === -1 && headerLevel < level)) {
					return i;
				}
			}
		}
		if (direction === -1) {
			// If searching upwards and no header found, return the last header line
			for (let i = lines.length - 1; i >= 0; i--) {
				const line = lines[i];
				const headerMatch = line.match(/^(#{1,6})\s/);
				if (headerMatch) {
					return i;
				}
			}
		} else if (direction === 1) {
			// If searching downwards and no header found, return the first header line
			for (let i = 0; i < lines.length; i++) {
				const line = lines[i];
				const headerMatch = line.match(/^(#{1,6})\s/);
				if (headerMatch) {
					return i;
				}
			}
		}

		return null;
	}

	findCurrentHeaderLine(): number | null {
		return this.findHeaderLine(this.editor.getCursor().line, -1);
	}

	moveToLineAndScroll(lineNumber: number): void {
		this.editor.setCursor(lineNumber, 0); // Set cursor to the specified line
		this.editor.scrollIntoView({ from: { line: lineNumber, ch: 0 }, to: { line: lineNumber, ch: 0 } }); // Scroll to make the line the first visible line
	}

	findNextHeaderLine(): number | null {
		return this.findHeaderLine(this.editor.getCursor().line + 1, 1);
	}

	findPreviousHeaderLine(): number | null {
		return this.findHeaderLine(this.editor.getCursor().line - 1, -1);
	}

	findNextHeaderWithCurrentLevel(): number | null {
		const currentHeaderLine = this.getCurrentHeaderLine()
		const currentHeaderLevel = this.getCurrentHeaderLevel()
		if (currentHeaderLine !== null && currentHeaderLevel !== null) {
			const nextHeaderLine = this.findHeaderLine(currentHeaderLine + 1, 1, currentHeaderLevel)

			if (nextHeaderLine !== null) {
				return nextHeaderLine
			}
			return currentHeaderLine;
		}
		return null
	}

	findPreviousHeaderWithCurrentLevel(): number | null {

		const currentLine = this.editor.getCursor().line;
		const currentHeaderLine = this.getCurrentHeaderLine()
		const currentHeaderLevel = this.getCurrentHeaderLevel()

		if (currentLine !== currentHeaderLine) return currentHeaderLine

		if (currentHeaderLine !== null && currentHeaderLevel !== null) {
			const prevHeaderLine = this.findHeaderLine(currentHeaderLine - 1, -1, currentHeaderLevel)
			if (prevHeaderLine !== null) {
				return prevHeaderLine
			}
			return currentHeaderLine;
		}
		return null
	}

	getCurrentHeaderLevel(): number | null {
		const currentHeaderLine = this.findCurrentHeaderLine()

		if (currentHeaderLine !== null) {
			const lineText = this.getLines()[currentHeaderLine];
			const headerMatch = lineText.match(/^(#{1,6})\s/);
			return headerMatch ? headerMatch[1].length : null;
		}
		return null
	}

	getHeaderLevel(lineNumber: number): number | null {
		const lineText = this.getLines()[lineNumber];
		const headerMatch = lineText.match(/^(#{1,6})\s/);
		return headerMatch ? headerMatch[1].length : null;
	}

	getCurrentHeaderLine(): number | null {

		const currentLine = this.editor.getCursor().line;
		const currentHeaderLine = this.findHeaderLine(currentLine, -1)

		return currentHeaderLine
	}

	findHeaderAbove(): number | null {
		const currentLine = this.editor.getCursor().line;
		const currentHeaderLine = this.findCurrentHeaderLine();

		if (currentHeaderLine !== null && currentHeaderLine < currentLine) {
			return currentHeaderLine
		}
		else if (currentHeaderLine !== null && currentHeaderLine === currentLine) {
			// If the cursor is on the current header line, find the header above
			const currentLevel = this.getCurrentHeaderLevel();
			if (currentLevel !== null) {
				const lineAbove = this.findHeaderLine(currentLine - 1, -1, currentLevel - 1);
				if (lineAbove !== null) {
					return lineAbove
				}
				return this.findFirstLine()
			}
			return null; // Return null if currentLevel is null
		} else if (currentHeaderLine !== null) {
			// Move to the current header line if the cursor is not on it
			return null; // Indicate that we moved to the header line
		} else {
			const firstLine = this.findFirstLine()
			this.moveToLineAndScroll(firstLine)
		}

		return null; // No header found
	}

	findFirstLine(): number {
		const lines = this.getLines();
		let lineNumber = 0;

		// Check for frontmatter (YAML) at the beginning of the document
		while (lineNumber < lines.length) {
			const line = lines[lineNumber].trim();
			if (line === '---') {
				// Skip the frontmatter section
				lineNumber++;
				while (lineNumber < lines.length && lines[lineNumber].trim() !== '---') {
					lineNumber++;
				}
				// Move past the closing '---'
				lineNumber++;
			} else {
				// Return the first non-frontmatter line
				return lineNumber;
			}
		}
		return lineNumber; // Return null if there are no valid lines
	}

	private findPatternLine(patterLine: string, startLine: number, direction: number): number | null {
		const lines = this.getLines();
		const pattern = new RegExp(`${patterLine}`);

		for (let i = startLine; i >= 0 && i < lines.length; i += direction) {
			if (pattern.test(lines[i])) {
				return i;
			}
		}
		return null;
	}
	private findPageLine(startLine: number, direction: number): number | null {
		const pattern = "\\{\\d+\\}\\s*-+";

		return this.findPatternLine(pattern, startLine, direction);
	}

	pageDown(linesInPage = 20): number | null {
		const currentLine = this.editor.getCursor().line;
		const nextPatternLine = this.findPageLine(currentLine + 1, 1)

		if (nextPatternLine !== null) {
			this.moveToLineAndScroll(nextPatternLine + 0);
		} else {
			// If no pattern found, scroll down by a page
			const lines = this.getLines();
			const nextPageLine = Math.min(currentLine + linesInPage, lines.length - 1);
			this.moveToLineAndScroll(nextPageLine);
		}
		return nextPatternLine
	}

	pageUp(linesInPage = 20): number | null {
		const currentLine = this.editor.getCursor().line;
		let prevPatternLine = this.findPageLine(currentLine - 1, -1);

		if (prevPatternLine !== null) {
			this.moveToLineAndScroll(prevPatternLine - 0);
		} else {
			// If no pattern found, scroll up by a page
			prevPatternLine = Math.max(currentLine - linesInPage, 0);
			this.moveToLineAndScroll(prevPatternLine);
		}
		return prevPatternLine
	}
}

export default EditorHelper; 