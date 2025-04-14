import { Command, App } from 'obsidian';
import { MarkerCommandBase } from './MarkerCommandBase';

export class StrikethroughCommand extends MarkerCommandBase {
	id = 'strikethrough-command';
	name = 'Smart Toggle Strikethrough';
	prefix = 'st';
	command: Command;

	async execute(app: App): Promise<void> {
		await this.executeBase(app, 'strikethrough');
	}

}
