import { Command, App } from 'obsidian';
import { MarkerCommandBase } from './MarkerCommandBase';

export class StrikethroughCommand extends MarkerCommandBase {
	id = 'strikethrough-command';
	name = 'Toggle Strikethrough';
	prefix = '';
	command: Command;

	async execute(app: App): Promise<void> {
		await this.executeBase(app, 'strikethrough');
	}

}
