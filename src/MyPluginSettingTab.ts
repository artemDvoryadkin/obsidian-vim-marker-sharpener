import { PluginSettingTab, App, Setting, TFolder, SuggestModal, FuzzySuggestModal, Notice } from 'obsidian';
import MyPlugin from './main';

// Интерфейс настроек
export interface MyPluginSettings {
	textOption: string;
	numberOption: number;
	folderOption: string;
	outputDirForPdfToMd: string;
	markerSinglePath: string;
	marker_version: string;
}

// Значения по умолчанию
export const DEFAULT_SETTINGS: MyPluginSettings = {
	textOption: "Default Text",
	numberOption: 10,
	folderOption: "/",
	outputDirForPdfToMd: "PdfToMd",
	markerSinglePath: "",
	marker_version: "0.0.0",
};

// Вкладка настроек
export class MyPluginSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;
		containerEl.empty();

		// Текстовое поле
		new Setting(containerEl)
			.setName("Директория для сохрания MD файлов")
			.setDesc("Введите директорию для сохрания MD файлов<br>По умолчанию: PdfToMd")
			.then(setting => {
				setting.descEl.style.display = "block"; // Описание на отдельной строке
				setting.descEl.style.marginBottom = "4px"; // Отступ перед полем ввода
				setting.addText(text => text
					.setPlaceholder("Введите что-то")
					.setValue(this.plugin.settings.textOption)
					.onChange(async (value) => {
						this.plugin.settings.textOption = value;

						await this.plugin.saveSettings();
						// check environment
						// Check if the directory exists, if not, create it
						if (!this.plugin.app.vault.getAbstractFileByPath(value)) {
							await this.plugin.app.vault.createFolder(value);
						}
					})
				);
			});
		/*			.addText((text) => text
						.setPlaceholder("Введите директорию для сохрания MD файлов")
						.setValue(this.plugin.settings.outputDirForPdfToMd)
						.onChange(async (value) => {
							this.plugin.settings.outputDirForPdfToMd = value;
							await this.plugin.saveSettings();
						})
					);
		*/

		// Верисия Marker_pdf
		new Setting(containerEl)
			.setTooltip("Верисия Marker_pdf")
			.setName("Верисия Marker_pdf")
			.setDesc("Версия установленной библиотеки")
			.addText((text) => text
				.setPlaceholder("Версия установленной библиотеки")
				.setValue(this.plugin.settings.marker_version)
				.onChange(async (value) => {
					this.plugin.settings.marker_version = value;
					await this.plugin.saveSettings();
				})
			);

		// Текстовое поле
		new Setting(containerEl)
			.setTooltip("Введите путь где находиться библиотека Marker_pdf")
			.setName("Путь где находиться библиотека Marker_pdf")
			.setDesc("Введите путь где находиться библиотека Marker_pdf")
			.addText((text) => text
				.setPlaceholder("Введите путь где находиться библиотека Marker_pdf")
				.setValue(this.plugin.settings.markerSinglePath)
				.onChange(async (value) => {
					this.plugin.settings.markerSinglePath = value;
					await this.plugin.saveSettings();
				})
			);

		// Числовое поле
		new Setting(containerEl)
			.setName("Числовая опция")
			.setDesc("Введите число")
			.addText((text) => text
				.setPlaceholder("Введите число")
				.setValue(this.plugin.settings.numberOption.toString())
				.onChange(async (value) => {
					const num = Number(value);
					if (!isNaN(num)) {
						this.plugin.settings.numberOption = num;
						await this.plugin.saveSettings();
					}
				})
			);

		// Выбор директории
		new Setting(containerEl)
			.setName("Выберите папку")
			.setDesc("Укажите папку внутри хранилища Obsidian")
			.addDropdown((dropdown) => {
				const folders = this.getFolders();
				folders.forEach((folder) => dropdown.addOption(folder, folder));

				dropdown
					.setValue(this.plugin.settings.folderOption)
					.onChange(async (value) => {
						this.plugin.settings.folderOption = value;
						await this.plugin.saveSettings();
					});
			});
	}
	showFolderSelection() {
		const folders = this.getFolders();

		//	this.app.commands.executeCommandById("app:open-command-palette");

		new MySuggestModal(this.app, folders, (selectedFolder: string) => {
			this.plugin.settings.folderOption = selectedFolder;
			this.plugin.saveSettings();
			new Notice(`Выбрана папка: ${selectedFolder}`);
		}).open();
	}
	// Получаем список папок в хранилище Obsidian
	getFolders(): string[] {
		const folders: string[] = [];
		const files = this.app.vault.getAllLoadedFiles();

		for (const file of files) {
			if (file instanceof TFolder) {
				folders.push(file.path);
			}
		}

		return folders;
	}
}

class MySuggestModal extends FuzzySuggestModal<string> {
	private callback: (choice: string) => void;
	private suggestions: string[];

	constructor(app: App, items: string[], callback: (choice: string) => void) {
		super(app);
		this.callback = callback;
		this.setPlaceholder("Выберите папку...");
		this.setInstructions([{ command: "Enter", purpose: "Выбрать" }]);
		this.suggestions = items;
	}

	getItems(): string[] {
		return this.suggestions;
	}

	getItemText(item: string): string {
		return item;
	}

	onChooseItem(item: string, evt: MouseEvent | KeyboardEvent) {
		this.callback(item);
	}
}


