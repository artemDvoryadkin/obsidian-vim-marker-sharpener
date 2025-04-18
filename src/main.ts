import { App, EditorSelection, Plugin, PluginManifest, } from 'obsidian';

import { SharpenerCommand } from './Commons/SharpenerCommand';
import { EditorHelper } from './Helpers/EditorHelper';

import { HighlightCommand } from './commands/HighlightCommand';
import { BoldCommand } from './commands/BoldCommand';
import { CommentCommand } from './commands/CommentCommand';
import { ItalicCommand } from './commands/ItalicCommand';
import { StrikethroughCommand } from './commands/StrikethroughCommand';
import { CodeCommand } from './commands/CodeCommand';

// TODO: > Этот **плагин работает корректно c выделением текста_** в режиме **vim VISUAL, VISUAL LINE**.
// если перейти vim и снять выделение то выделение снимится в первого болда, проблема в подчеркивании _**, если убрать то работает корректно
export default class VimMarkerPlugin extends Plugin {

	commands: SharpenerCommand[] = [];
	readonly pluginName: string
	currentSelection: [EditorSelection] | null = null;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		this.pluginName = manifest.name
	}


	async onload() {
		console.log('loading %s plugin v%s ...', this.manifest.name, this.manifest.version);

		//await this.loadSettings();
		this.initializePlugin();
		this.registerEventHandlers();
		this.registerCommands();
		console.log(`loaded ${this.pluginName}`);
	}
	private registerEvents(): void {
		this.app.workspace.on("active-leaf-change", async () => {
			this.updateSelectionEvent();
		});
		// and this don't trigger on opening same file in new pane
		this.app.workspace.on("file-open", async () => {
			this.updateSelectionEvent();
		});
	}
	async updateSelectionEvent() {

		const edittorHelper = new EditorHelper(this.app)
		const view = edittorHelper.getActiveView();
		if (!view) return;

		const cm = edittorHelper.getCodeMirror(view);
		if (!cm) return;
		if (
			this.getCursorActivityHandlers(cm).some(
				(e: { name: string }) => {
					return e.name === "updateSelection"
				}
			)
		) return;
		cm.on("cursorActivity", async (cm: CodeMirror.Editor) => await this.updateSelection(cm));
	}
	async updateSelection(cm: any) {

		const selection = cm.listSelections()[0]
		const editorHelper = { anchor: { ch: selection.anchor.ch, line: selection.anchor.line }, head: { ch: selection.head.ch, line: selection.head.line } }
		this.currentSelection = [editorHelper];
	}

	private getCursorActivityHandlers(cm: CodeMirror.Editor) {
		return (cm as any)._handlers.cursorActivity;
	}

	private initializePlugin(): void {
	}


	private registerEventHandlers(): void {

		this.app.workspace.on("active-leaf-change", async () => {
			this.updateSelectionEvent();
		});
		this.app.workspace.on("file-open", async () => {
			this.updateSelectionEvent();
		});

	}
	private registerCommands(): void {
		this.commands = [
			new BoldCommand(this),
			new CodeCommand(this),
			new CommentCommand(this),
			new HighlightCommand(this),
			new ItalicCommand(this),
			new StrikethroughCommand(this),
		];

		try {
			for (const command of this.commands) {
				command.command = this.addCommand({
					id: command.id,
					name: `${command.prefix} ${command.name}`,
					callback: () => command.execute(this.app),
					checkCallback: (checking: boolean) => command.check(this.app, checking),
				});
			}
		} catch (error) {
			console.error('Error registering commands:', error);
		}
	}



	onunload() {
		console.log(`onunload ${this.pluginName}`);
	}
}
