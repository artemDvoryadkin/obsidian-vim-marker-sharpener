import { App, EditorSelection, Plugin, PluginManifest, } from 'obsidian';

import { SharpenerCommand } from './Commons/SharpenerCommand';
import { DEFAULT_SETTINGS, MyPluginSettings, VimMarkerSharpenerSettingTab } from './VImMarkerShrpenerSettingTab';
import { EditorHelper } from './Helpers/EditorHelper';

import { HighlightCommand } from './commands/HighlightCommand';
import { BoldCommand } from './commands/BoldCommand';
import { ItalicCommand } from './commands/ItalicCommand';
import { StrikethroughCommand } from './commands/StrikethroughCommand';
import { VimCode1Command } from './commands/VimCode1Command';
import { CodeCommand } from './commands/CodeCommand';


export default class VimMarkerPlugin extends Plugin {

	commands: SharpenerCommand[] = [];
	settings: MyPluginSettings;
	readonly pluginName: string
	currentSelection: [EditorSelection] | null = null;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		this.pluginName = manifest.name
	}

	async onload() {
		console.log('loading %s plugin v%s ...', this.manifest.name, this.manifest.version);

		await this.loadSettings();
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

		//console.log("currentSelection-0", this.currentSelection)
		const selection = cm.listSelections()[0]
		const editorHelper = { anchor: { ch: selection.anchor.ch, line: selection.anchor.line }, head: { ch: selection.head.ch, line: selection.head.line } }
		//console.log("currentSelection-", editorHelper)
		this.currentSelection = [editorHelper];
		//console.log("currentSelection-1", this.currentSelection, this.currentSelection[0].anchor.ch, this.currentSelection[0].head.ch)
	}

	private getCursorActivityHandlers(cm: CodeMirror.Editor) {
		return (cm as any)._handlers.cursorActivity;
	}

	private initializePlugin(): void {
		this.addSettingTab(new VimMarkerSharpenerSettingTab(this.app, this));
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
			new HighlightCommand(this),
			new ItalicCommand(this),
			new StrikethroughCommand(this),
			new CodeCommand(this),
			new VimCode1Command(this)
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

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	onunload() {
		console.log(`onunload ${this.pluginName}`);
	}
}