import { App, Notice, WorkspaceLeaf, MarkdownView } from 'obsidian';
import { SharpenerCommand } from '../../Commons/types';
import { FileHelper } from '../../Helpers/FileHelpers';
import EditorHelper from '../../Helpers/EditorHelper';

export class LeaferFirstTabCommand extends SharpenerCommand {
	id = 'leafer-first-tab';
	name = 'LeaferFirstTab';
	prefix = 'leafer-first-tab';
	fileLinkHelper: FileHelper;
	fileHelper: FileHelper;
	editorHelper: EditorHelper;

	async execute(app: App): Promise<void> {
		this.fileLinkHelper = new FileHelper(app);
		this.fileHelper = new FileHelper(app);
		this.editorHelper = new EditorHelper(app);

		const currentFile = this.fileHelper.getActiveTFile();
		if (!currentFile) {
			new Notice('No file is currently open.');
			return;
		}
		const currentLeaf = app.workspace.getActiveViewOfType(MarkdownView);

		// Find the first leaf
		let searchLeaf: WorkspaceLeaf | null = null;
		app.workspace.iterateAllLeaves(leaf => {
			if (searchLeaf == null) {
				searchLeaf = leaf;
				const dd = searchLeaf.view as MarkdownView;
				console.log("searchLeaf", dd.file);
			}
			return false;
		});

		console.log("searchLeaf", searchLeaf);
		if (!searchLeaf) {
			new Notice('No leaf found to split.');
			return;
		}
		// что будет если убрать фокус
		app.workspace.setActiveLeaf(searchLeaf, { focus: true });
		const newLeaf = await app.workspace.getLeaf('split', 'vertical');

		console.log("newLeaf", newLeaf);
		// Get the view state of the new leaf

		// Open the current file in the new leaf
		const view = (searchLeaf as WorkspaceLeaf).view as MarkdownView;
		if (view.file) {
			await newLeaf.openFile(view.file);
		}

		await (searchLeaf as WorkspaceLeaf).openFile(currentFile)

		// Close the current leaf
		if (currentLeaf?.leaf) {
			currentLeaf?.leaf.detach()
		}

		// Transfer focus to the new leaf
		app.workspace.setActiveLeaf(searchLeaf, { focus: true });
	}
}