import { Command, App } from 'obsidian';
import { MarkerCommandBase } from './MarkerCommandBase';

export class StrikethroughCommand extends MarkerCommandBase {
	id = 'toggle-strikethrough';
	name = 'Toggle strikethrough';
	prefix = '';
	command: Command;

	async execute(app: App): Promise<void> {
		await this.executeBase(app, 'strikethrough');
	}

}
