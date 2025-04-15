import { Command, App } from 'obsidian';
import { SharpenerCommand } from 'src/Commons/SharpenerCommand';

export class VimCode1Command extends SharpenerCommand {
	id: 'vimcommand';
	name: 'zzzzzExecute command in Vim mode';
	private codeMirrorVimObject: any = null;
	command: Command;
	prefix = 'zzzz';
	codeMirrorVimObjecta: any;

	async execute(app: App): Promise<void> {
		this.codeMirrorVimObject = (window as any).CodeMirrorAdapter?.Vim;

		// Получаем доступ к редактору CodeMirror в активной заметке
		const editor = app.workspace.activeEditor?.editor as any;
		if (!editor?.cm) return;

		if (this.codeMirrorVimObject) {
			// Выполняем команду :ппз
			console.log("asdfi");
			console.log(this.codeMirrorVimObject);
			this.codeMirrorVimObject.handleEx(editor.cm, "nmap !z itest");
			console.log('Executed :ппз command in Vim mode');
		}
	}
}
