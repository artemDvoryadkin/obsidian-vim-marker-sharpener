import { App, Command, Notice } from 'obsidian';
import { FileHelper } from './Helpers/FileHelpers';
import { SharpenerCommand } from './Commons/types';

export class RenameFileCommand extends SharpenerCommand {
	id = 'rename-file-command';
	name = 'Rename File Command';
	prefix = 'sfr';
	command: Command;
	exclude_aliases = ["ptm"]

	async execute(app: App): Promise<void> {
		const activeFile = app.workspace.getActiveFile();
		console.log({ activeFile });
		if (!activeFile) {
			new Notice('No active file to rename.');
			return;
		}

		const frontmatter: any = app.metadataCache.getFileCache(activeFile)?.frontmatter || {};

		let fileName: string = frontmatter.file_name || '';
		if (fileName.startsWith('"')) fileName = fileName.slice(1);
		if (fileName.endsWith('"')) fileName = fileName.slice(0, 1);
		fileName = fileName.replace(":", "")

		const fileName_ru = frontmatter.file_name_ru || '';
		const fileSokr = frontmatter.file_sokr || '';

		console.log({ frontmatter, fileName, fileName_ru, fileSokr });

		let newFileName = ""
		if (fileName === '' && fileName_ru.length > 0) {

			newFileName = `${fileSokr ? fileSokr + ', ' : ''}${fileName_ru}` + '.md';
			console.log("ru", newFileName)
		}
		else {
			newFileName = `${fileSokr ? fileSokr + ', ' : ''}${fileName}` + (fileName_ru ? ` (${fileName_ru})` : '') + '.md';
			console.log("ru", newFileName)
		}

		if (newFileName == ".md") {
			return;
		}

		const newFilePath = activeFile.path.replace(/[^/]+$/, newFileName);
		console.log(newFilePath);

		frontmatter.aliases = frontmatter.aliases || [];
		console.log("----", frontmatter.aliases, fileName, frontmatter.aliases.includes(fileName));
		let changeAliases = false
		let file_id = frontmatter.file_id || "";
		if (file_id == "") {
			const fileLinkHelper = new FileHelper(app);
			file_id = (await fileLinkHelper.generateUniqueId()).toString();
		}

		await app.fileManager.processFrontMatter(activeFile, (frontmatter) => {
			if (!frontmatter.aliases) {
				frontmatter.aliases = [];
				changeAliases = true
			} else frontmatter.aliases = frontmatter.aliases.filter((alias: string) => alias !== "");

			if (fileSokr !== "" && !frontmatter.aliases.includes(fileSokr) && !this.exclude_aliases.includes(fileSokr)) {
				frontmatter.aliases.push(fileSokr);
				changeAliases = true
			}
			if (fileSokr !== "" && !frontmatter.aliases.includes(fileName)
				&& !this.exclude_aliases.includes(fileSokr)) {
				frontmatter.aliases.push(fileName);
				if (fileName_ru) frontmatter.aliases.push(fileName_ru);
				changeAliases = true
			}
			if (!frontmatter.file_id) {
				frontmatter["file_id"] = file_id;
				changeAliases = true
			}
			if (fileName && fileName_ru) {
				frontmatter.aliases.push(fileName);
				frontmatter.aliases.push(fileName_ru);
				changeAliases = true
			}

			if (fileSokr && fileName_ru) {
				frontmatter.aliases.push(fileName_ru);
				changeAliases = true
			}

			console.log("frontmatter.aliases", frontmatter.aliases)
			frontmatter.aliases = Array.from(new Set(frontmatter.aliases));
			console.log("frontmatter", frontmatter)

		});
		if (changeAliases) {
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
		console.log("dd1", frontmatter.aliases, frontmatter); // This logs the aliases after processing
		const updatedFrontmatter = app.metadataCache.getFileCache(activeFile)?.frontmatter || {};
		console.log("dd2", updatedFrontmatter.aliases, updatedFrontmatter); // This logs the aliases from the metadata cache


		if (activeFile.name !== newFileName || changeAliases) {
			const existingFile = app.vault.getAbstractFileByPath(newFilePath);
			if (existingFile) {
				new Notice(`Файл с именем "${newFileName}" уже существует и нельзя переименовать.`);
			} else {
				new Notice(`File renamed to: ${newFileName}`);
				await app.fileManager.renameFile(activeFile, newFilePath);
			}
		}
	}
}