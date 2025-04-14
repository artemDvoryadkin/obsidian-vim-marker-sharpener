import { Editor, App } from 'obsidian';

// import { CodeMirror } from 'obsidian';

class Link {
	constructor(public url: string, public alias: string, public type: 'markdown' | 'obsidian', public fileExists: boolean = false) { }

	toString() {
		if (this.type === 'markdown') {
			return `[${this.alias}](${this.url.replace(/ /g, '%20')})`;
		} else if (this.type === 'obsidian') {
			if (this.alias === this.url.replace('.md', '')) {
				return `[[${this.url.replace('.md', '')}]]`;
			}
			return this.alias ? `[[${this.url.replace('.md', '')}|${this.alias}]]` : `[[${this.url.replace('.md', '')}]]`;
		} else {
			// Handle other types or throw an error if necessary
			throw new Error('Unsupported link type');
		}
	}
	toObsidianLink() {
		if (this.alias === this.url.replace('.md', '')) {
			return `[[${this.url.replace('.md', '')}]]`;
		}
		return this.alias ? `[[${this.url.replace('.md', '')}|${this.alias}]]` : `[[${this.url.replace('.md', '')}]]`;
	}
}

export class LinkHelper {
	private app: App;

	private linkPatternMarkdown = /\[([^\]]*?)\]\((.*?\.md)\)/g;
	private linkPatternObsidian = /\[\[([^|]+?)(?:\|([^\]]*?))?\]\]/g;

	constructor(app: App) {
		this.app = app;
	}

	convertMarkdownLinksToObsidianLinks(content: string): string {
		const links = this.extractLinks(content);
		links.forEach(link => {
			content = content.replace(link.toString(), link.toObsidianLink());
		});
		const originalLinks = [...links]; // Store original links for comparison
		const updatedLinks = this.extractLinks(content); // Extract links after conversion

		// Compare original and updated links
		originalLinks.forEach((link, index) => {
			const updatedLink = updatedLinks[index];
			if (updatedLink) {
				if (link.toString() !== updatedLink.toString()) {
					console.log(`Link changed: ${link.toString()} -> ${updatedLink.toString()}`);
				} else {
					console.log(`Link unchanged: ${link.toString()}`);
				}
			} else {
				console.log(`Link removed: ${link.toString()}`);
			}
		});

		// Check for any new links that were added
		updatedLinks.forEach((link) => {
			if (!originalLinks.some(originalLink => originalLink.toString() === link.toString())) {
				console.log(`New link added: ${link.toString()}`);
			}
		});
		return content;
	}
	clearLink(mdLink: string) {
		// перевод из формата []() в [[]]
		mdLink = mdLink.trim()
		mdLink = mdLink.replace(/\[\[([^|\]]+)\|[^|\]]+\]\]/g, '[$1]').trim();

		console.log("pdfFileName", { mdLink });
		const regex = "^[\\[\"']+|[\\]\"']+$"
		mdLink = mdLink.replace(/^[\["']+|[\]"']+$/g, "");

		return mdLink
	}

	findLink(url: string): boolean {

		console.log("findLink", { url });
		let decodedUrl = url;
		try {
			decodedUrl = decodeURIComponent(url);
		} catch (error) {
			console.error("Error decoding URL:", error);
		}

		decodedUrl = decodedUrl.endsWith('.md') ? decodedUrl : `${decodedUrl}.md`;
		const pathFiles = this.app.vault.getMarkdownFiles().filter(file => file.path == decodedUrl);
		if (pathFiles.length == 1) return true;

		const baseFiles = this.app.vault.getMarkdownFiles().filter(file => file.basename == decodedUrl.replace('.md', '') || file.name == decodedUrl);
		if (baseFiles.length >= 1) return true;

		return false;
	}

	extractLinks(content: string): Link[] {
		const links: Link[] = [];

		// Find markdown links
		this.linkPatternMarkdown.lastIndex = 0;
		content.replace(this.linkPatternMarkdown, (match, alias, link) => {
			const decodedLink = decodeURIComponent(link);
			const fileExists = this.findLink(decodedLink);
			links.push(new Link(decodedLink, alias, 'markdown', fileExists));
			return match;
		});

		// Find obsidian links
		this.linkPatternObsidian.lastIndex = 0;
		content.replace(this.linkPatternObsidian, (match, link, alias) => {
			const fileExists = this.findLink(link);
			if (fileExists) {
				links.push(new Link(link, alias, 'obsidian', fileExists));
			}
			return match;
		});

		//	console.log("extractLinks", links);

		return links;
	}
}

export default LinkHelper;