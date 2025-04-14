import { App, Notice, TFile, TFolder, Command } from 'obsidian';
import { MarkdownView } from 'obsidian';
import { FileHelper } from './Helpers/FileHelpers';
import LinkHelper from './Helpers/LinkHelper';
//import EditorHelper from './EditorHelper';
import { SharpenerCommand } from './Commons/types';

export class FindLinkedFilesCommand2 extends SharpenerCommand {
	id = 'find-linked-files-2';
	name = 'Find Linked Files 2';
	prefix = 'flf2';
	command: Command;
	fileHelper: FileHelper;
	activeFile: TFile | null;
	currentFilePath: string;

	async execute(app: App): Promise<void> {
		console.log('Executing FindLinkedFilesCommand2');
		this.fileHelper = new FileHelper(app);
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice('No active editor found.');
			return;
		}

		const editor = activeView.editor;
		this.activeFile = app.workspace.getActiveFile();

		if (!this.activeFile) {
			new Notice('No active file found.');
			return;
		}


		const files = app.vault.getMarkdownFiles();
		const linkedFiles: TFile[] = [];
		console.log("files", files.length);
		for (const file of files) {
			//console.log("----------", { "name": file.name, "path": file.path });
			let entityParentItems = await this.fileHelper.getFrontmatter(file)["entity_ParentItem"] || [];

			if (!Array.isArray(entityParentItems)) {
				entityParentItems = [entityParentItems];
			}
			//if (entityParentItems.length == 0) continue;

			const processEntityParentItems = (items: any) => {
				if (typeof items === 'string') {
					linkedFilesFromEntityParentItems.push(items);
				} else if (Array.isArray(items)) {
					for (const item of items) {
						processEntityParentItems(item); // Recursive call for each item
					}
				}
			};

			const linkedFilesFromEntityParentItems: string[] = [];
			processEntityParentItems(entityParentItems);

			const linkHelper = new LinkHelper( app);
			if (linkedFilesFromEntityParentItems.length > 0) {
				console.log("linkedFilesFromEntityParentItems", { file, linkedFilesFromEntityParentItems });
				for (const item of linkedFilesFromEntityParentItems) {
					const links = linkHelper.extractLinks(item)
					links.forEach(link => {
						if (!(link.url === this.activeFile?.basename || link.url === this.activeFile?.name)) return;

						const filefinded = app.vault.getMarkdownFiles().find(file2 => link.url === file2.basename || link.url === file2?.name)
						if (filefinded) {
							linkedFiles.push(file);
							console.log("filefinded", { file, linkedFiles });
						}
					});
				}
			}
		}
		console.log("files", files.length);
		console.log("linkedFiles", linkedFiles.length);
		console.log("linkedFiles", linkedFiles);

		if (linkedFiles.length === 0) {
			new Notice('No linked files found.');
			//	return;
		}

		if (editor) {
			const groupedLinkedFiles: { [key: string]: TFile[] } = {};

			// Group linked files by parent
			for (const linkedFile of linkedFiles) {
				let topLevelFolder: TFolder | undefined = linkedFile.parent instanceof TFolder ? linkedFile.parent : undefined;

				while (topLevelFolder && topLevelFolder.parent) {
					if (topLevelFolder.parent.path === "/") break;
					topLevelFolder = topLevelFolder.parent;
					console.log("topLevelFolder", topLevelFolder);
				}
				// If topLevelFolder has a parent, it means we need to go up to the root

				console.log("topLevelFolder1", topLevelFolder);
				if (topLevelFolder) {
					if (!groupedLinkedFiles[topLevelFolder.name]) {
						groupedLinkedFiles[topLevelFolder.name] = [];
					}
					groupedLinkedFiles[topLevelFolder.name].push(linkedFile);
				}
			}
			console.log("groupedLinkedFiles", groupedLinkedFiles);
			// Sort groups by parent name
			const sortedGroups = Object.keys(groupedLinkedFiles).sort().reduce<{ [key: string]: TFile[] }>((acc, key) => {
				acc[key] = groupedLinkedFiles[key].sort((a, b) => a.name.localeCompare(b.name));
				return acc;
			}, {});

			console.log("Sorted Groups", sortedGroups);
			const groupedLinkedFilesArrayString = Object.entries(sortedGroups).map(([parentName, files]) => {

				const parentLinkText = parentName

				const fileLinks = files.map(file => {
					console.log("file", file, this.activeFile!.path);
					const linkText = app.metadataCache.fileToLinktext(file, file.path);
					return `  - [[${linkText}]]`; // Sublist item
				}).join("\n");
				return `- ${parentLinkText}\n${fileLinks}`; // Main list item with sublist
			}).join("\n") + "\n---";

			const finalOutput = groupedLinkedFilesArrayString; // Combine main list and sublist

			const headerTitle = "# Childrens";
			console.log(finalOutput);
			await this.fileHelper.changeHeaderText(headerTitle, headerTitle, finalOutput, this.activeFile);

			new Notice('Linked files added to children header.');
		}
	}
}