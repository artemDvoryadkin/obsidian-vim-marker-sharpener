import { App, FileSystemAdapter, MarkdownView, TFile, CachedMetadata, HeadingCache } from 'obsidian';
import { SectionCache } from 'obsidian';
import * as path from 'path';
import * as fs from 'fs';

export interface HeadingCacheExt extends HeadingCache {
	lines: string[];
	linesWithMarkdown: string[];
	linesWithMarkdownAndHeaders: string[];
	parentHeading: HeadingCacheExt | null;
}

export class HeadingCacheExt implements HeadingCacheExt {
	constructor(heading: HeadingCache) {
		this.heading = heading.heading;
		this.level = heading.level;
		this.lines = [""]
		this.linesWithMarkdown = [""]
		this.linesWithMarkdownAndHeaders = [""]
		this.parentHeading = null
		this.position = heading.position
		this.selectedText = ""
		this.hasCildrenSelectedText = false
		this.headingSource = heading
		this.positionContentStartLine = 0
		this.positionContentEndLine = 0
		this.sections = []
	}

	heading: string;
	level: number;
	lines: string[];
	linesWithMarkdown: string[];
	linesWithMarkdownAndHeaders: string[];
	parentHeading: HeadingCacheExt | null;
	positionContentStartLine: number
	positionContentEndLine: number
	selectedText: string
	hasCildrenSelectedText: boolean
	sections: SectionCache[]
	headingSource: HeadingCache

	getParentHeadings(): HeadingCacheExt | null {
		return this.parentHeading;
	}

	getHeadingPath(): HeadingCacheExt[] {
		// Implement logic to get the path from the parent heading to the root
		const path: HeadingCacheExt[] = [];
		let currentHeading: HeadingCacheExt | null = this.parentHeading as HeadingCacheExt;

		while (currentHeading) {
			currentHeading.getParentHeadings()
			path.push(currentHeading);
			currentHeading = currentHeading.parentHeading as HeadingCacheExt;
		}

		return path.reverse(); // Reverse to get the path from root to parent heading
	}
}

export class FileHelper {
	private app: App;

	constructor(app: App) {
		this.app = app;
	}

	getActiveTFile(): TFile | null {
		return this.app.workspace.getActiveFile();
	}
	getActiveView(): MarkdownView | null {
		return this.app.workspace.getActiveViewOfType(MarkdownView);
	}

	getHeadings(file: TFile): HeadingCacheExt[] {
		return this.getHeadingsExt(file);
	}
	isPdfFileActive(): boolean {
		const activeFile = this.getActiveTFile();
		return activeFile?.extension === "pdf";
	}
	isMdFileActive(): boolean {
		const activeFile = this.getActiveTFile();
		return activeFile?.extension === "md";
	}

	getAbsolutPathActiveFile(): string {
		const activeFile = this.getActiveTFile();
		if (!activeFile) {
			return "";
		}
		return this.getFsAbosoluteVlueDir() + "/" + activeFile.path;
	}

	getAllFileHasFrontmatterAttributeAndValue(attribute: string, value: string): TFile[] {
		const files = this.app.vault.getMarkdownFiles();
		const filesWithFrontmatter = files.filter(file => {
			const frontmatter = this.getFrontmatter(file);
			if (frontmatter[attribute]) {
				return frontmatter[attribute].includes(value);
			}
			return false;
		});

		return filesWithFrontmatter;
	}

	getFsAbosoluteVlueDir(): string {
		const adapter = this.app.vault.adapter;
		let absoluteVaultDir = "";
		if (adapter instanceof FileSystemAdapter) {
			absoluteVaultDir = adapter.getBasePath();
		}
		return absoluteVaultDir;
	}

	async generateUniqueId(): Promise<string> {
		const currentDate = new Date();
		const sha256 = (data: string) => {
			const buffer = new TextEncoder().encode(data);
			return crypto.subtle.digest('SHA-256', buffer).then(hash => {
				const hashArray = Array.from(new Uint8Array(hash));
				const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
				return !isNaN(parseInt(hashHex.charAt(0), 16)) ? 'a' + hashHex.substring(1, 5) : hashHex.substring(0, 5); // Get first 5 characters, replace first if it's a digit
			});
		};

		const checkIdUniqueness = async (id: string): Promise<boolean> => {
			const files = this.app.vault.getFiles();
			for (const file of files) {
				const frontmatter = this.getFrontmatter(file);
				if (frontmatter.file_id === id) {
					return true; // ID already exists
				}
			}
			return false; // ID is unique
		};

		const generateId = async (): Promise<string> => {
			const id = await sha256(currentDate.toISOString());
			const isUnique = await checkIdUniqueness(id);
			return isUnique ? await generateId() : id; // Corrected typo here
		};

		return await generateId();
	}


	removeBracketsAndText(input: string): string {

		const regex1 = /\[([^\]]+)\]\(.*?\)/; // Регулярное выражение для поиска шаблона []()
		const match1 = input.match(regex1);
		if (match1) {
			return match1[1].trim(); // Возвращаем текст в [] если шаблон найден
		}

		// Удаляем символы [ в начале и ] в конце строки, если они есть
		while (input.startsWith('[') && input.endsWith(']')) {
			input = input.slice(1, -1);
		}
		// Находим последний символ | и удаляем текст до конца, включая его
		const lastPipeIndex = input.lastIndexOf('|');
		if (lastPipeIndex !== -1) {
			input = input.slice(0, lastPipeIndex);
		}
		const regex = /\[([^\]]+)\]\(.*?\)/; // Регулярное выражение для поиска шаблона []()
		const match = input.match(regex);
		if (match) {
			return match[1].trim(); // Возвращаем текст в [] если шаблон найден
		}
		return input.trim(); // Удаляем лишние пробелы
	}

	getFrontmatter(file: TFile): any {
		return this.app.metadataCache.getFileCache(file)?.frontmatter || {};
	}

	getLinkedMentions(file: TFile): string[] {
		const metadataCache = this.app.metadataCache;
		const fileCache = metadataCache.getFileCache(file);

		if (!fileCache || !fileCache.links) {
			return [];
		}

		const linkedMentions = fileCache.links.map(link => `[[${link.link}]]`);
		return linkedMentions;
	}

	getLinkedMentions2(file: TFile): string[] {
		const metadataCache = this.app.metadataCache;
		//const fileCache = metadataCache.resolvedLinks[file.path];
		const fileCache = metadataCache.unresolvedLinks[file.path];

		if (!fileCache) {
			return [];
		}

		const linkedMentions = Object.keys(fileCache).map(link => `[[${link}]]`);
		return linkedMentions;
	}

	async findHeaderLineNumbers(headerTitle: string, file: TFile): Promise<{ start: number; end: number } | null> {
		// todo: удалить работу со строками это для отладки нужно было
		const lines = (await this.app.vault.cachedRead(file)).split('\n');

		const cache = this.app.metadataCache.getFileCache(file);
		const headings = cache?.headings || [];
		const clearHEaderTitle = headerTitle.replace(/^#{1,6}\s*/, '').trim();

		const cachedLines = cache?.sections ?? [];

		if (headings.some(heading => heading.heading === clearHEaderTitle)) {

			const headerIndex = headings.findIndex(heading => heading.heading === clearHEaderTitle);
			const currentHeader = headings[headerIndex];
			const startLine = currentHeader?.position.start.line || -1;

			const nextHeader = headings[headerIndex + 1];
			let endLine = -1;
			if (nextHeader) {
				endLine = nextHeader?.position.start.line - 1;
			} else {
				endLine = lines.length - 1
			}

			const result = { start: startLine, end: endLine }

			return result;
		}
		return null; // Return null if the header is not found
	}

	async insertLine(file: TFile, line: number, text: string): Promise<void> {
		let lines = (await this.app.vault.read(file)).split('\n');
		lines = [...lines.slice(0, line), text, ...lines.slice(line)];

		await this.app.vault.modify(file, lines.join('\n'));
	}

	async insertSectionLine(file: TFile, startLine: number, endLine: number, text: string): Promise<void> {
		let lines = (await this.app.vault.read(file)).split('\n');
		lines = [...lines.slice(0, startLine), text, ...lines.slice(endLine, lines.length - 1)];
		await this.app.vault.modify(file, lines.join('\n'));
	}
	getLastOffset(file: TFile): number {
		const sections = this.app.metadataCache.getFileCache(file)?.sections;
		const section = sections ? sections[sections.length - 1] : null;
		return section ? section.position.end.offset : -1;
	}

	async changeInsideHeaderText(headerTitle: string, newText: string, file: TFile): Promise<void> {
		await this.app.vault.read(file);

		const lastOffset = this.getLastOffset(file);

		const headerLineNumbers = await this.findHeaderLineNumbers(headerTitle, file);

		if (!headerLineNumbers) {
			return;
		}

		const start = headerLineNumbers.start;
		const end = headerLineNumbers.end;


		await this.app.vault.read(file);
		const endLastOffset = this.getLastOffset(file);
		if (lastOffset === endLastOffset) {
			await this.insertSectionLine(file, start + 1, end, newText);
		} else {
			await this.changeInsideHeaderText(headerTitle, newText, file);
		}
	}

	async changeHeaderText(oldHeaderTitle: string, newHeaderTitle: string, newText: string, file: TFile): Promise<void> {
		await this.app.vault.read(file);

		const headerLineNumbers = await this.findHeaderLineNumbers(oldHeaderTitle, file);

		if (!headerLineNumbers) {
			const sections = this.app.metadataCache.getFileCache(file)?.sections;
			const maxLine = sections ? Math.max(...sections.map(section => section.position.end.line)) : -1;
			if (maxLine !== -1) {
				await this.insertLine(file, maxLine, `${newHeaderTitle}`);
			}

			await this.changeInsideHeaderText(oldHeaderTitle, newHeaderTitle, file);
			return;

		}

		if (headerLineNumbers) {
			const start = headerLineNumbers.start;
			const end = headerLineNumbers.end;

			await this.insertSectionLine(file, start + 1, end, newText);

			const metadataCache = this.app.metadataCache;
			const headings = metadataCache.getFileCache(file)?.headings || [];
			headings.forEach(heading => {
				if (heading.heading === oldHeaderTitle) {
					heading.heading = newHeaderTitle; // Change the header text
				}
			});

			this.app.metadataCache.getFileCache(file); // Update the cache after saving
		}
	}

	async getPathListsToRoot(file: TFile, currentPath: string[] = []): Promise<string[][]> {
		const frontmatter = this.getFrontmatter(file);
		const entityParentEntity = frontmatter["entity_ParentItem"];
		if (!entityParentEntity) {
			return []; // Return an empty array instead of currentPath
		}

		const parentEntities = Array.isArray(entityParentEntity) ? entityParentEntity : [entityParentEntity];
		const paths: string[][] = [];
		for (const parent of parentEntities) {
			const cleanedParent = this.removeBracketsAndText(parent);
			const parentFiles = this.app.vault.getMarkdownFiles();

			const parentFile = parentFiles.find(file => file.basename === cleanedParent && file.extension === "md");

			if (parentFile instanceof TFile) {
				if (cleanedParent === file.basename) {
					// Reached the root where the file references itself
					paths.push([...currentPath]);
					break;
				} else {
					// Check if the parent file is a root entity, if so, exit
					// Recursively find paths for the parent file
					const parentPaths = await this.getPathListsToRoot(parentFile, [...currentPath, cleanedParent]);
					if (parentPaths.length > 0) {
						paths.push(...parentPaths);
					}
				}
			}
		}
		return paths;
	}

	async processFrontMatter(file: TFile, callback: (frontmatter: any) => void): Promise<void> {
		if (!(file instanceof TFile)) {
			console.error('Provided file is not a TFile.');
			return;
		}

		const frontmatter = this.getFrontmatter(file);
		callback(frontmatter);

		// Assuming you have a method to update the file with new frontmatter
		const content = await this.app.vault.read(file);
		const updatedContent = this.updateFrontmatter(content, frontmatter);
		await this.app.vault.modify(file, updatedContent);
	}

	private updateFrontmatter(content: string, frontmatter: any): string {
		// Logic to update the frontmatter in the file content
		// This is a placeholder and should be replaced with actual logic
		return content; // Modify this to return the updated content
	}

	getHeadingsExt(file: TFile): HeadingCacheExt[] {
		const fileCachedMetadata = this.app.metadataCache.getFileCache(file)
		if (!fileCachedMetadata) return []

		const headings = fileCachedMetadata?.headings || [];
		const content = this.getContentFromFile(file)

		const headingsExt = headings.map(heading => {
			const lines = this.getLinesForHeading(file, heading);
			const headingExt = new HeadingCacheExt(heading);
			headingExt.lines = lines;
			headingExt.linesWithMarkdown = lines.map(line => this.addMarkdown(line));
			headingExt.linesWithMarkdownAndHeaders = lines.map(line => this.addMarkdownAndHeaders(line));
			headingExt.headingSource = heading

			return headingExt;
		});

		headingsExt.forEach((headingExt, index) => {
			const parentHeading = this.getParentHeading(headingExt, headingsExt);
			headingExt.parentHeading = parentHeading;
			headingExt.positionContentStartLine = headingExt.position.start.line + 1


			// Determine the end line for each heading
			if (index < headingsExt.length - 1) {
				headingExt.positionContentEndLine = headingsExt[index + 1].position.start.line - 1;
			} else {
				this.app.metadataCache.getFileCache
				headingExt.positionContentEndLine = this.getLastLineOfFile(file)
			}
			headingExt.sections = this.getSectionsBetweenHeadings(fileCachedMetadata, headingExt)
		});

		return headingsExt;
	}

	getContentFromFile(file: TFile): string {
		let content = ""
		const result = this.app.vault.cachedRead(file).then(fileContent => {
			content = fileContent
		}).catch(error => {
			console.error("Error reading file:", error);
		});
		if (file.path === "test-.md") {
			content = fs.readFileSync(path.join("/Users/artemdvoryadkin/Projects/obsidian-sharpener/src/Helpers/__tests__/", 'testData.md'), 'utf8');
		}
		return content
	}

	getContentBySection(file: TFile, section: SectionCache): string {

		const content = this.getContentFromFile(file)

		return this.getContentBySectionAndContent(content, section)
	}

	getContentBySectionAndContent(fileContent: string, section: SectionCache): string {
		const contentSection = fileContent.slice(section.position.start.offset, section.position.end.offset)
		return contentSection
	}


	private getSectionsBetweenHeadings(fileCachedMetadata: CachedMetadata, headingExt: HeadingCacheExt): SectionCache[] {
		if (!fileCachedMetadata) return []

		const sections = fileCachedMetadata?.sections || [];

		const nextHeading = this.getNextHeading(fileCachedMetadata, headingExt)

		const sectionsBetweenHeadings = sections.filter(section =>
			section.position.start.line > headingExt.position.start.line && (nextHeading ? section.position.end.line < nextHeading?.position.start.line : true))

		return sectionsBetweenHeadings
	}


	private getNextHeading(fileCachedMetadata: CachedMetadata, headingExt: HeadingCacheExt): HeadingCache | null {
		const headings = fileCachedMetadata.headings || [];

		let finded = false
		const findedHeading = headings.find(heading => {
			if (finded) {
				return heading
			}

			if (heading.position.start.line == headingExt.position.start.line) {
				finded = true
			}
		})

		return findedHeading || null;
	}

	private getLastLineOfFile(file: TFile): number {
		let lastLine = -1;

		this.app.vault.cachedRead(file).then(fileContent => {
			lastLine = fileContent.split('\n').length - 1;
		}).catch(error => {
			console.error("Error reading file:", error);
		});

		return lastLine
	}
	private getLinesForHeading(file: TFile, heading: HeadingCache): string[] {
		// Implement logic to extract lines for the given heading
		return [];
	}

	private addMarkdown(line: string): string {
		// Implement logic to add markdown to a line
		return line;
	}

	private addMarkdownAndHeaders(line: string): string {
		// Implement logic to add markdown and headers to a line
		return line;
	}

	private getParentHeading(heading: HeadingCacheExt, allHeadings: HeadingCacheExt[]): HeadingCacheExt | null {
		// Iterate backwards through the list of headings to find the first heading with a lower level
		for (let i = allHeadings.indexOf(heading) - 1; i >= 0; i--) {
			if (allHeadings[i].level < heading.level) {
				return allHeadings[i]; // Return the first heading with a lower level
			}
		}
		return null; // Return null if no parent heading is found
	}
}