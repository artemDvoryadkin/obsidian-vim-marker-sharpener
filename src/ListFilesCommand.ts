import { App, MarkdownView, Notice, TFile, Command } from 'obsidian';
import { SharpenerCommand } from './Commons/types';
import * as path from 'path';

export class ListFilesCommand extends SharpenerCommand {
	id = 'list-files';
	name = 'List Files in Directory';
	prefix = '`fl';
	command: Command;
	async execute(app: App): Promise<void> {
		//const rootDir = path.join(app.vault.adapter.basePath, '00.INBOX/'); // Change this to your target directory relative to the vault's root
		const rootDir = '00.INBOX/'; // Change this to your target directory relative to the vault's root
		const outputMdFile = '00.INBOX/!output.md'; // Change this to your desired output file name

		const files = app.vault.getFiles();
		const mdFileContent: Record<string, string> = {};

		const directories: Record<string, string[]> = {};

		files.forEach(file => {
			const fullPath = file.path;
			console.log("fullPath", { fullPath, file });
			if (fullPath.startsWith(rootDir)) {
				const relativePath = path.relative(rootDir, fullPath);
				const dirName = path.dirname(relativePath);
				if (!directories[dirName]) {
					directories[dirName] = [];
				}
				directories[dirName].push(fullPath);
			}
		});

		for (const dirName of Object.keys(directories)) {
			const mdFiles = directories[dirName].filter(filePath => filePath.endsWith('.md'));
			if (mdFiles.length > 0) {
				mdFileContent[dirName] = `\n# ${dirName}\n`;
				mdFiles.sort((a, b) => {
					const aFile = app.vault.getAbstractFileByPath(a);
					const bFile = app.vault.getAbstractFileByPath(b);
					if (aFile instanceof TFile && bFile instanceof TFile) {
						return (aFile.stat.ctime || 0) - (bFile.stat.ctime || 0);
					}
					return 0;
				});
				mdFiles.forEach((filePath, index) => {
					const file = app.vault.getAbstractFileByPath(filePath);
					if (file instanceof TFile) {
						const creationDate = file.stat.ctime ? Math.floor((Date.now() - file.stat.ctime) / (1000 * 60 * 60 * 24)) : 'Unknown date';
						if (!mdFileContent[creationDate]) {
							mdFileContent[creationDate] = `\n- ${creationDate} day(s) ago\n`;
						}
						mdFileContent[creationDate] += `  - [[${filePath.replace(/\[/g, '\\[').replace(/\]/g, '\\]')}]]\n`;
					}
				});
			}
		}

		const outputContent = Object.entries(mdFileContent)
			.sort(([dateA], [dateB]) => parseInt(dateB) - parseInt(dateA)) // Sort by days from greater to lesser
			.map(([, content]) => content)
			.join('');
		const outputFile = app.vault.getAbstractFileByPath(outputMdFile);
		if (outputFile instanceof TFile) {
			await app.vault.modify(outputFile, outputContent);
		} else {
			await app.vault.create(outputMdFile, outputContent);
		}

		const outputFileInVault = app.vault.getAbstractFileByPath(outputMdFile);
		console.log({ outputFileInVault });
		if (outputFileInVault instanceof TFile) {
			const leaf = app.workspace.getLeaf(true);
			await leaf.openFile(outputFileInVault);
			app.workspace.setActiveLeaf(leaf);
			const activeView = await app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView) {
				const editor = activeView.editor;
				editor.setCursor(0, 0);
				editor.focus();
			}
		}
/*




*/
		new Notice('Files listed successfully!');
	}
} 