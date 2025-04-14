import { App, Notice, MarkdownView, TFile, Command, Editor } from 'obsidian';
import { BasePdfToMdCommand } from './BasePdfToMdCommand';
import { ViewPlugin, EditorView, ViewUpdate } from '@codemirror/view';
import LinkHelper from 'src/Helpers/LinkHelper';
import { WorkspaceLeaf } from 'obsidian';
import { PdfToMdHelper } from './PdfToMdHelper';
import { EditorHelper } from 'src/Helpers/EditorHelper';

export class PageInfo {
	mdFilePathString: string;
	pdfFilePathString: string;
	edittor_startLinePage: number;
	edittor_endLinePage: number;
	edittor_pageNumber: number;
	editor_EditorView: EditorView;
	editor_Editor: Editor;
	leaf_pdf: WorkspaceLeaf;
	leaf_md: WorkspaceLeaf;
}
export interface CurrentPageInfo {
	startLinePage: number;
	startLinePosition: number;
	endLinePage: number;
	endLinePosition: number;
	pageNumber: number;
}

export class OpenPdfPageCommand extends BasePdfToMdCommand {
	id = 'open-pdf-page';
	name = 'Open PDF Page';
	prefix = 'opp';
	command: Command;


	check(app: App, checking: boolean): boolean {
		if (checking) {
			const activeView = app.workspace.getActiveViewOfType(MarkdownView);
			if (!activeView) {
				return false;
			}

			const activeFile = app.workspace.getActiveFile();
			if (!activeFile) {
				return false;
			}
			const frontmatter: any = app.metadataCache.getFileCache(activeFile)?.frontmatter || {};

			let pdfFileName: string = frontmatter[this.frontmannter_source_attribute];
			pdfFileName = pdfFileName.trim();
			if (pdfFileName) return true

			return false
		}
		this.execute(app)

		return true
	}
	// - [] нужн сделать обратную совместимать по откртому pdf файлу открытьва файл md, если не наоходиться то уведомление показывать
	async execute(app: App): Promise<void> {
		if (!this.check(app, true)) {
			return;
		}

		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice('No active editor found.');
			return;
		}



		const editor = activeView.editor;
		if (editor) {
			// Remove incorrect usage of `EditorView.updateListener.on`
			// Correct usage should be implemented based on the actual API of `EditorView` or related objects.
			// Since the current usage is incorrect, it will be removed until the correct implementation is determined.
		}
		const cursorPos = editor.getCursor();
		const content = editor.getValue();
		const lines = content.split('\n');

		const activeFile = app.workspace.getActiveFile();
		if (!activeFile) {
			new Notice('No active file found.');
			return;
		}
		const frontmatter: any = app.metadataCache.getFileCache(activeFile)?.frontmatter || {};

		let pdfFileName = frontmatter.pdftomd_source;

		const linkHelper = new LinkHelper(app)
		pdfFileName = linkHelper.clearLink(pdfFileName)
		console.log(frontmatter.pdftomd_source, pdfFileName)


		if (!pdfFileName) {
			new Notice('No PDF source found in frontmatter.');
			return;
		}


		const editorHelper = new EditorHelper(app)
		const editorView = editorHelper.getEditorView()

		const mdPageInfo = new PdfToMdHelper(app).findPageInfo(editorView, cursorPos.line);
		const mdPageNumber = mdPageInfo.pageNumber + 1; // Adding 1 as per original logic

		// Get the PDF file name from frontmatter


		// Open the PDF in the right leaf
		const filePath = app.vault.getFiles().find(file => file.path === pdfFileName || file.name === pdfFileName)?.path;
		console.log({ filePath, pdfFileName, pageNumber: mdPageNumber })
		if (filePath) {
			const pdfFile = app.vault.getAbstractFileByPath(filePath);
			console.log({ pdfFile })

			if (pdfFile instanceof TFile) {
				// Check if the PDF is already open in the right leaf
				// Iterate over all leaves and log their types
				app.workspace.iterateAllLeaves(leaf => {
					//					console.log(leaf.getViewState().type);
				});
				console.log(app.workspace.getLeavesOfType(""));

				let pdfLeaf = app.workspace.getLeavesOfType('pdf').find(leaf => {
					const viewState = leaf.getViewState();
					const file = viewState && viewState.state && viewState.state.file;
					console.log({ leaf, filePath, file })
					return file === filePath;
				});


				const activeLeaf = app.workspace.getMostRecentLeaf();
				if (!pdfLeaf) {
					// If not, open the PDF in a new right leaf
					if (activeLeaf) {

						// TODO: сделать чтобы фокус при создании 
						pdfLeaf = app.workspace.createLeafBySplit(activeLeaf, "vertical", true)
						console.log("pdfLeaf", pdfLeaf)
						// возвращаем фокус обратно в редактор
						activeFile && app.workspace.setActiveLeaf(activeLeaf!, { focus: true })
						await pdfLeaf.openFile(pdfFile, { state: { mode: "reader", page: mdPageNumber }, active: false });
						console.log("pageNumber", mdPageNumber)
						// TODO: удалить через некотровремя
						// Небольшая задержка, без нее при первом открытии не будет перехода на нужную страницу
						// вроде не нужно, после setActiveLeaf фокус переходит обратно в редактор
						await new Promise(resolve => setTimeout(resolve, 1000));

					}
				}
				console.log({ rightLeaf: pdfLeaf })
				let pageInfoFromLocalData = this.getMyPlugin().localData.get(editorView)
				if (!pageInfoFromLocalData) {
					pageInfoFromLocalData = new PageInfo()
					pageInfoFromLocalData.leaf_pdf = pdfLeaf!
					pageInfoFromLocalData.leaf_md = activeLeaf!
					pageInfoFromLocalData.mdFilePathString = activeFile.path
					pageInfoFromLocalData.pdfFilePathString = pdfFile.path
					pageInfoFromLocalData.edittor_startLinePage = mdPageInfo.startLinePage
					pageInfoFromLocalData.edittor_endLinePage = mdPageInfo.endLinePage
					pageInfoFromLocalData.edittor_pageNumber = mdPageNumber
					pageInfoFromLocalData.editor_EditorView = editorHelper.getEditorView()
					pageInfoFromLocalData.editor_Editor = activeView.editor

					this.getMyPlugin().localData.set(pageInfoFromLocalData.editor_EditorView, pageInfoFromLocalData)
				}

				if (pdfLeaf) {

					// TODO: сделать так чтобы не переходило на страницу если она уже открыта
					console.log("pdfLeaf", pdfLeaf.getViewState(), pdfLeaf.getDisplayText(), mdPageNumber)
					await pdfLeaf.view.setState({ mode: "reader", page: mdPageNumber }, { history: true })
				}

				if (activeLeaf) {

					//app.workspace.setActiveLeaf(activeLeaf!, { focus: true })
					const containerEl = (activeLeaf as any).containerEl;
					const pdfContainerEl = (pdfLeaf as any).containerEl;
					const container = containerEl.parentElement.parentElement.parentElement;
					const containerElRect = containerEl.getBoundingClientRect();
					container.scrollLeft = containerElRect.left - containerEl.offsetWidth; // Прокрутка вправо на 100px
					console.log("container", container, containerEl.offsetWidth, containerElRect, container.scrollLeft)
					console.log("containerEl", containerEl.parentElement.parentElement.parentElement, containerEl.parentElement.parentElement)
					pdfContainerEl.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'start' });

				}
			} else {
				new Notice('PDF file not found: ' + pdfFileName);
			}
		} else {
			new Notice('PDF file not found: ' + pdfFileName);
		}
	}
}
