import { App, Command, Plugin, TFile } from 'obsidian';
import { FileHelper } from 'src/Helpers/FileHelpers';
import MyPlugin from 'src/main';
import { MyPluginSettings } from 'src/MyPluginSettingTab';

export abstract class SharpenerCommand {
	id: string;
	name: string;
	prefix: string;
	command: Command;
	plugin: MyPlugin;

	constructor(plugin: Plugin) {
		this.plugin = plugin as MyPlugin;
	}

	abstract execute(app: App): void | Promise<void>;

	check(app: App, checking: boolean): boolean {
		//		console.log("check", { checking });
		if (!checking) {
			this.execute(app);
			return true;
		}
		return true;
	}

	getMyPlugin(): MyPlugin {
		return this.plugin
	}

	getCommandOfPlugin(type: typeof SharpenerCommand): Command {
		return this.getMyPlugin().commands.find(command => command instanceof type) as Command;
	}

	getPluginSettings(): MyPluginSettings {
		return this.getMyPlugin().settings;
	}
}
