import { App, MarkdownView, Notice, Command } from 'obsidian';
import { SharpenerCommand } from './Commons/types';

export class ExtractSectionCommand extends SharpenerCommand {
	id = 'extract-section-command';
	name = 'Extract Section';
	prefix = 'estf';
	command: Command;

	async execute(app: App): Promise<void> {
		const activeFile = app.workspace.getActiveFile();
		if (!activeFile) {
			new Notice('No active file found.');
			return;
		}

		const editor = app.workspace.getActiveViewOfType(MarkdownView)?.editor;
		if (!editor) {
			new Notice('No active editor found.');
			return;
		}

		const cursorPos = editor.getCursor();
		const content = editor.getValue();
		const lines = content.split('\n');

		// Find the current header
		let currentHeaderLine = -1;
		for (let i = cursorPos.line; i >= 0; i--) {
			if (lines[i].startsWith('#')) {
				currentHeaderLine = i;
				break;
			}
		}

		if (currentHeaderLine === -1) {
			new Notice('No header found above the cursor.');
			return;
		}

		const currentHeader = lines[currentHeaderLine];

		// Find the next header
		let nextHeaderLine = lines.length;
		for (let i = cursorPos.line + 1; i < lines.length; i++) {
			if (lines[i].startsWith('#')) {
				const currentHeaderMatch = currentHeader.match(/^#+/);
				const lineMatch = lines[i].match(/^#+/);
				if (currentHeaderMatch && lineMatch && lineMatch[0].length <= currentHeaderMatch[0].length) {
					nextHeaderLine = i;
					break;
				}
			}
		}

		// Initialize min and max page numbers
		let minPageId = Infinity;
		let maxPageId = -Infinity;

		// Iterate through lines between current and next header
		for (let i = currentHeaderLine + 1; i < nextHeaderLine; i++) {
			const match = lines[i].match(/\{(\d+)\}-----/);
			if (match) {
				const pageId = parseInt(match[1]);
				if (pageId < minPageId) minPageId = pageId;
				if (pageId > maxPageId) maxPageId = pageId;
			}
		}

		// Check if min and max were updated
		if (minPageId === Infinity || maxPageId === -Infinity) {
			new Notice('No page numbers found between headers.');
			return;
		}

		// Log or use the min and max page numbers
		console.log('Min Page ID:', minPageId);
		console.log('Max Page ID:', maxPageId);

		// Find the pattern {8}----- above the current header
		let pageId = 0; // Initialize as an integer
		for (let i = currentHeaderLine - 1; i >= 0; i--) {
			const match = lines[i].match(/^\{(\d+)\}-----/);
			if (match) {
				pageId = parseInt(match[1]) + 1; // Convert to integer and increase by one
				break;
			}
		}

		//currentHeaderLine = currentHeaderLine + 1 // что бы не забирать заголовок

		if (!pageId) {
			new Notice('No page ID pattern found above the header.');
			return;
		}

		// Adjust the start of extraction
		let startLine = currentHeaderLine;
		for (let i = currentHeaderLine - 1; i >= 0; i--) {
			if (lines[i].trim() === '') continue;
			if (lines[i].match(/^\{\d+\}-----/)) {
				startLine = i;
			}
			break;
		}

		// Adjust the end of extraction
		let endLine = nextHeaderLine;
		for (let i = nextHeaderLine - 1; i > currentHeaderLine; i--) {
			if (lines[i].trim() === '') continue;
			if (lines[i].match(/^\{\d+\}-----/)) {
				endLine = i;
			}
			break;
		}
		const newLines = lines.slice(startLine, endLine);

		// Extract content between adjusted start and end lines

		// Extract content between headers
		// коментарим не нужно делать ссылки на документ
		/*
		let newLines = lines.slice(startLine, endLine);
				newLines = newLines.map((line, index) => {
					// Replace lines that match the pattern {n}------ with the new format
					const match = line.match(/^\{(\d+)\}------/);
					if (match) {
						const pageId = match[1]; // Извлекаем pageId из совпадения регулярного выражения
						// Заменяем строку на новый формат
						return `[[${activeFile.basename}.pdfaa#page=${parseInt(pageId) + 1}|${parseInt(pageId) + 1}]] -------------------------------------------------------------------`;
					}
					return line; // Keep the line if it doesn't match
				});
		*/

		while (newLines.length > 0 && newLines[newLines.length - 1].trim() === '') {
			newLines.pop(); // Remove empty lines from the end
		}
		newLines.push(''); // Add  ыone empty line at the end

		const sectionContent = "# Content\n----\n" + newLines.join('\n');
		// Create a new file without markdown formatting
		const newFileName = currentHeader
			.replace(/^#+\s*/, '')
			.replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
			.replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold formatting
			.replace(/\*(.*?)\*/g, "$1") // Remove italic formatting
			.replace(/__(.*?)__/g, "$1") // Remove bold formatting (alternative)
			.replace(/_(.*?)_/g, "$1") // Remove italic formatting (alternative)
			.replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename characters
			+ '.md';
		const newFolderPath = activeFile.parent?.path + '/Chapters';
		const chaptersDirectory = app.vault.getFolderByPath(newFolderPath);
		if (!chaptersDirectory) {
			await app.vault.createFolder(newFolderPath);
		}
		const newFilePath = activeFile.parent?.path + `/Chapters/${newFileName}`;
		console.log("newFilePath", { newFolderPath, chaptersDirectory, newFilePath })
		const newTFile = await app.vault.create(newFilePath, sectionContent);

		// Comment out the original content
		const commentedContent = lines.slice(0, startLine).concat(
			//newLines.map(line => `<!-- ${line} -->`),
			currentHeader,
			"\n",
			lines.slice(endLine)
		).join('\n');

		await app.vault.modify(activeFile, commentedContent);
		const newLeaf = app.workspace.getLeaf('split', 'vertical');
		await newLeaf.openFile(newTFile);
		app.workspace.setActiveLeaf(newLeaf, { focus: true });

		setTimeout(async () => {
			await app.fileManager.processFrontMatter(newTFile, (frontmatter) => {
				frontmatter.pdftomd_source = `"[[${activeFile.basename}.pdf]]"`
				frontmatter.pdftomd_pageStart = minPageId;
				frontmatter.pdftomd_pageEnd = maxPageId;
			});
		}, 3000);
		new Notice(`Section extracted to ${newTFile.path}`);
	}
} 