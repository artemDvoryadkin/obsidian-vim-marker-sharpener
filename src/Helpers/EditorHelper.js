import { __awaiter } from "tslib";
import { EditorView } from '@codemirror/view';
import { FileView, MarkdownView, TFile } from 'obsidian';
// import { CodeMirror } from 'obsidian';
export class EditorHelper {
    constructor(app) {
        this.app = app;
    }
    get editor() {
        if (!this._editor && this.activeView) {
            if (this._activeView.getViewType() === 'markdown') {
                this._editor = this._activeView.editor;
            }
            return this._editor;
        }
        throw new Error('Invalid editor view');
    }
    get activeView() {
        if (!this._activeView) {
            const activeView = this.app.workspace.getActiveViewOfType(FileView);
            if (!activeView || !(activeView.getViewType() == 'markdown' || activeView.getViewType() == 'pdf')) {
                throw new Error('Invalid editor view');
            }
            this._activeView = activeView;
        }
        return this._activeView;
    }
    replaseLine(lineText, lineNumber) {
        const line = this.getLineByNumber(lineNumber);
        this.editor.replaceRange(lineText, { line: lineNumber, ch: 0 }, { line: lineNumber, ch: line.length });
    }
    replaseLines(linesText, fromLineNumber, toLineNumber) {
        const textLines = linesText.join('\n');
        const lenLastLine = this.getLineByNumber(toLineNumber).length;
        this.editor.replaceRange(textLines, { line: fromLineNumber, ch: 0 }, { line: toLineNumber, ch: lenLastLine });
    }
    setCursor(cursor, offset = 0) {
        this.editor.setCursor(cursor.line, cursor.ch + offset);
    }
    getClipboardText() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = yield navigator.clipboard.readText();
                console.log("Clipboard content:", text);
                return text;
            }
            catch (err) {
                console.error("Failed to read clipboard:", err);
            }
        });
    }
    getEditor() {
        return this.editor;
    }
    getCursor() {
        return this.editor.getCursor();
    }
    getLineByCursor() {
        const cursor = this.editor.getCursor();
        return this.editor.getLine(cursor.line);
    }
    getLineByNumber(lineNumber) {
        return this.editor.getLine(lineNumber);
    }
    getActiveView() {
        return this.app.workspace.getActiveViewOfType(MarkdownView);
    }
    getCodeMirror(view) {
        var _a, _b, _c;
        return (_c = (_b = (_a = view.editMode) === null || _a === void 0 ? void 0 : _a.editor) === null || _b === void 0 ? void 0 : _b.cm) === null || _c === void 0 ? void 0 : _c.cm;
    }
    getLinesFromTo(fromLineNumber, toLineNumber) {
        const lines = [];
        for (let i = fromLineNumber; i <= toLineNumber; i++) {
            lines.push(this.editor.getLine(i));
        }
        return lines;
    }
    getLines() {
        return this.editor.getValue().split('\n');
    }
    getEditorView() {
        if (!this.editor) {
            throw new Error('Editor not initialized');
        }
        const view = this.editor.cm;
        if (!(view instanceof EditorView)) {
            throw new Error('Invalid editor view');
        }
        return view;
    }
    splitLiafVertical(filePath, activeLeaf = true, before = true) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("splitLiafVertical1", filePath, this.app.vault);
            const newFile = this.app.vault.getAbstractFileByPath(filePath);
            console.log("splitLiafVertical1", newFile);
            console.log("splitLiafVertical2", newFile, filePath);
            if (newFile instanceof TFile && this.activeLeaf) {
                //const rightLeaf = this.app.workspace.getLeaf('split', 'vertical');
                const rightLeaf = this.app.workspace.createLeafBySplit(this.activeLeaf, 'vertical', before);
                console.log("activeLeaf", this.activeLeaf);
                yield rightLeaf.openFile(newFile, { active: activeLeaf });
                return rightLeaf;
            }
            return null;
        });
    }
    getActiveLeaf() {
        return this.app.workspace.getActiveViewOfType(MarkdownView);
    }
    getLeafByTFile(file) {
        return this.getLeafByFilePath(file.path);
    }
    getLeafByFilePath(filePath) {
        console.log("getLeafByFilePath", filePath);
        let sleaf = null;
        this.app.workspace.iterateAllLeaves(leaf => {
            const viewState = leaf.getViewState();
            const file = viewState && viewState.state && viewState.state.file;
            //console.log("getLeafByFilePath", { leaf, filePath, file })
            if (file === filePath) {
                sleaf = leaf;
                return true;
            }
            return false;
        });
        return sleaf;
    }
    findHeaderLine(startLine, direction, level) {
        const lines = this.getLines();
        console.log("finHeaderLine", { startLine, direction, level });
        for (let i = startLine; i >= 0 && i < lines.length; i += direction) {
            const line = lines[i];
            const headerMatch = line.match(/^(#{1,6})\s/);
            if (headerMatch) {
                //const currentLevel = this.getHeaderLevel(i)
                console.log("header", line);
                const headerLevel = headerMatch[1].length;
                if (level !== undefined && level !== null && level > 0 && headerLevel <= level)
                    return i;
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
        }
        else if (direction === 1) {
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
    findCurrentHeaderLine() {
        return this.findHeaderLine(this.editor.getCursor().line, -1);
    }
    moveToLineAndScroll(lineNumber) {
        this.editor.setCursor(lineNumber, 0); // Set cursor to the specified line
        this.editor.scrollIntoView({ from: { line: lineNumber, ch: 0 }, to: { line: lineNumber, ch: 0 } }); // Scroll to make the line the first visible line
    }
    findNextHeaderLine() {
        return this.findHeaderLine(this.editor.getCursor().line + 1, 1);
    }
    findPreviousHeaderLine() {
        return this.findHeaderLine(this.editor.getCursor().line - 1, -1);
    }
    findNextHeaderWithCurrentLevel() {
        const currentHeaderLine = this.getCurrentHeaderLine();
        const currentHeaderLevel = this.getCurrentHeaderLevel();
        console.log("findNextHeaderWithCurrentLevel", { currentHeaderLine, currentHeaderLevel });
        if (currentHeaderLine !== null && currentHeaderLevel !== null) {
            const nextHeaderLine = this.findHeaderLine(currentHeaderLine + 1, 1, currentHeaderLevel);
            if (nextHeaderLine !== null) {
                return nextHeaderLine;
            }
            return currentHeaderLine;
        }
        return null;
    }
    findPreviousHeaderWithCurrentLevel() {
        const currentLine = this.editor.getCursor().line;
        const currentHeaderLine = this.getCurrentHeaderLine();
        const currentHeaderLevel = this.getCurrentHeaderLevel();
        console.log("findPreviousHeaderWithCurrentLevel", { currentHeaderLine, currentHeaderLevel });
        if (currentLine !== currentHeaderLine)
            return currentHeaderLine;
        if (currentHeaderLine !== null && currentHeaderLevel !== null) {
            const prevHeaderLine = this.findHeaderLine(currentHeaderLine - 1, -1, currentHeaderLevel);
            console.log(prevHeaderLine);
            if (prevHeaderLine !== null) {
                return prevHeaderLine;
            }
            return currentHeaderLine;
        }
        return null;
    }
    getCurrentHeaderLevel() {
        const currentHeaderLine = this.findCurrentHeaderLine();
        if (currentHeaderLine !== null) {
            const lineText = this.getLines()[currentHeaderLine];
            const headerMatch = lineText.match(/^(#{1,6})\s/);
            return headerMatch ? headerMatch[1].length : null;
        }
        return null;
    }
    getHeaderLevel(lineNumber) {
        const lineText = this.getLines()[lineNumber];
        const headerMatch = lineText.match(/^(#{1,6})\s/);
        return headerMatch ? headerMatch[1].length : null;
    }
    getCurrentHeaderLine() {
        const currentLine = this.editor.getCursor().line;
        const currentHeaderLine = this.findHeaderLine(currentLine, -1);
        return currentHeaderLine;
    }
    findHeaderAbove() {
        const currentLine = this.editor.getCursor().line;
        const currentHeaderLine = this.findCurrentHeaderLine();
        console.log("findHeaderAbove", { currentHeaderLine, currentLine });
        if (currentHeaderLine !== null && currentHeaderLine < currentLine) {
            return currentHeaderLine;
        }
        else if (currentHeaderLine !== null && currentHeaderLine === currentLine) {
            // If the cursor is on the current header line, find the header above
            const currentLevel = this.getCurrentHeaderLevel();
            if (currentLevel !== null) {
                const lineAbove = this.findHeaderLine(currentLine - 1, -1, currentLevel - 1);
                if (lineAbove !== null) {
                    return lineAbove;
                }
                return this.findFirstLine();
            }
            return null; // Return null if currentLevel is null
        }
        else if (currentHeaderLine !== null) {
            // Move to the current header line if the cursor is not on it
            return null; // Indicate that we moved to the header line
        }
        else {
            const firstLine = this.findFirstLine();
            this.moveToLineAndScroll(firstLine);
        }
        return null; // No header found
    }
    findFirstLine() {
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
            }
            else {
                // Return the first non-frontmatter line
                return lineNumber;
            }
        }
        return lineNumber; // Return null if there are no valid lines
    }
    findPatternLine(patterLine, startLine, direction) {
        const lines = this.getLines();
        const pattern = new RegExp(`${patterLine}`);
        for (let i = startLine; i >= 0 && i < lines.length; i += direction) {
            if (pattern.test(lines[i])) {
                return i;
            }
        }
        return null;
    }
    findPageLine(startLine, direction) {
        const pattern = "\\{\\d+\\}\\s*-+";
        return this.findPatternLine(pattern, startLine, direction);
    }
    pageDown(linesInPage = 20) {
        const currentLine = this.editor.getCursor().line;
        const nextPatternLine = this.findPageLine(currentLine + 1, 1);
        console.log("nextPatternLine", nextPatternLine);
        if (nextPatternLine !== null) {
            this.moveToLineAndScroll(nextPatternLine + 0);
        }
        else {
            // If no pattern found, scroll down by a page
            const lines = this.getLines();
            const nextPageLine = Math.min(currentLine + linesInPage, lines.length - 1);
            this.moveToLineAndScroll(nextPageLine);
        }
        return nextPatternLine;
    }
    pageUp(linesInPage = 20) {
        const currentLine = this.editor.getCursor().line;
        let prevPatternLine = this.findPageLine(currentLine - 1, -1);
        console.log(".i..");
        console.log("prevPatternLine", prevPatternLine);
        if (prevPatternLine !== null) {
            this.moveToLineAndScroll(prevPatternLine - 0);
        }
        else {
            // If no pattern found, scroll up by a page
            prevPatternLine = Math.max(currentLine - linesInPage, 0);
            this.moveToLineAndScroll(prevPatternLine);
        }
        return prevPatternLine;
    }
}
export default EditorHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdG9ySGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRWRpdG9ySGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxFQUErQixRQUFRLEVBQUUsWUFBWSxFQUFVLEtBQUssRUFBaUIsTUFBTSxVQUFVLENBQUM7QUFFN0cseUNBQXlDO0FBRXpDLE1BQU0sT0FBTyxZQUFZO0lBTXhCLFlBQVksR0FBUTtRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNyQyxJQUFJLElBQUksQ0FBQyxXQUFZLENBQUMsV0FBVyxFQUFFLEtBQUssVUFBVSxFQUFFO2dCQUNuRCxJQUFJLENBQUMsT0FBTyxHQUFJLElBQUksQ0FBQyxXQUE0QixDQUFDLE1BQU0sQ0FBQzthQUN6RDtZQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtTQUNuQjtRQUVELE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsSUFBSSxVQUFVO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDbkUsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQ2xHLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUN2QztZQUNELElBQUksQ0FBQyxXQUFXLEdB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U0FDdkM7UUFDRCxPQUFPLGVBQWUsQ0FBQTtJQUN2QixDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFO1FBQ3RCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ2pELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQTtRQUMvQyxJQUFJLGVBQWUsS0FBSyxJQUFJLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ04sMkNBQTJDO1lBQzNDLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxlQUFlLENBQUE7SUFDdkIsQ0FBQztDQUNEO0FBRUQsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFZGl0b3JWaWV3IH0gZnJvbSAnQGNvZGVtaXJyb3Ivdmlldyc7XG5pbXBvcnQgeyBBcHAsIEVkaXRvciwgRWRpdG9yUG9zaXRpb24sIEZpbGVWaWV3LCBNYXJrZG93blZpZXcsIE5vdGljZSwgVEZpbGUsIFdvcmtzcGFjZUxlYWYgfSBmcm9tICdvYnNpZGlhbic7XG5cbi8vIGltcG9ydCB7IENvZGVNaXJyb3IgfSBmcm9tICdvYnNpZGlhbic7XG5cbmV4cG9ydCBjbGFzcyBFZGl0b3JIZWxwZXIge1xuXHRwcml2YXRlIGFwcDogQXBwO1xuXHRwcml2YXRlIF9lZGl0b3I6IEVkaXRvclxuXHRwcml2YXRlIF9hY3RpdmVWaWV3OiBNYXJrZG93blZpZXcgfCBGaWxlVmlldyB8IG51bGw7XG5cdHByaXZhdGUgYWN0aXZlTGVhZjogV29ya3NwYWNlTGVhZiB8IG51bGw7XG5cblx0Y29uc3RydWN0b3IoYXBwOiBBcHApIHtcblx0XHR0aGlzLmFwcCA9IGFwcDtcblx0fVxuXG5cdGdldCBlZGl0b3IoKSB7XG5cdFx0aWYgKCF0aGlzLl9lZGl0b3IgJiYgdGhpcy5hY3RpdmVWaWV3KSB7XG5cdFx0XHRpZiAodGhpcy5fYWN0aXZlVmlldyEuZ2V0Vmlld1R5cGUoKSA9PT0gJ21hcmtkb3duJykge1xuXHRcdFx0XHR0aGlzLl9lZGl0b3IgPSAodGhpcy5fYWN0aXZlVmlldyBhcyBNYXJrZG93blZpZXcpLmVkaXRvcjtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLl9lZGl0b3Jcblx0XHR9XG5cblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZWRpdG9yIHZpZXcnKTtcblx0fVxuXHRnZXQgYWN0aXZlVmlldygpIHtcblx0XHRpZiAoIXRoaXMuX2FjdGl2ZVZpZXcpIHtcblx0XHRcdGNvbnN0IGFjdGl2ZVZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShGaWxlVmlldylcblx0XHRcdGlmICghYWN0aXZlVmlldyB8fCAhKGFjdGl2ZVZpZXcuZ2V0Vmlld1R5cGUoKSA9PSAnbWFya2Rvd24nIHx8IGFjdGl2ZVZpZXcuZ2V0Vmlld1R5cGUoKSA9PSAncGRmJykpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGVkaXRvciB2aWV3Jyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9hY3RpdmVWaWV3ID0gYWN0aXZlVmlld1xuXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9hY3RpdmVWaWV3XG5cdH1cblx0cmVwbGFzZUxpbmUobGluZVRleHQ6IHN0cmluZywgbGluZU51bWJlcjogbnVtYmVyKSB7XG5cblx0XHRjb25zdCBsaW5lID0gdGhpcy5nZXRMaW5lQnlOdW1iZXIobGluZU51bWJlcilcblx0XHR0aGlzLmVkaXRvci5yZXBsYWNlUmFuZ2UobGluZVRleHQsIHsgbGluZTogbGluZU51bWJlciwgY2g6IDAgfSwgeyBsaW5lOiBsaW5lTnVtYmVyLCBjaDogbGluZS5sZW5ndGggfSlcblx0fVxuXG5cdHJlcGxhc2VMaW5lcyhsaW5lc1RleHQ6IHN0cmluZ1tdLCBmcm9tTGluZU51bWJlcjogbnVtYmVyLCB0b0xpbmVOdW1iZXI6IG51bWJlcikge1xuXHRcdGNvbnN0IHRleHRMaW5lcyA9IGxpbmVzVGV4dC5qb2luKCdcXG4nKVxuXHRcdGNvbnN0IGxlbkxhc3RMaW5lID0gdGhpcy5nZXRMaW5lQnlOdW1iZXIodG9MaW5lTnVtYmVyKS5sZW5ndGhcblx0XHR0aGlzLmVkaXRvci5yZXBsYWNlUmFuZ2UodGV4dExpbmVzLCB7IGxpbmU6IGZyb21MaW5lTnVtYmVyLCBjaDogMCB9LCB7IGxpbmU6IHRvTGluZU51bWJlciwgY2g6IGxlbkxhc3RMaW5lIH0pXG5cdH1cblxuXHRzZXRDdXJzb3IoY3Vyc29yOiBFZGl0b3JQb3NpdGlvbiwgb2Zmc2V0ID0gMCkge1xuXHRcdHRoaXMuZWRpdG9yLnNldEN1cnNvcihjdXJzb3IubGluZSwgY3Vyc29yLmNoICsgb2Zmc2V0KTtcblx0fVxuXG5cdGFzeW5jIGdldENsaXBib2FyZFRleHQoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHRleHQgPSBhd2FpdCBuYXZpZ2F0b3IuY2xpcGJvYXJkLnJlYWRUZXh0KCk7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkNsaXBib2FyZCBjb250ZW50OlwiLCB0ZXh0KTtcblx0XHRcdHJldHVybiB0ZXh0O1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZWFkIGNsaXBib2FyZDpcIiwgZXJyKTtcblx0XHR9XG5cdH1cblx0Z2V0RWRpdG9yKCk6IEVkaXRvciB7XG5cdFx0cmV0dXJuIHRoaXMuZWRpdG9yO1xuXHR9XG5cdGdldEN1cnNvcigpOiBFZGl0b3JQb3NpdGlvbiB7XG5cdFx0cmV0dXJuIHRoaXMuZWRpdG9yLmdldEN1cnNvcigpXG5cdH1cblxuXHRnZXRMaW5lQnlDdXJzb3IoKTogc3RyaW5nIHtcblx0XHRjb25zdCBjdXJzb3IgPSB0aGlzLmVkaXRvci5nZXRDdXJzb3IoKVxuXHRcdHJldHVybiB0aGlzLmVkaXRvci5nZXRMaW5lKGN1cnNvci5saW5lKVxuXHR9XG5cblx0Z2V0TGluZUJ5TnVtYmVyKGxpbmVOdW1iZXI6IG51bWJlcik6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuZWRpdG9yLmdldExpbmUobGluZU51bWJlcilcblx0fVxuXHRnZXRBY3RpdmVWaWV3KCk6IE1hcmtkb3duVmlldyB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldykgYXMgTWFya2Rvd25WaWV3O1xuXHR9XG5cblx0Z2V0Q29kZU1pcnJvcih2aWV3OiBNYXJrZG93blZpZXcpOiBDb2RlTWlycm9yLkVkaXRvciB7XG5cdFx0cmV0dXJuICh2aWV3IGFzIGFueSkuZWRpdE1vZGU/LmVkaXRvcj8uY20/LmNtO1xuXHR9XG5cblx0Z2V0TGluZXNGcm9tVG8oZnJvbUxpbmVOdW1iZXI6IG51bWJlciwgdG9MaW5lTnVtYmVyOiBudW1iZXIpOiBzdHJpbmdbXSB7XG5cdFx0Y29uc3QgbGluZXMgPSBbXVxuXHRcdGZvciAobGV0IGkgPSBmcm9tTGluZU51bWJlcjsgaSA8PSB0b0xpbmVOdW1iZXI7IGkrKykge1xuXHRcdFx0bGluZXMucHVzaCh0aGlzLmVkaXRvci5nZXRMaW5lKGkpKVxuXHRcdH1cblx0XHRyZXR1cm4gbGluZXNcblx0fVxuXHRwcml2YXRlIGdldExpbmVzKCk6IHN0cmluZ1tdIHtcblx0XHRyZXR1cm4gdGhpcy5lZGl0b3IuZ2V0VmFsdWUoKS5zcGxpdCgnXFxuJyk7XG5cdH1cblxuXHRnZXRFZGl0b3JWaWV3KCk6IEVkaXRvclZpZXcge1xuXHRcdGlmICghdGhpcy5lZGl0b3IpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRWRpdG9yIG5vdCBpbml0aWFsaXplZCcpO1xuXHRcdH1cblx0XHRjb25zdCB2aWV3ID0gKHRoaXMuZWRpdG9yIGFzIGFueSkuY207XG5cdFx0aWYgKCEodmlldyBpbnN0YW5jZW9mIEVkaXRvclZpZXcpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZWRpdG9yIHZpZXcnKTtcblx0XHR9XG5cdFx0cmV0dXJuIHZpZXc7XG5cdH1cblxuXG5cdGFzeW5jIHNwbGl0TGlhZlZlcnRpY2FsKGZpbGVQYXRoOiBzdHJpbmcsIGFjdGl2ZUxlYWYgPSB0cnVlLCBiZWZvcmUgPSB0cnVlKTogUHJvbWlzZTxXb3Jrc3BhY2VMZWFmIHwgbnVsbD4ge1xuXG5cdFx0Y29uc29sZS5sb2coXCJzcGxpdExpYWZWZXJ0aWNhbDFcIiwgZmlsZVBhdGgsIHRoaXMuYXBwLnZhdWx0KTtcblxuXHRcdGNvbnN0IG5ld0ZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZVBhdGgpO1xuXHRcdGNvbnNvbGUubG9nKFwic3BsaXRMaWFmVmVydGljYWwxXCIsIG5ld0ZpbGUpO1xuXG5cdFx0Y29uc29sZS5sb2coXCJzcGxpdExpYWZWZXJ0aWNhbDJcIiwgbmV3RmlsZSwgZmlsZVBhdGgpO1xuXHRcdGlmIChuZXdGaWxlIGluc3RhbmNlb2YgVEZpbGUgJiYgdGhpcy5hY3RpdmVMZWFmKSB7XG5cblx0XHRcdC8vY29uc3QgcmlnaHRMZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmdldExlYWYoJ3NwbGl0JywgJ3ZlcnRpY2FsJyk7XG5cblx0XHRcdGNvbnN0IHJpZ2h0TGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5jcmVhdGVMZWFmQnlTcGxpdCh0aGlzLmFjdGl2ZUxlYWYsICd2ZXJ0aWNhbCcsIGJlZm9yZSk7XG5cdFx0XHRjb25zb2xlLmxvZyhcImFjdGl2ZUxlYWZcIiwgdGhpcy5hY3RpdmVMZWFmKVxuXHRcdFx0YXdhaXQgcmlnaHRMZWFmLm9wZW5GaWxlKG5ld0ZpbGUsIHsgYWN0aXZlOiBhY3RpdmVMZWFmIH0pO1xuXG5cdFx0XHRyZXR1cm4gcmlnaHRMZWFmO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRnZXRBY3RpdmVMZWFmKCk6IFdvcmtzcGFjZUxlYWYgfCBudWxsIHtcblx0XHRyZXR1cm4gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KSBhcyBXb3Jrc3BhY2VMZWFmIHwgbnVsbDtcblx0fVxuXG5cdGdldExlYWZCeVRGaWxlKGZpbGU6IFRGaWxlKTogV29ya3NwYWNlTGVhZiB8IG51bGwge1xuXHRcdHJldHVybiB0aGlzLmdldExlYWZCeUZpbGVQYXRoKGZpbGUucGF0aClcblx0fVxuXG5cdGdldExlYWZCeUZpbGVQYXRoKGZpbGVQYXRoOiBzdHJpbmcpOiBXb3Jrc3BhY2VMZWFmIHwgbnVsbCB7XG5cdFx0Y29uc29sZS5sb2coXCJnZXRMZWFmQnlGaWxlUGF0aFwiLCBmaWxlUGF0aCk7XG5cdFx0bGV0IHNsZWFmOiBXb3Jrc3BhY2VMZWFmIHwgbnVsbCA9IG51bGw7XG5cdFx0dGhpcy5hcHAud29ya3NwYWNlLml0ZXJhdGVBbGxMZWF2ZXMobGVhZiA9PiB7XG5cdFx0XHRjb25zdCB2aWV3U3RhdGUgPSBsZWFmLmdldFZpZXdTdGF0ZSgpO1xuXHRcdFx0Y29uc3QgZmlsZSA9IHZpZXdTdGF0ZSAmJiB2aWV3U3RhdGUuc3RhdGUgJiYgdmlld1N0YXRlLnN0YXRlLmZpbGU7XG5cdFx0XHQvL2NvbnNvbGUubG9nKFwiZ2V0TGVhZkJ5RmlsZVBhdGhcIiwgeyBsZWFmLCBmaWxlUGF0aCwgZmlsZSB9KVxuXHRcdFx0aWYgKGZpbGUgPT09IGZpbGVQYXRoKSB7XG5cdFx0XHRcdHNsZWFmID0gbGVhZjtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHNsZWFmO1xuXHR9XG5cblxuXHRwcml2YXRlIGZpbmRIZWFkZXJMaW5lKHN0YXJ0TGluZTogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlciwgbGV2ZWw/OiBudW1iZXIpOiBudW1iZXIgfCBudWxsIHtcblx0XHRjb25zdCBsaW5lcyA9IHRoaXMuZ2V0TGluZXMoKTtcblxuXHRcdGNvbnNvbGUubG9nKFwiZmluSGVhZGVyTGluZVwiLCB7IHN0YXJ0TGluZSwgZGlyZWN0aW9uLCBsZXZlbCB9KVxuXHRcdGZvciAobGV0IGkgPSBzdGFydExpbmU7IGkgPj0gMCAmJiBpIDwgbGluZXMubGVuZ3RoOyBpICs9IGRpcmVjdGlvbikge1xuXHRcdFx0Y29uc3QgbGluZSA9IGxpbmVzW2ldO1xuXHRcdFx0Y29uc3QgaGVhZGVyTWF0Y2ggPSBsaW5lLm1hdGNoKC9eKCN7MSw2fSlcXHMvKTtcblxuXHRcdFx0aWYgKGhlYWRlck1hdGNoKSB7XG5cblx0XHRcdFx0Ly9jb25zdCBjdXJyZW50TGV2ZWwgPSB0aGlzLmdldEhlYWRlckxldmVsKGkpXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiaGVhZGVyXCIsIGxpbmUpXG5cdFx0XHRcdGNvbnN0IGhlYWRlckxldmVsID0gaGVhZGVyTWF0Y2hbMV0ubGVuZ3RoO1xuXHRcdFx0XHRpZiAobGV2ZWwgIT09IHVuZGVmaW5lZCAmJiBsZXZlbCAhPT0gbnVsbCAmJiBsZXZlbCA+IDAgJiYgaGVhZGVyTGV2ZWwgPD0gbGV2ZWwpIHJldHVybiBpXG5cblx0XHRcdFx0aWYgKGxldmVsID09PSB1bmRlZmluZWQgfHwgaGVhZGVyTGV2ZWwgPT09IGxldmVsIHx8IChsZXZlbCA9PT0gLTEgJiYgaGVhZGVyTGV2ZWwgPCBsZXZlbCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoZGlyZWN0aW9uID09PSAtMSkge1xuXHRcdFx0Ly8gSWYgc2VhcmNoaW5nIHVwd2FyZHMgYW5kIG5vIGhlYWRlciBmb3VuZCwgcmV0dXJuIHRoZSBsYXN0IGhlYWRlciBsaW5lXG5cdFx0XHRmb3IgKGxldCBpID0gbGluZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0Y29uc3QgbGluZSA9IGxpbmVzW2ldO1xuXHRcdFx0XHRjb25zdCBoZWFkZXJNYXRjaCA9IGxpbmUubWF0Y2goL14oI3sxLDZ9KVxccy8pO1xuXHRcdFx0XHRpZiAoaGVhZGVyTWF0Y2gpIHtcblx0XHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAxKSB7XG5cdFx0XHQvLyBJZiBzZWFyY2hpbmcgZG93bndhcmRzIGFuZCBubyBoZWFkZXIgZm91bmQsIHJldHVybiB0aGUgZmlyc3QgaGVhZGVyIGxpbmVcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgbGluZSA9IGxpbmVzW2ldO1xuXHRcdFx0XHRjb25zdCBoZWFkZXJNYXRjaCA9IGxpbmUubWF0Y2goL14oI3sxLDZ9KVxccy8pO1xuXHRcdFx0XHRpZiAoaGVhZGVyTWF0Y2gpIHtcblx0XHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0ZmluZEN1cnJlbnRIZWFkZXJMaW5lKCk6IG51bWJlciB8IG51bGwge1xuXHRcdHJldHVybiB0aGlzLmZpbmRIZWFkZXJMaW5lKHRoaXMuZWRpdG9yLmdldEN1cnNvcigpLmxpbmUsIC0xKTtcblx0fVxuXG5cdG1vdmVUb0xpbmVBbmRTY3JvbGwobGluZU51bWJlcjogbnVtYmVyKTogdm9pZCB7XG5cdFx0dGhpcy5lZGl0b3Iuc2V0Q3Vyc29yKGxpbmVOdW1iZXIsIDApOyAvLyBTZXQgY3Vyc29yIHRvIHRoZSBzcGVjaWZpZWQgbGluZVxuXHRcdHRoaXMuZWRpdG9yLnNjcm9sbEludG9WaWV3KHsgZnJvbTogeyBsaW5lOiBsaW5lTnVtYmVyLCBjaDogMCB9LCB0bzogeyBsaW5lOiBsaW5lTnVtYmVyLCBjaDogMCB9IH0pOyAvLyBTY3JvbGwgdG8gbWFrZSB0aGUgbGluZSB0aGUgZmlyc3QgdmlzaWJsZSBsaW5lXG5cdH1cblxuXHRmaW5kTmV4dEhlYWRlckxpbmUoKTogbnVtYmVyIHwgbnVsbCB7XG5cdFx0cmV0dXJuIHRoaXMuZmluZEhlYWRlckxpbmUodGhpcy5lZGl0b3IuZ2V0Q3Vyc29yKCkubGluZSArIDEsIDEpO1xuXHR9XG5cblx0ZmluZFByZXZpb3VzSGVhZGVyTGluZSgpOiBudW1iZXIgfCBudWxsIHtcblx0XHRyZXR1cm4gdGhpcy5maW5kSGVhZGVyTGluZSh0aGlzLmVkaXRvci5nZXRDdXJzb3IoKS5saW5lIC0gMSwgLTEpO1xuXHR9XG5cblx0ZmluZE5leHRIZWFkZXJXaXRoQ3VycmVudExldmVsKCk6IG51bWJlciB8IG51bGwge1xuXHRcdGNvbnN0IGN1cnJlbnRIZWFkZXJMaW5lID0gdGhpcy5nZXRDdXJyZW50SGVhZGVyTGluZSgpXG5cdFx0Y29uc3QgY3VycmVudEhlYWRlckxldmVsID0gdGhpcy5nZXRDdXJyZW50SGVhZGVyTGV2ZWwoKVxuXHRcdGNvbnNvbGUubG9nKFwiZmluZE5leHRIZWFkZXJXaXRoQ3VycmVudExldmVsXCIsIHsgY3VycmVudEhlYWRlckxpbmUsIGN1cnJlbnRIZWFkZXJMZXZlbCB9KVxuXHRcdGlmIChjdXJyZW50SGVhZGVyTGluZSAhPT0gbnVsbCAmJiBjdXJyZW50SGVhZGVyTGV2ZWwgIT09IG51bGwpIHtcblx0XHRcdGNvbnN0IG5leHRIZWFkZXJMaW5lID0gdGhpcy5maW5kSGVhZGVyTGluZShjdXJyZW50SGVhZGVyTGluZSArIDEsIDEsIGN1cnJlbnRIZWFkZXJMZXZlbClcblxuXHRcdFx0aWYgKG5leHRIZWFkZXJMaW5lICE9PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybiBuZXh0SGVhZGVyTGluZVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGN1cnJlbnRIZWFkZXJMaW5lO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cblx0ZmluZFByZXZpb3VzSGVhZGVyV2l0aEN1cnJlbnRMZXZlbCgpOiBudW1iZXIgfCBudWxsIHtcblxuXHRcdGNvbnN0IGN1cnJlbnRMaW5lID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yKCkubGluZTtcblx0XHRjb25zdCBjdXJyZW50SGVhZGVyTGluZSA9IHRoaXMuZ2V0Q3VycmVudEhlYWRlckxpbmUoKVxuXHRcdGNvbnN0IGN1cnJlbnRIZWFkZXJMZXZlbCA9IHRoaXMuZ2V0Q3VycmVudEhlYWRlckxldmVsKClcblx0XHRjb25zb2xlLmxvZyhcImZpbmRQcmV2aW91c0hlYWRlcldpdGhDdXJyZW50TGV2ZWxcIiwgeyBjdXJyZW50SGVhZGVyTGluZSwgY3VycmVudEhlYWRlckxldmVsIH0pXG5cblx0XHRpZiAoY3VycmVudExpbmUgIT09IGN1cnJlbnRIZWFkZXJMaW5lKSByZXR1cm4gY3VycmVudEhlYWRlckxpbmVcblxuXHRcdGlmIChjdXJyZW50SGVhZGVyTGluZSAhPT0gbnVsbCAmJiBjdXJyZW50SGVhZGVyTGV2ZWwgIT09IG51bGwpIHtcblx0XHRcdGNvbnN0IHByZXZIZWFkZXJMaW5lID0gdGhpcy5maW5kSGVhZGVyTGluZShjdXJyZW50SGVhZGVyTGluZSAtIDEsIC0xLCBjdXJyZW50SGVhZGVyTGV2ZWwpXG5cdFx0XHRjb25zb2xlLmxvZyhwcmV2SGVhZGVyTGluZSlcblx0XHRcdGlmIChwcmV2SGVhZGVyTGluZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm4gcHJldkhlYWRlckxpbmVcblx0XHRcdH1cblx0XHRcdHJldHVybiBjdXJyZW50SGVhZGVyTGluZTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG5cdGdldEN1cnJlbnRIZWFkZXJMZXZlbCgpOiBudW1iZXIgfCBudWxsIHtcblx0XHRjb25zdCBjdXJyZW50SGVhZGVyTGluZSA9IHRoaXMuZmluZEN1cnJlbnRIZWFkZXJMaW5lKClcblxuXHRcdGlmIChjdXJyZW50SGVhZGVyTGluZSAhPT0gbnVsbCkge1xuXHRcdFx0Y29uc3QgbGluZVRleHQgPSB0aGlzLmdldExpbmVzKClbY3VycmVudEhlYWRlckxpbmVdO1xuXHRcdFx0Y29uc3QgaGVhZGVyTWF0Y2ggPSBsaW5lVGV4dC5tYXRjaCgvXigjezEsNn0pXFxzLyk7XG5cdFx0XHRyZXR1cm4gaGVhZGVyTWF0Y2ggPyBoZWFkZXJNYXRjaFsxXS5sZW5ndGggOiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cblx0Z2V0SGVhZGVyTGV2ZWwobGluZU51bWJlcjogbnVtYmVyKTogbnVtYmVyIHwgbnVsbCB7XG5cdFx0Y29uc3QgbGluZVRleHQgPSB0aGlzLmdldExpbmVzKClbbGluZU51bWJlcl07XG5cdFx0Y29uc3QgaGVhZGVyTWF0Y2ggPSBsaW5lVGV4dC5tYXRjaCgvXigjezEsNn0pXFxzLyk7XG5cdFx0cmV0dXJuIGhlYWRlck1hdGNoID8gaGVhZGVyTWF0Y2hbMV0ubGVuZ3RoIDogbnVsbDtcblx0fVxuXG5cdGdldEN1cnJlbnRIZWFkZXJMaW5lKCk6IG51bWJlciB8IG51bGwge1xuXG5cdFx0Y29uc3QgY3VycmVudExpbmUgPSB0aGlzLmVkaXRvci5nZXRDdXJzb3IoKS5saW5lO1xuXHRcdGNvbnN0IGN1cnJlbnRIZWFkZXJMaW5lID0gdGhpcy5maW5kSGVhZGVyTGluZShjdXJyZW50TGluZSwgLTEpXG5cblx0XHRyZXR1cm4gY3VycmVudEhlYWRlckxpbmVcblx0fVxuXG5cdGZpbmRIZWFkZXJBYm92ZSgpOiBudW1iZXIgfCBudWxsIHtcblx0XHRjb25zdCBjdXJyZW50TGluZSA9IHRoaXMuZWRpdG9yLmdldEN1cnNvcigpLmxpbmU7XG5cdFx0Y29uc3QgY3VycmVudEhlYWRlckxpbmUgPSB0aGlzLmZpbmRDdXJyZW50SGVhZGVyTGluZSgpO1xuXG5cdFx0Y29uc29sZS5sb2coXCJmaW5kSGVhZGVyQWJvdmVcIiwgeyBjdXJyZW50SGVhZGVyTGluZSwgY3VycmVudExpbmUgfSlcblx0XHRpZiAoY3VycmVudEhlYWRlckxpbmUgIT09IG51bGwgJiYgY3VycmVudEhlYWRlckxpbmUgPCBjdXJyZW50TGluZSkge1xuXHRcdFx0cmV0dXJuIGN1cnJlbnRIZWFkZXJMaW5lXG5cdFx0fVxuXHRcdGVsc2UgaWYgKGN1cnJlbnRIZWFkZXJMaW5lICE9PSBudWxsICYmIGN1cnJlbnRIZWFkZXJMaW5lID09PSBjdXJyZW50TGluZSkge1xuXHRcdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBvbiB0aGUgY3VycmVudCBoZWFkZXIgbGluZSwgZmluZCB0aGUgaGVhZGVyIGFib3ZlXG5cdFx0XHRjb25zdCBjdXJyZW50TGV2ZWwgPSB0aGlzLmdldEN1cnJlbnRIZWFkZXJMZXZlbCgpO1xuXHRcdFx0aWYgKGN1cnJlbnRMZXZlbCAhPT0gbnVsbCkge1xuXHRcdFx0XHRjb25zdCBsaW5lQWJvdmUgPSB0aGlzLmZpbmRIZWFkZXJMaW5lKGN1cnJlbnRMaW5lIC0gMSwgLTEsIGN1cnJlbnRMZXZlbCAtIDEpO1xuXHRcdFx0XHRpZiAobGluZUFib3ZlICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGxpbmVBYm92ZVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzLmZpbmRGaXJzdExpbmUoKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG51bGw7IC8vIFJldHVybiBudWxsIGlmIGN1cnJlbnRMZXZlbCBpcyBudWxsXG5cdFx0fSBlbHNlIGlmIChjdXJyZW50SGVhZGVyTGluZSAhPT0gbnVsbCkge1xuXHRcdFx0Ly8gTW92ZSB0byB0aGUgY3VycmVudCBoZWFkZXIgbGluZSBpZiB0aGUgY3Vyc29yIGlzIG5vdCBvbiBpdFxuXHRcdFx0cmV0dXJuIG51bGw7IC8vIEluZGljYXRlIHRoYXQgd2UgbW92ZWQgdG8gdGhlIGhlYWRlciBsaW5lXG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGZpcnN0TGluZSA9IHRoaXMuZmluZEZpcnN0TGluZSgpXG5cdFx0XHR0aGlzLm1vdmVUb0xpbmVBbmRTY3JvbGwoZmlyc3RMaW5lKVxuXHRcdH1cblxuXHRcdHJldHVybiBudWxsOyAvLyBObyBoZWFkZXIgZm91bmRcblx0fVxuXG5cdGZpbmRGaXJzdExpbmUoKTogbnVtYmVyIHtcblx0XHRjb25zdCBsaW5lcyA9IHRoaXMuZ2V0TGluZXMoKTtcblx0XHRsZXQgbGluZU51bWJlciA9IDA7XG5cblx0XHQvLyBDaGVjayBmb3IgZnJvbnRtYXR0ZXIgKFlBTUwpIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGRvY3VtZW50XG5cdFx0d2hpbGUgKGxpbmVOdW1iZXIgPCBsaW5lcy5sZW5ndGgpIHtcblx0XHRcdGNvbnN0IGxpbmUgPSBsaW5lc1tsaW5lTnVtYmVyXS50cmltKCk7XG5cdFx0XHRpZiAobGluZSA9PT0gJy0tLScpIHtcblx0XHRcdFx0Ly8gU2tpcCB0aGUgZnJvbnRtYXR0ZXIgc2VjdGlvblxuXHRcdFx0XHRsaW5lTnVtYmVyKys7XG5cdFx0XHRcdHdoaWxlIChsaW5lTnVtYmVyIDwgbGluZXMubGVuZ3RoICYmIGxpbmVzW2xpbmVOdW1iZXJdLnRyaW0oKSAhPT0gJy0tLScpIHtcblx0XHRcdFx0XHRsaW5lTnVtYmVyKys7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gTW92ZSBwYXN0IHRoZSBjbG9zaW5nICctLS0nXG5cdFx0XHRcdGxpbmVOdW1iZXIrKztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIFJldHVybiB0aGUgZmlyc3Qgbm9uLWZyb250bWF0dGVyIGxpbmVcblx0XHRcdFx0cmV0dXJuIGxpbmVOdW1iZXI7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaW5lTnVtYmVyOyAvLyBSZXR1cm4gbnVsbCBpZiB0aGVyZSBhcmUgbm8gdmFsaWQgbGluZXNcblx0fVxuXG5cdHByaXZhdGUgZmluZFBhdHRlcm5MaW5lKHBhdHRlckxpbmU6IHN0cmluZywgc3RhcnRMaW5lOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKTogbnVtYmVyIHwgbnVsbCB7XG5cdFx0Y29uc3QgbGluZXMgPSB0aGlzLmdldExpbmVzKCk7XG5cdFx0Y29uc3QgcGF0dGVybiA9IG5ldyBSZWdFeHAoYCR7cGF0dGVyTGluZX1gKTtcblxuXHRcdGZvciAobGV0IGkgPSBzdGFydExpbmU7IGkgPj0gMCAmJiBpIDwgbGluZXMubGVuZ3RoOyBpICs9IGRpcmVjdGlvbikge1xuXHRcdFx0aWYgKHBhdHRlcm4udGVzdChsaW5lc1tpXSkpIHtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdHByaXZhdGUgZmluZFBhZ2VMaW5lKHN0YXJ0TGluZTogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcik6IG51bWJlciB8IG51bGwge1xuXHRcdGNvbnN0IHBhdHRlcm4gPSBcIlxcXFx7XFxcXGQrXFxcXH1cXFxccyotK1wiO1xuXG5cdFx0cmV0dXJuIHRoaXMuZmluZFBhdHRlcm5MaW5lKHBhdHRlcm4sIHN0YXJ0TGluZSwgZGlyZWN0aW9uKTtcblx0fVxuXG5cdHBhZ2VEb3duKGxpbmVzSW5QYWdlID0gMjApOiBudW1iZXIgfCBudWxsIHtcblx0XHRjb25zdCBjdXJyZW50TGluZSA9IHRoaXMuZWRpdG9yLmdldEN1cnNvcigpLmxpbmU7XG5cdFx0Y29uc3QgbmV4dFBhdHRlcm5MaW5lID0gdGhpcy5maW5kUGFnZUxpbmUoY3VycmVudExpbmUgKyAxLCAxKVxuXG5cdFx0Y29uc29sZS5sb2coXCJuZXh0UGF0dGVybkxpbmVcIiwgbmV4dFBhdHRlcm5MaW5lKVxuXHRcdGlmIChuZXh0UGF0dGVybkxpbmUgIT09IG51bGwpIHtcblx0XHRcdHRoaXMubW92ZVRvTGluZUFuZFNjcm9sbChuZXh0UGF0dGVybkxpbmUgKyAwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gSWYgbm8gcGF0dGVybiBmb3VuZCwgc2Nyb2xsIGRvd24gYnkgYSBwYWdlXG5cdFx0XHRjb25zdCBsaW5lcyA9IHRoaXMuZ2V0TGluZXMoKTtcblx0XHRcdGNvbnN0IG5leHRQYWdlTGluZSA9IE1hdGgubWluKGN1cnJlbnRMaW5lICsgbGluZXNJblBhZ2UsIGxpbmVzLmxlbmd0aCAtIDEpO1xuXHRcdFx0dGhpcy5tb3ZlVG9MaW5lQW5kU2Nyb2xsKG5leHRQYWdlTGluZSk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXh0UGF0dGVybkxpbmVcblx0fVxuXG5cdHBhZ2VVcChsaW5lc0luUGFnZSA9IDIwKTogbnVtYmVyIHwgbnVsbCB7XG5cdFx0Y29uc3QgY3VycmVudExpbmUgPSB0aGlzLmVkaXRvci5nZXRDdXJzb3IoKS5saW5lO1xuXHRcdGxldCBwcmV2UGF0dGVybkxpbmUgPSB0aGlzLmZpbmRQYWdlTGluZShjdXJyZW50TGluZSAtIDEsIC0xKTtcblxuXHRcdGNvbnNvbGUubG9nKFwiLmkuLlwiKVxuXHRcdGNvbnNvbGUubG9nKFwicHJldlBhdHRlcm5MaW5lXCIsIHByZXZQYXR0ZXJuTGluZSlcblx0XHRpZiAocHJldlBhdHRlcm5MaW5lICE9PSBudWxsKSB7XG5cdFx0XHR0aGlzLm1vdmVUb0xpbmVBbmRTY3JvbGwocHJldlBhdHRlcm5MaW5lIC0gMCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIElmIG5vIHBhdHRlcm4gZm91bmQsIHNjcm9sbCB1cCBieSBhIHBhZ2Vcblx0XHRcdHByZXZQYXR0ZXJuTGluZSA9IE1hdGgubWF4KGN1cnJlbnRMaW5lIC0gbGluZXNJblBhZ2UsIDApO1xuXHRcdFx0dGhpcy5tb3ZlVG9MaW5lQW5kU2Nyb2xsKHByZXZQYXR0ZXJuTGluZSk7XG5cdFx0fVxuXHRcdHJldHVybiBwcmV2UGF0dGVybkxpbmVcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBFZGl0b3JIZWxwZXI7ICJdfQ==