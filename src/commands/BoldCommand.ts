import { Command, App } from 'obsidian';
import { MarkerCommandBase } from './MarkerCommandBase';

export class BoldCommand extends MarkerCommandBase {
	id = 'bold-command';
	name = 'Smart Toggle Bold';
	prefix = 'bc1';
	command: Command;

	async execute(app: App): Promise<void> {
		await this.executeBase(app, 'bold');
	}
}
