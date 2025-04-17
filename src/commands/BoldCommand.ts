import { Command, App } from 'obsidian';
import { MarkerCommandBase } from './MarkerCommandBase';

export class BoldCommand extends MarkerCommandBase {
	id = 'toggle-bold';
	name = 'Toggle Bold';
	prefix = '';
	command: Command;

	async execute(app: App): Promise<void> {
		await this.executeBase(app, 'bold');
	}
}
