import { EditorView, ViewUpdate } from '@codemirror/view';
import MyPlugin from 'src/main';
import { PdfToMdHelper } from '../PdfToMdHelper';
import { PageInfo } from '../OpenPdfPageCommand';


export class PdfViewPluigin {
	plugin: MyPlugin;

	constructor(view: EditorView, plugin: MyPlugin) {
		this.plugin = plugin;
		this.updateCursor(view, plugin);  // передаем app в конструктор
	}

	update(update: ViewUpdate) {
		if (update.selectionSet) {
			this.updateCursor(update.view, this.plugin);  // передаем app в метод
		}
	}

	updateCursor(view: EditorView, plugin: MyPlugin) {
		//console.log("updateCursor", view, plugin)
		const pageInfo2 = (plugin.localData.get(view)) as PageInfo;

		if (!pageInfo2) {
			return;
		}

		const cursor = view.state.selection.main.head;
		const line = pageInfo2.editor_Editor.getCursor().line

		console.log(`Курсор переместился: строка ${line}, позиция ${cursor - line}`);
		console.log("agrigate", { line, pageinfo2: pageInfo2.edittor_pageNumber, pageInfo2 })

		if (pageInfo2.edittor_endLinePage >= line && pageInfo2.edittor_startLinePage <= line) {
			return
		}
		const pageInfo = new PdfToMdHelper(plugin.app).findPageInfo(view, line)

		console.log('pageInfo', pageInfo)
		if (pageInfo2) {

			// TODO: сделать так чтобы не переходило на страницу если она уже открыта
			const pagenumberNew = pageInfo.pageNumber + 1
			console.log("pdfLeaf", pageInfo2.leaf_pdf.getViewState(), pageInfo2.leaf_pdf.getDisplayText())
			pageInfo2.leaf_pdf.view.setState({ mode: "reader", page: pagenumberNew }, { history: true })

			if (line >= pageInfo2.edittor_endLinePage)
				requestAnimationFrame(() => {
					view.dispatch({ effects: EditorView.scrollIntoView(pageInfo.startLinePosition, { y: "start" }), });
				});
			if (line <= pageInfo2.edittor_startLinePage)
				requestAnimationFrame(() => {
					view.dispatch({ effects: EditorView.scrollIntoView(pageInfo.endLinePosition, { y: "end" }), });
				});

			pageInfo2.edittor_pageNumber = pageInfo.pageNumber
			pageInfo2.edittor_startLinePage = pageInfo.startLinePage
			pageInfo2.edittor_endLinePage = pageInfo.endLinePage

			plugin.localData.set(view, pageInfo2)
		}
	}
}