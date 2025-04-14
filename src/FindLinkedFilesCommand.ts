import { App, Notice, TFile, Command } from 'obsidian';
import { MarkdownView } from 'obsidian';
import { FileHelper } from './Helpers/FileHelpers';
import LinkHelper from './Helpers/LinkHelper';
//import EditorHelper from './EditorHelper';
import { SharpenerCommand } from './Commons/types';

export class FindLinkedFilesCommand extends SharpenerCommand {
	id = 'find-linked-files';
	name = 'Find Linked Files';
	prefix = 'flf';
	command: Command;
	fileLinkHelper: FileHelper;
	activeFile: TFile | null;
	currentFilePath: string;


	async execute(app: App): Promise<void> {
		this.fileLinkHelper = new FileHelper(app);
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

		this.currentFilePath = this.activeFile.basename;

		// Get path lists to root
		const pathLists = await this.fileLinkHelper.getPathListsToRoot(this.activeFile);
		console.log("Path lists to root:", pathLists);

		const files = await app.vault.getMarkdownFiles();
		const linkedFiles: TFile[] = [];

		for (const file of files) {
			//console.log("----------", { "name": file.name, "path": file.path });
			let entityParentItems = await this.fileLinkHelper.getFrontmatter(file)["entity_ParentItem"] || [];

			if (!Array.isArray(entityParentItems)) {
				entityParentItems = [entityParentItems];
			}

			const linkedFilesFromEntityParentItems: string[] = [];

			const processEntityParentItems = (items: any) => {
				if (typeof items === 'string') {
					linkedFilesFromEntityParentItems.push(items);
				} else if (Array.isArray(items)) {
					for (const item of items) {
						processEntityParentItems(item); // Recursive call for each item
					}
				}
			};

			processEntityParentItems(entityParentItems);

			const linkHelper = new LinkHelper( app);
			for (const item of linkedFilesFromEntityParentItems) {
				const links = linkHelper.extractLinks(item)
				links.forEach(link => {
					if (link.fileExists) {
						const filefinded = app.vault.getMarkdownFiles().find(file => file.basename === link.url)
						if (filefinded) {
							linkedFiles.push(filefinded);
							console.log("file", { file, linkedFiles });
						}
					}
				});
			}
		}

		console.log("files", files.length);
		console.log("linkedFiles", linkedFiles.length);
		if (linkedFiles.length === 0) {
			new Notice('No linked files found.');
			//	return;
		}

		/*
				await app.fileManager.processFrontMatter(activeFile, (frontmatter) => {
					if (!frontmatter.children) {
						frontmatter.children = [];
					}
					frontmatter.children = linkedFiles;
				});
		*/
		// Ensure 'children' header is added immediately after frontmatter
		console.log("linkedFiles", { linkedFiles });

		if (editor) {
			//const editorHelper = new EditorHelper(editor);
			//const content = editor.getValue();
			//const lines = content.split('\n');
			//const frontmatterEndIndex = editorHelper.findFirstLine() - 1;

			const metadataCache = app.metadataCache;
			const tt = metadataCache.unresolvedLinks;
			const resolvedLinks = metadataCache.resolvedLinks[this.activeFile.path];
			const linkedMentions = this.fileLinkHelper.getLinkedMentions(this.activeFile);
			const linkedMentions2 = this.fileLinkHelper.getLinkedMentions2(this.activeFile);
			console.log("linkedMentions", linkedMentions);
			console.log("linkedMentions2", linkedMentions2);

			const unresolvedLinks: Record<string, number> = metadataCache.unresolvedLinks[this.activeFile.path];
			const unresolvedLinksArray = Object.keys(unresolvedLinks).map(link => `[[${link}]]`);
			console.log("unresolvedLinksArray", tt, resolvedLinks, this.activeFile.path, { unresolvedLinksArray, tt });

			/*
						const links = await metadataCache.getFileCache(activeFile)?.links || [];
						const linkedMentionsArray = links.map(link => `[[${link.link} ${link.original}-${link.displayText}-${link.position}`);
						console.log("links", { links });
			
						const links = await metadataCache.getFileCache(activeFile)?.links || [];
						const linkedMentionsArray = links.map(link => `[[${link.link} ${link.original}-${link.displayText}-${link.position}`);
						console.log("links", { links });
			*/

			const sections = await metadataCache.getFileCache(this.activeFile)?.sections || [];
			console.log("sections", { sections });

			const headings = await metadataCache.getFileCache(this.activeFile)?.headings || [];
			console.log("headings", { headings });

			const resolvedLinksArray = Object.keys(resolvedLinks).map((file_string: string) => {
				const file = app.vault.getAbstractFileByPath(file_string);
				if (file instanceof TFile) {
					const linkText = app.metadataCache.fileToLinktext(file, this.activeFile!.path);
					console.log("linkText", { linkText });
					return `[[${linkText}]]`;
				}
				return '';
			});
			console.log("resolvedLinksArray", { resolvedLinksArray });

			const normalizedPageName = this.activeFile.path;
			const metadataCache1 = app.metadataCache;

			// 1. Ищем все разрешённые ссылки (resolvedLinks)
			const resolvedLinks1 = metadataCache1.resolvedLinks;
			const resolvedBacklinks = Object.keys(resolvedLinks1).filter((file) =>
				Object.keys(resolvedLinks1[file]).includes(normalizedPageName)
			);
			console.log("resolvedBacklinks", { resolvedBacklinks });

			// 2. Ищем все неразрешённые ссылки (unresolvedLinks)
			const unresolvedLinks1 = metadataCache1.unresolvedLinks;
			const unresolvedBacklinks = Object.keys(unresolvedLinks1).filter((file) =>
				Object.keys(unresolvedLinks1[file]).includes(normalizedPageName)
			);
			console.log("unresolvedBacklinks", { unresolvedBacklinks });

			// Объединяем результаты
			const allBacklinks = [...new Set([...resolvedBacklinks, ...unresolvedBacklinks])];
			console.log("allBacklinks", { allBacklinks });

			const headerTitle = "Childrens"; // Change this to the desired header title
			const headerLineNumber = await this.fileLinkHelper.findHeaderLineNumbers(headerTitle, this.activeFile)
			console.log("headerLineNumber", { headerLineNumber })

			if (headerLineNumber == null || headerLineNumber == undefined) {
				const frontmatterEndLine = await metadataCache.getFileCache(this.activeFile)?.frontmatterPosition?.end.line;
				console.log("frontmatterEndLine", { frontmatterEndLine })
				if (frontmatterEndLine !== undefined) {
					editor.replaceRange(`# ${headerTitle}\n\n`, { line: frontmatterEndLine + 1, ch: 0 });
					const content = await app.vault.read(this.activeFile);
					await app.vault.modify(this.activeFile, content);

					await app.metadataCache.getFileCache(this.activeFile);
				}
			}


			const linkedFilesArray = allBacklinks.map(link => {
				const file = app.vault.getAbstractFileByPath(link);
				if (file instanceof TFile) {
					const linkText = app.metadataCache.fileToLinktext(file, this.activeFile!.path);
					console.log("linkText", { linkText });
					return `[[${linkText}]]`;
				}
				return '';
			}).sort();

			console.log("pathLists", { pathLists })
			const pathListsFormatted = pathLists.length > 0 ? pathLists[0].map(item => {
				console.log("item", { item })
				return `[[${item}]]`
			}) : [];
			const linkedFilesArrayString = linkedFilesArray.join(" ♦ ") + "\n\n" + pathListsFormatted.join(" -> ") + "\n\n";
			console.log("linkedFilesArrayString", { linkedFilesArrayString, linkedFilesArray, pathLists });
			//await this.fileLinkHelper.changeHeaderText(headerTitle, headerTitle, linkedFilesArrayString, this.activeFile);

			const linkedFilesArrayString2 = linkedFiles.map(async file => {
				const linkText = app.metadataCache.fileToLinktext(file, this.activeFile!.path);
				console.log("linkText", { linkText });
				return `[[${linkText}]]`;
			})

			await this.fileLinkHelper.changeHeaderText(headerTitle, headerTitle, linkedFilesArrayString2.join(" ♦ "), this.activeFile);

			new Notice('Linked files added to children header.');
		}
	}
}