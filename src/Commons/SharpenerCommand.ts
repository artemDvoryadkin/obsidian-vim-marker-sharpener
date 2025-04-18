import { Command, Plugin, App } from 'obsidian';
import VimMarkerPlugin from 'src/main';


export abstract class SharpenerCommand {
	id: string;
	name: string;
	prefix: string;
	command: Command;
	plugin: VimMarkerPlugin;

	constructor(plugin: Plugin) {
		this.plugin = plugin as VimMarkerPlugin;
	}

	abstract execute(app: App): void | Promise<void>;

	check(app: App, checking: boolean): boolean {
		if (!checking) {
			this.execute(app);
			return true;
		}
		return true;
	}

	getMyPlugin(): VimMarkerPlugin {
		return this.plugin;
	}

	getCommandOfPlugin(type: typeof SharpenerCommand): Command {
		return this.getMyPlugin().commands.find(command => command instanceof type) as Command;
	}
}
