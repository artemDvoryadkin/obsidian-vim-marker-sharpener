import { __awaiter } from "tslib";
import { SharpenerCommand } from 'src/Commons/SharpenerCommand';
import EditorHelper from 'src/Helpers/EditorHelper';
import { FormaterCommanger } from 'src/Helpers/FormaterHelper';
export class MarkerCommandBase extends SharpenerCommand {
    constructor() {
        super(...arguments);
        this.id = 'bold-command';
        this.name = 'Smart Toggle Bold';
        this.prefix = 'bc';
    }
    executeBase(app, markerAction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("command execute", markerAction);
            console.log("this.plugin.currentSelection", this.plugin.currentSelection);
            //ставим ервым так как елси ктото всызовет измение leaf ,то выделение пропадет
            const selectedVim = this.plugin.currentSelection;
            const editorHelper = new EditorHelper(app);
            const formatterCommanger = new FormaterCommanger();
            const isSelected = selectedVim && selectedVim[0].anchor.ch != selectedVim[0].head.ch;
            const head = isSelected && selectedVim[0].head;
            if (isSelected) {
                let from = selectedVim[0].head;
                let to = selectedVim[0].anchor;
                if (from.ch == -1)
                    from.ch = 0;
                console.log("command isSelected", { from, to, selectedVim: selectedVim[0] }, from, to);
                if (from.line > to.line || from.line == to.line && from.ch > to.ch)
                    [from, to] = [to, from];
                const lines = editorHelper.getLinesFromTo(from.line, to.line);
                // так как при выделении строки в режиме линий, передается /r и длинна ch больше на 1 нужно его уменьшить
                if (lines.length > 1) {
                    const lastLine = lines[lines.length - 1];
                    if (lastLine.length <= to.ch)
                        to.ch = lastLine.length - 1;
                }
                const selected = { anchor: { ch: from.ch, line: from.line }, head: { ch: to.ch - 1, line: to.line } };
                const newLinesText = formatterCommanger.markerMultiline(markerAction, lines, selected);
                console.log("newLinesText", newLinesText, selected);
                let changesLines = false;
                for (let i = 0; i < newLinesText.length; i++) {
                    if (i == 0)
                        from.ch = newLinesText[i].fromSelectPosition;
                    if (i == newLinesText.length - 1)
                        to.ch = ((_a = newLinesText[i].toSelectPosition) !== null && _a !== void 0 ? _a : newLinesText[i].lineText.length);
                    if (newLinesText[i].lineText != lines[i]) {
                        changesLines = true;
                    }
                }
                const linesText = newLinesText.map(line => line.lineText);
                if (changesLines) {
                    editorHelper.replaseLines(linesText, from.line, to.line);
                    selectedVim[0].anchor.ch = from.ch;
                    selectedVim[0].head.ch = to.ch;
                    //	editorHelper.getEditor().setSelection(selectedVim[0].anchor, selectedVim[0].head)
                    editorHelper.setCursor(selectedVim[0].head);
                }
            }
            else {
                const cursor = editorHelper.getCursor();
                const lineText = editorHelper.getLineByNumber(cursor.line);
                const newLineText = formatterCommanger.markerMarkerAction(markerAction, lineText, cursor.ch);
                if (newLineText.lineText != lineText) {
                    editorHelper.replaseLine(newLineText.lineText, cursor.line);
                    editorHelper.setCursor(cursor, 2);
                }
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya2VyQ29tbWFuZEJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNYXJrZXJDb21tYW5kQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxZQUFZLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFnQixpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzdFLE1BQU0sT0FBZ0IsaUJBQWtCLFNBQVEsZ0JBQWdCO0lBQWhFOztRQUNDLE9BQUUsR0FBRyxjQUFjLENBQUM7UUFDcEIsU0FBSSxHQUFHLG1CQUFtQixDQUFDO1FBQzNCLFdBQU0sR0FBRyxJQUFJLENBQUM7SUF1RWYsQ0FBQztJQXBFTSxXQUFXLENBQUMsR0FBUSxFQUFFLFlBQTBCOzs7WUFHckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMxRSw4RUFBOEU7WUFDOUUsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUVqRCxNQUFNLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUzQyxNQUFNLGtCQUFrQixHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztZQUVuRCxNQUFNLFVBQVUsR0FBRyxXQUFXLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFFckYsTUFBTSxJQUFJLEdBQUcsVUFBVSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFFL0MsSUFBSSxVQUFV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LENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6RCxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUNuQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUMvQixvRkFBb0Y7b0JBQ3BGLFlBQVksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QzthQUNEO2lCQUNJO2dCQUVKLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDeEMsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTNELE1BQU0sV0FBVyxHQUFHLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RixJQUFJLFdBQVcsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO29CQUNyQyxZQUFZLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1RCxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDbEM7YUFDRDs7S0FDRDtDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZCwgQXBwLCBFZGl0b3JQb3NpdGlvbiB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IFNoYXJwZW5lckNvbW1hbmQgfSBmcm9tICdzcmMvQ29tbW9ucy9TaGFycGVuZXJDb21tYW5kJztcbmltcG9ydCBFZGl0b3JIZWxwZXIgZnJvbSAnc3JjL0hlbHBlcnMvRWRpdG9ySGVscGVyJztcbmltcG9ydCB7IE1hcmtlckFjdGlvbiwgRm9ybWF0ZXJDb21tYW5nZXIgfSBmcm9tICdzcmMvSGVscGVycy9Gb3JtYXRlckhlbHBlcic7XG5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hcmtlckNvbW1hbmRCYXNlIGV4dGVuZHMgU2hhcnBlbmVyQ29tbWFuZCB7XG5cdGlkID0gJ2JvbGQtY29tbWFuZCc7XG5cdG5hbWUgPSAnU21hcnQgVG9nZ2xlIEJvbGQnO1xuXHRwcmVmaXggPSAnYmMnO1xuXHRjb21tYW5kOiBDb21tYW5kO1xuXG5cdGFzeW5jIGV4ZWN1dGVCYXNlKGFwcDogQXBwLCBtYXJrZXJBY3Rpb246IE1hcmtlckFjdGlvbik6IFByb21pc2U8dm9pZD4ge1xuXG5cblx0XHRjb25zb2xlLmxvZyhcImNvbW1hbmQgZXhlY3V0ZVwiLCBtYXJrZXJBY3Rpb24pO1xuXHRcdGNvbnNvbGUubG9nKFwidGhpcy5wbHVnaW4uY3VycmVudFNlbGVjdGlvblwiLCB0aGlzLnBsdWdpbi5jdXJyZW50U2VsZWN0aW9uKTtcblx0XHQvL9GB0YLQsNCy0LjQvCDQtdGA0LLRi9C8INGC0LDQuiDQutCw0Log0LXQu9GB0Lgg0LrRgtC+0YLQviDQstGB0YvQt9C+0LLQtdGCINC40LfQvNC10L3QuNC1IGxlYWYgLNGC0L4g0LLRi9C00LXQu9C10L3QuNC1INC/0YDQvtC/0LDQtNC10YJcblx0XHRjb25zdCBzZWxlY3RlZFZpbSA9IHRoaXMucGx1Z2luLmN1cnJlbnRTZWxlY3Rpb247XG5cblx0XHRjb25zdCBlZGl0b3JIZWxwZXIgPSBuZXcgRWRpdG9ySGVscGVyKGFwcCk7XG5cblx0XHRjb25zdCBmb3JtYXR0ZXJDb21tYW5nZXIgPSBuZXcgRm9ybWF0ZXJDb21tYW5nZXIoKTtcblxuXHRcdGNvbnN0IGlzU2VsZWN0ZWQgPSBzZWxlY3RlZFZpbSAmJiBzZWxlY3RlZFZpbVswXS5hbmNob3IuY2ggIT0gc2VsZWN0ZWRWaW1bMF0uaGVhZC5jaDtcblxuXHRcdGNvbnN0IGhlYWQgPSBpc1NlbGVjdGVkICYmIHNlbGVjdGVkVmltWzBdLmhlYWQ7XG5cblx0XHRpZiAoaXNTZWxlY3RlZCkge1xuXHRcdFx0bGV0IGZyb20gPSBzZWxlY3RlZFZpbVswXS5oZWFkIGFzIEVkaXRvclBvc2l0aW9uO1xuXHRcdFx0bGV0IHRvID0gc2VsZWN0ZWRWaW1bMF0uYW5jaG9yIGFzIEVkaXRvclBvc2l0aW9uO1xuXG5cdFx0XHRpZiAoZnJvbS5jaCA9PSAtMSkgZnJvbS5jaCA9IDA7XG5cblx0XHRcdGNvbnNvbGUubG9nKFwiY29tbWFuZCBpc1NlbGVjdGVkXCIsIHsgZnJvbSwgdG8sIHNlbGVjdGVkVmltOiBzZWxlY3RlZFZpbVswXSB9LCBmcm9tLCB0byk7XG5cdFx0XHRpZiAoZnJvbS5saW5lID4gdG8ubGluZSB8fCBmcm9tLmxpbmUgPT0gdG8ubGluZSAmJiBmcm9tLmNoID4gdG8uY2gpXG5cdFx0XHRcdFtmcm9tLCB0b10gPSBbdG8sIGZyb21dO1xuXG5cdFx0XHRjb25zdCBsaW5lcyA9IGVkaXRvckhlbHBlci5nZXRMaW5lc0Zyb21Ubyhmcm9tLmxpbmUsIHRvLmxpbmUpO1xuXG5cdFx0XHQvLyDRgtCw0Log0LrQsNC6INC/0YDQuCDQstGL0LTQtdC70LXQvdC40Lgg0YHRgtGA0L7QutC4INCyINGA0LXQttC40LzQtSDQu9C40L3QuNC5LCDQv9C10YDQtdC00LDQtdGC0YHRjyAvciDQuCDQtNC70LjQvdC90LAgY2gg0LHQvtC70YzRiNC1INC90LAgMSDQvdGD0LbQvdC+INC10LPQviDRg9C80LXQvdGM0YjQuNGC0Yxcblx0XHRcdGlmIChsaW5lcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdGNvbnN0IGxhc3RMaW5lID0gbGluZXNbbGluZXMubGVuZ3RoIC0gMV07XG5cdFx0XHRcdGlmIChsYXN0TGluZS5sZW5ndGggPD0gdG8uY2gpIHRvLmNoID0gbGFzdExpbmUubGVuZ3RoIC0gMTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgc2VsZWN0ZWQgPSB7IGFuY2hvcjogeyBjaDogZnJvbS5jaCwgbGluZTogZnJvbS5saW5lIH0sIGhlYWQ6IHsgY2g6IHRvLmNoIC0gMSwgbGluZTogdG8ubGluZSB9IH07XG5cdFx0XHRjb25zdCBuZXdMaW5lc1RleHQgPSBmb3JtYXR0ZXJDb21tYW5nZXIubWFya2VyTXVsdGlsaW5lKG1hcmtlckFjdGlvbiwgbGluZXMsIHNlbGVjdGVkKTtcblx0XHRcdGNvbnNvbGUubG9nKFwibmV3TGluZXNUZXh0XCIsIG5ld0xpbmVzVGV4dCwgc2VsZWN0ZWQpO1xuXG5cdFx0XHRsZXQgY2hhbmdlc0xpbmVzID0gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5ld0xpbmVzVGV4dC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoaSA9PSAwKSBmcm9tLmNoID0gbmV3TGluZXNUZXh0W2ldLmZyb21TZWxlY3RQb3NpdGlvbjtcblx0XHRcdFx0aWYgKGkgPT0gbmV3TGluZXNUZXh0Lmxlbmd0aCAtIDEpIHRvLmNoID0gKG5ld0xpbmVzVGV4dFtpXS50b1NlbGVjdFBvc2l0aW9uID8/IG5ld0xpbmVzVGV4dFtpXS5saW5lVGV4dC5sZW5ndGgpO1xuXHRcdFx0XHRpZiAobmV3TGluZXNUZXh0W2ldLmxpbmVUZXh0ICE9IGxpbmVzW2ldKSB7XG5cdFx0XHRcdFx0Y2hhbmdlc0xpbmVzID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBsaW5lc1RleHQgPSBuZXdMaW5lc1RleHQubWFwKGxpbmUgPT4gbGluZS5saW5lVGV4dCk7XG5cdFx0XHRpZiAoY2hhbmdlc0xpbmVzKSB7XG5cdFx0XHRcdGVkaXRvckhlbHBlci5yZXBsYXNlTGluZXMobGluZXNUZXh0LCBmcm9tLmxpbmUsIHRvLmxpbmUpO1xuXHRcdFx0XHRzZWxlY3RlZFZpbVswXS5hbmNob3IuY2ggPSBmcm9tLmNoO1xuXHRcdFx0XHRzZWxlY3RlZFZpbVswXS5oZWFkLmNoID0gdG8uY2g7XG5cdFx0XHRcdC8vXHRlZGl0b3JIZWxwZXIuZ2V0RWRpdG9yKCkuc2V0U2VsZWN0aW9uKHNlbGVjdGVkVmltWzBdLmFuY2hvciwgc2VsZWN0ZWRWaW1bMF0uaGVhZClcblx0XHRcdFx0ZWRpdG9ySGVscGVyLnNldEN1cnNvcihzZWxlY3RlZFZpbVswXS5oZWFkKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cblx0XHRcdGNvbnN0IGN1cnNvciA9IGVkaXRvckhlbHBlci5nZXRDdXJzb3IoKTtcblx0XHRcdGNvbnN0IGxpbmVUZXh0ID0gZWRpdG9ySGVscGVyLmdldExpbmVCeU51bWJlcihjdXJzb3IubGluZSk7XG5cblx0XHRcdGNvbnN0IG5ld0xpbmVUZXh0ID0gZm9ybWF0dGVyQ29tbWFuZ2VyLm1hcmtlck1hcmtlckFjdGlvbihtYXJrZXJBY3Rpb24sIGxpbmVUZXh0LCBjdXJzb3IuY2gpO1xuXHRcdFx0aWYgKG5ld0xpbmVUZXh0LmxpbmVUZXh0ICE9IGxpbmVUZXh0KSB7XG5cdFx0XHRcdGVkaXRvckhlbHBlci5yZXBsYXNlTGluZShuZXdMaW5lVGV4dC5saW5lVGV4dCwgY3Vyc29yLmxpbmUpO1xuXHRcdFx0XHRlZGl0b3JIZWxwZXIuc2V0Q3Vyc29yKGN1cnNvciwgMik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iXX0=