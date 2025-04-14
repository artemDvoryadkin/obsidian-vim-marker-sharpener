import { App, Command, Notice, Plugin } from 'obsidian';
import { SharpenerCommand } from '../../Commons/types';
import { TFile } from 'obsidian';
import { ScriptExecutor } from '../../Helpers/ScriptExecutor';
import { FileHelper } from '../../Helpers/FileHelpers';
import EditorHelper from '../../Helpers/EditorHelper';
import fs from 'fs';

export class PdfToMdConvertCommand extends SharpenerCommand {
	id = 'sharpener_pdf-to-md-convert';
	name = 'PdfToMd Convert';
	prefix = '';

	fileLinkHelper: FileHelper;
	fileHelper: FileHelper;
	editorHelper: EditorHelper;
	name_etalon = 'PdfToMd';
	command: Command;
	scriptExecutor: ScriptExecutor | null;
	lastRunTime: number = Date.now();
	pdfToMdFileNAme = '';
	isRunning = false;

	sourceFile_pdf: TFile | null = null;
	pdfToMdFileTFile: TFile | null = null;
	convertationConsoleFile: TFile | null = null;
	worklogHeader = '# Worklog';

	frontmatter_pdftomd_source = "pdftomd_source";
	frontmatter_pdftomd_version = "pdftomd_version";
	frontmatter_pdftomd_version_value = this.getMyPlugin().settings.marker_version;
	frontmatter_pdftomd_meta = "pdftomd_meta";
	frontmatter_pdftomd_console = "pdftomd_console";
	frontmatter_pdftomd_fileId = "pdftomd_fileId";
	frontmatter_pdftomd_start = "pdftomd_start";
	frontmatter_pdftomd_end = "pdftomd_end";

	app: App;

	constructor(plugin: Plugin) {
		super(plugin);
		this.app = plugin.app;
		this.scriptExecutor = null;

		this.fileLinkHelper = new FileHelper(plugin.app);
		this.fileHelper = new FileHelper(plugin.app);
		this.editorHelper = new EditorHelper(plugin.app);
		this.lastRunTime = Date.now();
	}

	check(app: App, checking: boolean): boolean {

		const activeFile: TFile | null = this.fileHelper.getActiveTFile();

		if (checking) {
			if (this.isRunning) {
				if (activeFile && activeFile.path == this.convertationConsoleFile?.path)
					return false;

				this.command.name = this.getMyPlugin().pluginName + '.PdfToMd: Open worklog: ' + this.convertationConsoleFile?.name;
				return true;
			}
			if (this.fileHelper.isPdfFileActive() && activeFile) {
				this.command.name = this.getMyPlugin().pluginName + '.PdfToMd: Convert: ' + activeFile?.name;
				return true;
			}

			return false;
		}

		const chechResult = this.check(app, true);
		if (chechResult) {
			this.execute(app);
		}
		return chechResult;
	}

	public stopExecution(): void {
		if (this.scriptExecutor) {
			this.scriptExecutor.stopExecution();
			this.scriptExecutor = null; // Clear the reference after stopping
			this.isRunning = false;
			new Notice('Script execution has been stopped.');
		} else {
			new Notice('No script is currently running.');
		}
	}

	fileExists(absolutePath: string): boolean {
		return fs.existsSync(absolutePath);
	}

	checkRunningStatus(): boolean {
		return this.isRunning;
	}

	cancelExecution(): void {
		this.stopExecution();
	}

	async execute(app: App): Promise<void> {

		if (this.isRunning) {
			// если запущен то переводим фокус на консольный файл
			if (this.convertationConsoleFile) {
				const leaf = this.editorHelper.getLeafByTFile(this.convertationConsoleFile)
					?? await this.editorHelper.splitLiafVertical(this.convertationConsoleFile.path);

				if (leaf) app.workspace.setActiveLeaf(leaf, { focus: true });
				return;
			}
		}


		const activeFile: TFile | null = this.fileHelper.getActiveTFile();
		if (!activeFile) {
			console.error('No active file found.');
			new Notice('No active file found.');
			return;
		}

		if (this.fileHelper.isPdfFileActive()) {
			this.sourceFile_pdf = activeFile;
		}

		console.log("bp activeFile", activeFile);

		// описать процессе работы плагина
		// [x] проверка в каком статусе работаем, отмена работы, если работаем
		// создание файла логов
		// проверка окружения
		// запуск спритов окружение
		// запуск конвертации
		// отработка измениния файла конвертации
		// завершение работы и итоги в файл логов


		const fsAbsoluteVaultDir = this.fileLinkHelper.getFsAbosoluteVlueDir();
		if (!fsAbsoluteVaultDir) {
			console.error("Невозможно получить путь: адаптер не является FileSystemAdapter");
			return
		}
		// [ ] TODO: не совсем понятно логика работы возможно не нужно тут выкл≈ать
		if (this.scriptExecutor) {
			this.stopExecution();
			return
		}

		const outputDirBase = this.getPluginSettings().outputDirForPdfToMd;


		const fsMarkerPdfDir = this.getMyPlugin().settings.markerSinglePath;
		const fsPythonActivate = `${fsMarkerPdfDir}/bin/activate`;
		const fsMarkerSingle = `${fsMarkerPdfDir}/bin/marker_single`;

		if (!this.fileExists(fsPythonActivate)) {
			new Notice('The environment is not set up.');
			return;
		}

		if (!this.fileExists(fsMarkerSingle)) {
			new Notice('The environment is not set up.');
			return;
		}


		const fsActiveFilePath = this.fileHelper.getAbsolutPathActiveFile();
		const pdfToMdFilePath = outputDirBase + "/" + activeFile.basename + '/' + activeFile.name.replace(/\.pdf$/, '.md')
		this.pdfToMdFileNAme = pdfToMdFilePath;
		const fsOutputDir = fsAbsoluteVaultDir + "/" + outputDirBase; // Use normalizePath to construct the path
		const outputDirObsidian = outputDirBase + "/" + activeFile.basename

		console.log("Абсолютный путь к хранилищу:", fsAbsoluteVaultDir);

		await this.createConsoleFile(activeFile, pdfToMdFilePath, outputDirBase);

		//const runLine = `${fsMarkerSingle} "${fsActiveFilePath}" --output_format=markdown --paginate_output --output_dir="${fsOutputDir}" `

		// запускаем с очисткой OCR
		const runLine = `${fsMarkerSingle} "${fsActiveFilePath}" --output_format=markdown --paginate_output --output_dir="${fsOutputDir}" --force_ocr   --PdfProvider_force_ocr --languages en,ru`

		const scriptPaths = [
			//'python3 -V',
			`${fsPythonActivate}`, // Activate the environment first
			`${runLine}`, // Execute the command with arguments
		];

		// Execute the scripts and capture the console output
		try {

			this.lastRunTime = Date.now();
			this.scriptExecutor = new ScriptExecutor(app, scriptPaths);
			this.isRunning = true;


			let fileId = await this.fileHelper.generateUniqueId();
			this.pdfToMdFileTFile = app.vault.getAbstractFileByPath(pdfToMdFilePath) as TFile;
			if (!this.pdfToMdFileTFile) {
				await this.scriptExecutor.executeScripts(
					async (logEntries: string[]) => {
						await this.handleLogEntries(logEntries, false);
					}
					, { console: true, notice: false }
					, async () => {
						await this.finishedScriptRun(pdfToMdFilePath, fileId);
					});
			}

			console.log("finish-----");

			await this.finishedScriptRun(pdfToMdFilePath, fileId);

			this.pdfToMdFileTFile = app.vault.getAbstractFileByPath(pdfToMdFilePath) as TFile;
			if (this.pdfToMdFileTFile) {
				const fileIdFromfile = this.app.metadataCache.getCache(this.pdfToMdFileTFile.path)?.frontmatter?.[this.frontmatter_pdftomd_fileId];

				console.log("fileId", { fileId, fileIdFromfile });
				if (fileIdFromfile) {
					fileId = fileIdFromfile;
				}

				if (fileId) {
					await this.renameFilesForPrefixFileId(this.app, this.pdfToMdFileTFile.parent?.path || '', fileId);
				}
			}

			this.editorHelper.splitLiafVertical(pdfToMdFilePath);

		} catch (error) {
			console.error('Error executing scripts:', error);
			new Notice('Error executing scripts.');
			return;
		}
	}

	async createConsoleFile(pdfFile: TFile, pdfToMdFile: string, outputDirBase: string) {
		// Use the ScriptExecutor to execute scripts
		const consoleOutputFileName = `PdfToMd worklog -> ${pdfFile.name}.md`;
		const consoleOutputFilePath = `${outputDirBase}/${consoleOutputFileName}`;

		try {
			this.convertationConsoleFile = this.app.vault.getAbstractFileByPath(consoleOutputFilePath) as TFile;
			if (!this.convertationConsoleFile) {
				const templateFile = `
# PdfToMd
	
hello,my friend. i happy to see you to try to convert pdf to md.
![вся информация о плагине](https://github.com/artemdvoryadkin/obsidian-sharpener/blob/main/docs/images/obsidian-sharpener-plugin-info.png?raw=true)
	
> [!info]+ Settings
> [[${pdfToMdFile}]]
	
	
# Worklog

	
	
	`;
				this.convertationConsoleFile = await this.app.vault.create(consoleOutputFilePath, templateFile);

				await this.app.fileManager.processFrontMatter(this.convertationConsoleFile, (frontmatter) => {
					frontmatter[this.frontmatter_pdftomd_source] = `[[${pdfFile.path}]]`;
					frontmatter[this.frontmatter_pdftomd_version] = this.frontmatter_pdftomd_version_value;
					frontmatter[this.frontmatter_pdftomd_start] = new Date().toISOString();
					frontmatter[this.frontmatter_pdftomd_end] = null;
				});
			}

			const leaf = this.editorHelper.getLeafByFilePath(this.convertationConsoleFile.path) ||
				await this.editorHelper.splitLiafVertical(this.convertationConsoleFile.path);

			if (leaf) this.app.workspace.setActiveLeaf(leaf, { focus: true });

		} catch (error) {
			console.error('Error creating markdown file:', error);
			new Notice('Error creating markdown file.');
			return;
		}
	}

	async finishedScriptRun(newMdFile: string, fileId: string) {
		console.log("finishedScriptRun", { newMdFile });

		if (this.scriptExecutor) {
			await this.handleLogEntries(this.scriptExecutor.logEntries, true)
		}

		this.stopExecution()

		if (this.convertationConsoleFile) {
			await this.plugin.app.fileManager.processFrontMatter(this.convertationConsoleFile, frontmatter => {
				frontmatter[this.frontmatter_pdftomd_end] = new Date().toISOString();
			});
		}

		this.pdfToMdFileTFile = this.app.vault.getAbstractFileByPath(newMdFile) as TFile;
		if (!this.pdfToMdFileTFile) {
			console.error('Error: File is not a TFile or does not exist.');
			return;
		}

		const fileMd_frontmetter = this.fileHelper.getFrontmatter(this.pdfToMdFileTFile);
		console.log("fileId", fileId, fileMd_frontmetter);
		if (!fileId) fileId = await this.fileHelper.generateUniqueId();

		// Use app.fileManager.processFrontMatter to modify the frontmatter
		await this.app.fileManager.processFrontMatter(this.pdfToMdFileTFile, frontmatter => {
			console.log("this.pdfToMdFileTFile", this.pdfToMdFileTFile);
			frontmatter[this.frontmatter_pdftomd_source] = `[[${this.sourceFile_pdf?.path}]]`;
			frontmatter[this.frontmatter_pdftomd_version] = this.frontmatter_pdftomd_version_value;
			frontmatter[this.frontmatter_pdftomd_meta] = `[[${this.getPluginSettings().outputDirForPdfToMd}/${this.pdfToMdFileTFile!.basename}_meta.json]]`;

			if (this.convertationConsoleFile) {
				const link = this.app.fileManager
					.generateMarkdownLink(
						this.convertationConsoleFile
						, this.convertationConsoleFile.parent?.path || '');
				frontmatter[this.frontmatter_pdftomd_console] = link;
			}


			frontmatter[this.frontmatter_pdftomd_fileId] = fileId;
			frontmatter[this.frontmatter_pdftomd_fileId] = fileId;
		});

	}

	// Function to handle log entries and save them to a file
	async handleLogEntries(logEntries: string[], force = false) {
		console.log("handleLogEntries");
		/*
		const currentTime = Date.now();
		this.lastRunTime = this.lastRunTime ?? currentTime;
		console.log("handleLogEntries", { currentTime, lastRunTime: this.lastRunTime, force }, logEntries);

		if (this.lastRunTime === undefined) {
			console.error('Error: lastRunTime is undefined.');
			return;
		}

		if (this.lastRunTime && (currentTime - this.lastRunTime < 200) && !force) {
			console.log('Skipping log entry processing as less than 5 seconds have passed since the last run.');
			return; // Skip processing if less than 5 seconds have passed
		}

		this.lastRunTime = currentTime; // Update the last run time
*/
		const output = logEntries.map(line => line.trim().replace(/[\r\n]+/g, '')).reduce((acc, line) => acc + "\n" + line, "").trim();

		if (this.convertationConsoleFile) {
			await this.fileHelper.changeInsideHeaderText(this.worklogHeader, output, this.convertationConsoleFile);
		} else {
			console.error('Error: Log file is not a TFile or does not exist.');
		}
	}

	async renameFilesForPrefixFileId(app: App, outputDir: string, fileId: string) {
		const files = app.vault.getFiles()
			.filter(file => {
				return file.extension != "md" && file.parent?.path == outputDir && file.name.startsWith("_page_");
			});


		const f = files.map(async file => {
			const pdfToMdObsidianDir = file.parent?.path;

			const availablePath = await app.fileManager.getAvailablePathForAttachment(file.name, pdfToMdObsidianDir);
			const renamePath = availablePath.replace(`_page_`, fileId + "__page_");
			const newPath = `${pdfToMdObsidianDir}/${renamePath}`;

			const lastSlashIndex = newPath.lastIndexOf('/');
			const directoryPath = lastSlashIndex !== -1 ? newPath.substring(0, lastSlashIndex) : newPath;

			if (!(await app.vault.adapter.exists(directoryPath))) {
				await app.vault.adapter.mkdir(directoryPath);
			}
			console.log("file", { file, outputDir, availablePath, newPath });
			await app.fileManager.renameFile(file as TFile, newPath);
			sleep(3000);
		})
		await Promise.all(f);
	}
}