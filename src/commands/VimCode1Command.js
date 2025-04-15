import { __awaiter } from "tslib";
import { SharpenerCommand } from 'src/Commons/SharpenerCommand';
export class VimCode1Command extends SharpenerCommand {
    constructor() {
        super(...arguments);
        this.codeMirrorVimObject = null;
        this.prefix = 'zzzz';
    }
    execute(app) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.codeMirrorVimObject = (_a = window.CodeMirrorAdapter) === null || _a === void 0 ? void 0 : _a.Vim;
            // Получаем доступ к редактору CodeMirror в активной заметке
            const editor = (_b = app.workspace.activeEditor) === null || _b === void 0 ? void 0 : _b.editor;
            if (!(editor === null || editor === void 0 ? void 0 : editor.cm))
                return;
            if (this.codeMirrorVimObject) {
                // Выполняем команду :ппз
                console.log("asdfi");
                console.log(this.codeMirrorVimObject);
                this.codeMirrorVimObject.handleEx(editor.cm, "nmap !z itest");
                console.log('Executed :ппз command in Vim mode');
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmltQ29kZTFDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVmltQ29kZTFDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVoRSxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxnQkFBZ0I7SUFBckQ7O1FBR1Msd0JBQW1CLEdBQVEsSUFBSSxDQUFDO1FBRXhDLFdBQU0sR0FBRyxNQUFNLENBQUM7SUFrQmpCLENBQUM7SUFmTSxPQUFPLENBQUMsR0FBUTs7O1lBQ3JCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxNQUFDLE1BQWMsQ0FBQyxpQkFBaUIsMENBQUUsR0FBRyxDQUFDO1lBRWxFLDREQUE0RDtZQUM1RCxNQUFNLE1BQU0sR0FBRyxNQUFBLEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSwwQ0FBRSxNQUFhLENBQUM7WUFDekQsSUFBSSxDQUFDLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEVBQUUsQ0FBQTtnQkFBRSxPQUFPO1lBRXhCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUM3Qix5QkFBeUI7Z0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO2FBQ2pEOztLQUNEO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kLCBBcHAgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBTaGFycGVuZXJDb21tYW5kIH0gZnJvbSAnc3JjL0NvbW1vbnMvU2hhcnBlbmVyQ29tbWFuZCc7XG5cbmV4cG9ydCBjbGFzcyBWaW1Db2RlMUNvbW1hbmQgZXh0ZW5kcyBTaGFycGVuZXJDb21tYW5kIHtcblx0aWQ6ICd2aW1jb21tYW5kJztcblx0bmFtZTogJ3p6enp6RXhlY3V0ZSBjb21tYW5kIGluIFZpbSBtb2RlJztcblx0cHJpdmF0ZSBjb2RlTWlycm9yVmltT2JqZWN0OiBhbnkgPSBudWxsO1xuXHRjb21tYW5kOiBDb21tYW5kO1xuXHRwcmVmaXggPSAnenp6eic7XG5cdGNvZGVNaXJyb3JWaW1PYmplY3RhOiBhbnk7XG5cblx0YXN5bmMgZXhlY3V0ZShhcHA6IEFwcCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuY29kZU1pcnJvclZpbU9iamVjdCA9ICh3aW5kb3cgYXMgYW55KS5Db2RlTWlycm9yQWRhcHRlcj8uVmltO1xuXG5cdFx0Ly8g0J/QvtC70YPRh9Cw0LXQvCDQtNC+0YHRgtGD0L8g0Log0YDQtdC00LDQutGC0L7RgNGDIENvZGVNaXJyb3Ig0LIg0LDQutGC0LjQstC90L7QuSDQt9Cw0LzQtdGC0LrQtVxuXHRcdGNvbnN0IGVkaXRvciA9IGFwcC53b3Jrc3BhY2UuYWN0aXZlRWRpdG9yPy5lZGl0b3IgYXMgYW55O1xuXHRcdGlmICghZWRpdG9yPy5jbSkgcmV0dXJuO1xuXG5cdFx0aWYgKHRoaXMuY29kZU1pcnJvclZpbU9iamVjdCkge1xuXHRcdFx0Ly8g0JLRi9C/0L7Qu9C90Y/QtdC8INC60L7QvNCw0L3QtNGDIDrQv9C/0Ldcblx0XHRcdGNvbnNvbGUubG9nKFwiYXNkZmlcIik7XG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvZGVNaXJyb3JWaW1PYmplY3QpO1xuXHRcdFx0dGhpcy5jb2RlTWlycm9yVmltT2JqZWN0LmhhbmRsZUV4KGVkaXRvci5jbSwgXCJubWFwICF6IGl0ZXN0XCIpO1xuXHRcdFx0Y29uc29sZS5sb2coJ0V4ZWN1dGVkIDrQv9C/0LcgY29tbWFuZCBpbiBWaW0gbW9kZScpO1xuXHRcdH1cblx0fVxufVxuIl19