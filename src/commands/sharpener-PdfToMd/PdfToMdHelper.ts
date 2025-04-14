import { App, FileSystemAdapter, MarkdownView, TFile, } from 'obsidian';
import { FileHelper } from 'src/Helpers/FileHelpers';
import { CurrentPageInfo } from './OpenPdfPageCommand';
import { LinkHelper } from 'src/Helpers/LinkHelper';

import { ViewPlugin, EditorView, ViewUpdate } from '@codemirror/view';

export class PdfToMdHelper {

	private app: App;
	private fileHelper: FileHelper
	private pdftomd_source = "pdftomd_source"

	constructor(app: App) {
		this.app = app;
		this.fileHelper = new FileHelper(app);
	}

	isFilePdfToMd(file: TFile): boolean {
		const pdfFile = this.getPdfTFileByFrontmatter(file)
		if (pdfFile) {
			return true
		}
		return false
	}

	getPdfTFileByFrontmatter(mdFile: TFile): TFile | null {
		const frontMatter = this.fileHelper.getFrontmatter(mdFile)
		if (frontMatter[this.pdftomd_source]) {
			return this.app.vault.getFileByPath(frontMatter[this.pdftomd_source])
		}
		return null
	}

	getMdByPdf(pdfTFile: TFile): TFile | null {
		console.log("getMdByPdf", pdfTFile)

		const linkHelper = new LinkHelper(this.app)
		const mdFiles = this.app.vault.getMarkdownFiles().find(fileMd => {
			const frontMatter = this.fileHelper.getFrontmatter(fileMd)
			let source = frontMatter[this.pdftomd_source]
			if (source) {
				source = linkHelper.clearLink(source)

				console.log("source", source)
				const sourceMdFile = this.app.metadataCache.getFirstLinkpathDest(source, "")
				if (sourceMdFile?.path == pdfTFile.path) {
					return sourceMdFile
				}
			}
		})
		console.log("mdFiles", mdFiles)
		return mdFiles || null
	}


	getActiveTFile(): TFile | null {
		return this.app.workspace.getActiveFile();
	}

	findPageInfo(editorView: EditorView, cursorLine: number): CurrentPageInfo {

		console.log("cursorLine", cursorLine)
		const PAGE_MARKER_REGEX = "\\{(\\d+)\\}\\s*-+"

		const currentPage: CurrentPageInfo = {
			startLinePage: 0,
			startLinePosition: 0,
			endLinePage: 0,
			endLinePosition: 0,
			pageNumber: 1,
		}

		const editor = editorView.state.doc
		// Search above the cursor for page start
		for (let i = cursorLine; i >= 0; i--) {
			const line = editor.line(i);
			const match = line.text.match(PAGE_MARKER_REGEX);
			//console.log("match", {i,match,line})
			if (match) {
				currentPage.startLinePage = i;
				currentPage.startLinePosition = editorView.state.doc.line(i).from
				currentPage.pageNumber = parseInt(match[1]);
				break;
			}
		}

		// Search below the cursor for page end
		const totalLines = editor.lines
		for (let i = cursorLine; i < totalLines; i++) {
			const line = editor.line(i);
			const match = line.text.match(PAGE_MARKER_REGEX);
			//console.log("match", {i,match,line})
			if (match && i > currentPage.startLinePage) {
				currentPage.endLinePage = i;
				currentPage.endLinePosition = editorView.state.doc.line(i).from
				break;
			}
		}

		// If no end found, set to last line
		if (currentPage.endLinePage === 0) {
			currentPage.endLinePage = totalLines - 1;
		}

		return currentPage;
	}
} // Find the page information around cursor