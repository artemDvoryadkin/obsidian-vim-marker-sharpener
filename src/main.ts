import { EditorSelection, MarkdownView, Notice, Plugin, TFile, PluginManifest, MarkdownPostProcessor, Menu, MenuItem } from 'obsidian';

import { CloseAndSwitchTabCommand } from './CloseAndSwitchTabCommand';
import { ConvertMarkdownLinksCommand } from './Links/ConvertMarkdownLinksCommand';
import { ConvertMarkdownLinksDirCommand } from './Links/ConvertMarkdownLinksDirCommand';
import { ExtractHighlightsCommand } from './ExtractHighlightsCommand';
import { ExtractSectionCommand } from './ExtractSectionCommand';
import { ExtractTextCommand } from './ExtractTextCommand';
import { FilteredCommandPaletteCommand } from './FilteredCommandPaletteCommand';
import { FindCurrentHeaderLineCommand } from './headers/FindCurrentHeaderLineCommand';
import { FindEntityParentCommand } from './FindEntityParentCommand';
import { FindHeaderAboveCommand } from './headers/FindHeaderAboveCommand';
import { FindHeaderCommand } from './FindHeaderCommand';
import { FindLinkedFilesCommand } from './FindLinkedFilesCommand';
import { FindLinkedFilesCommand2 } from './FindLinkedFilesCommand2';
import { FindNextHeaderLineCommand } from './headers/FindNextHeaderLineCommand';
import { FindNextHeaderWithCurrentLevelCommand } from './headers/FindNextHeaderWithCurrentLevelCommand';
import { FindPreviousHeaderLineCommand } from './headers/FindPreviousHeaderLineCommand';
import { FindPreviousHeaderWithCurrentLevelCommand } from './headers/FindPreviousHeaderWithCurrentLevelCommand';
import { FindReferencesCommand } from './FindReferencesCommand';
import { FormatHeadersCommand } from './FormatHeadersCommand';
import { ListFilesCommand } from './ListFilesCommand';
import { HelloCommand } from './HelloCommand';
import { OpenBrowserWithCurrentLineCommand } from './OpenBrowserWithCurrentLineCommand';
import { OpenTestFileCommand } from './OpenTestFileCommand';
import { SplitAndCloseTabCommand } from './SplitAndCloseTabCommand';
import { RenameAliasCommand } from './RenameAliasCommand';
import { RenameBasedOnFrontmatterCommand } from './RenameBasedOnFrontmatterCommand';
import { RenameFileCommand } from './RenameFileCommand';
import { SortFrontmatterCommand } from './SortFrontmatterCommand';
import { PageDownCommand, } from './commands/sharpener-PdfToMd/PageDownCommand';
import { PageUpCommand } from './commands/sharpener-PdfToMd/PageUpCommand';
import { OpenPdfPageCommand, PageInfo } from './commands/sharpener-PdfToMd/OpenPdfPageCommand';
import { PdfToMdConvertCommand } from './commands/sharpener-PdfToMd/PdfToMdCommand';
import { SharpenerCommand } from './Commons/types';
import { PdfToMdCancelCommand } from './commands/PdfToMdCancelCommand.1';
import { LeaferFirstTabCommand } from './commands/leafers/LeaferFirstTabCommand';
import { LinkToPdfToMdFileCommand } from './commands/sharpener-PdfToMd/LinkToPdfToMdFileCommand';
import { SyncMdAndPagePdfCommand } from './commands/sharpener-PdfToMd/SyncMdAndPagePdfCommand';
import { DEFAULT_SETTINGS, MyPluginSettings, MyPluginSettingTab } from './MyPluginSettingTab';
import { App, Modal, MarkdownPostProcessorContext } from "obsidian";
import { OpenLinkInNewSplitCommand } from './OpenLinkInNewSplitCommand';
import { CloseRightLeavesCommand } from './CloseRightLeavesCommand';
import { CloseRightLeafCommand } from './CloseRightLeafCommand';
import { PdfToMdHelper } from './commands/sharpener-PdfToMd/PdfToMdHelper';
import { EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { EditorHelper } from './Helpers/EditorHelper';
import { PdfViewPluigin } from './commands/sharpener-PdfToMd/Common/tt';
import { ExtractSelectedTextCommand } from './commands/sharpener-PdfToMd/ExtractSelectedTextCommand';
import { HighlightCommand } from './commands/sharpener-PdfToMd/HighlightCommand';
import { BoldCommand } from './commands/sharpener-PdfToMd/BoldCommand.1';
import { ItalicCommand } from './commands/sharpener-PdfToMd/ItalicCommand';
import { StrikethroughCommand } from './commands/sharpener-PdfToMd/StrikethroughCommand';
import { VimCode1Command } from './commands/sharpener-PdfToMd/VimCode1Command';
import { CodeCommand } from './commands/sharpener-PdfToMd/CodeCommand';


export default class MyPlugin extends Plugin {
	commands: SharpenerCommand[] = [];
	settings: MyPluginSettings;
	readonly pluginName = 'Sharpener';
	public localData = new Map<EditorView, PageInfo>();
	currentSelection: [EditorSelection] | null = null;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);

	}

	async onload() {
		console.log(`${this.pluginName} plugin loaded2`);

		await this.loadSettings();
		this.initializePlugin();
		this.registerEventHandlers();
		this.registerCommands();
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
	private getActiveView(): MarkdownView {
		return this.app.workspace.getActiveViewOfType(MarkdownView) as MarkdownView;
	}
	private getCodeMirror(view: MarkdownView): CodeMirror.Editor {
		return (view as any).editMode?.editor?.cm?.cm;
	}
	async updateSelectionEvent() {

		//console.log("updateSelectionEvent");
		const view = this.getActiveView();
		if (!view) return;

		const cm = this.getCodeMirror(view);
		if (!cm) return;
		if (
			this.getCursorActivityHandlers(cm).some(
				(e: { name: string }) => {
					console.log("e", e)
					return e.name === "updateSelection"
				}
			)
		) return;
		cm.on("cursorActivity", async (cm: CodeMirror.Editor) => await this.updateSelection(cm));
	}
	async updateSelection(cm: any) {

		console.log("currentSelection-0", this.currentSelection)
		const selection = cm.listSelections()[0]
		const editorHelper = { anchor: { ch: selection.anchor.ch, line: selection.anchor.line }, head: { ch: selection.head.ch, line: selection.head.line } }
		console.log("currentSelection-", editorHelper)
		this.currentSelection = [editorHelper];
		console.log("currentSelection-1", this.currentSelection, this.currentSelection[0].anchor.ch, this.currentSelection[0].head.ch)
	}

	private getCursorActivityHandlers(cm: CodeMirror.Editor) {
		return (cm as any)._handlers.cursorActivity;
	}

	private initializePlugin(): void {
		this.registerEditorExtension(ViewPlugin.define(
			(view) => new PdfViewPluigin(view, this)
		));
		this.addSettingTab(new MyPluginSettingTab(this.app, this));
		this.setupStatusBar();
		this.setupRibbonIcon();
	}

	private setupStatusBar(): void {
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');
	}

	private setupRibbonIcon(): void {
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', () => {
			new Notice('This is a notice!');
		});
		ribbonIconEl.addClass('my-plugin-ribbon-class');
	}

	private registerEventHandlers(): void {
		this.registerEditorMenuEvents();
		this.registerMarkdownPostProcessor();
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		this.app.workspace.on("active-leaf-change", async () => {
			this.updateSelectionEvent();
		});

		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file, source, leaf) => {
				if (!file || (file as TFile).extension === "") return;

				menu.addSeparator();
				const pdftomdHelper = new PdfToMdHelper(this.app);
				const fileMd = pdftomdHelper.getMdByPdf(file as TFile);

				if (fileMd) {
					this.addOpenInSystemViewerMenuItem(menu, fileMd);
				} else {
					this.addConvertToMdMenuItem(menu);
				}
				menu.addSeparator();
			})
		);
	}


	private addOpenInSystemViewerMenuItem(menu: Menu, fileMd: TFile): void {
		menu.addItem((item: MenuItem) => {
			item
				.setTitle(`Открыть в системном просмотрщике ${fileMd.name}`)
				.setIcon("pdf-file")
				.onClick(() => {
					const editorHelper = new EditorHelper(this.app);
					editorHelper.splitLiafVertical(fileMd.path, false);
				});
		});
	}

	private addConvertToMdMenuItem(menu: Menu): void {
		menu.addItem((item: MenuItem) => {
			item
				.setTitle("convert to md")
				.setIcon("pdf-file")
				.onClick(() => {
					const pdfToMdCommand = this.commands.find(cmd => cmd instanceof PdfToMdConvertCommand);
					pdfToMdCommand?.execute(this.app);
				});
		});
	}

	private registerEditorMenuEvents(): void {
		this.app.workspace.on("editor-menu", (menu, editor, info) => {
			menu.addItem((item) => {
				item
					.setTitle("Открыть в системном просмотрщике")
					.setIcon("pdf-file")
					.onClick(() => {
						// Implement system viewer opening logic
					});
			});
		});
	}

	public registerMarkdownPostProcessor(): MarkdownPostProcessor {
		return (el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
			el.querySelectorAll("a").forEach((link) => {
				if (link.textContent?.startsWith("cmd:")) {
					link.classList.add("hover-modal-link");
					link.addEventListener("mouseenter", () => {
						new HoverModal(this.app, link.textContent || "").open();
					});
				}
			});
		};
	}

	private registerCommands(): void {
		this.initializeCommands();

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

	private initializeCommands(): void {
		this.commands = [
			new FindCurrentHeaderLineCommand(this),
			new RenameAliasCommand(this),
			new FindReferencesCommand(this),
			new ExtractTextCommand(this),
			new FormatHeadersCommand(this),
			new ListFilesCommand(this),
			new RenameFileCommand(this),
			new OpenTestFileCommand(this),
			new SortFrontmatterCommand(this),
			new ExtractHighlightsCommand(this),
			new HelloCommand(this),
			new FilteredCommandPaletteCommand(this),
			new CloseAndSwitchTabCommand(this),
			new SplitAndCloseTabCommand(this),
			new RenameBasedOnFrontmatterCommand(this),
			new FindEntityParentCommand(this),
			new ExtractSectionCommand(this),
			new OpenPdfPageCommand(this),
			new FindHeaderCommand(this),
			new FindCurrentHeaderLineCommand(this),
			new FindNextHeaderLineCommand(this),
			new FindPreviousHeaderLineCommand(this),
			new FindNextHeaderWithCurrentLevelCommand(this),
			new FindHeaderAboveCommand(this),
			new FindPreviousHeaderWithCurrentLevelCommand(this),
			new FindLinkedFilesCommand(this),
			new ConvertMarkdownLinksCommand(this),
			new ConvertMarkdownLinksDirCommand(this),
			new OpenBrowserWithCurrentLineCommand(this),
			new FindLinkedFilesCommand2(this),

			new PdfToMdConvertCommand(this),
			new PdfToMdCancelCommand(this),
			new PageDownCommand(this),
			new PageUpCommand(this),
			new OpenPdfPageCommand(this),
			new LeaferFirstTabCommand(this),
			new LinkToPdfToMdFileCommand(this),
			new SyncMdAndPagePdfCommand(this),
			new OpenLinkInNewSplitCommand(this),
			new CloseRightLeavesCommand(this),
			new CloseRightLeafCommand(this),
			new ExtractSelectedTextCommand(this),
			new BoldCommand(this),
			new HighlightCommand(this),
			new ItalicCommand(this),
			new StrikethroughCommand(this),
			new CodeCommand(this),
			new VimCode1Command(this)
		];
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	onunload() {
		console.log(`onunload`);
	}
}

class HoverModal extends Modal {
	command: string;

	constructor(app: App, command: string) {
		super(app);
		this.command = command.replace("cmd:", "");
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText(`Command: ${this.command}`);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}