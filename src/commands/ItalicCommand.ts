import { Command, App } from 'obsidian';
import { MarkerCommandBase } from './MarkerCommandBase';

export class ItalicCommand extends MarkerCommandBase {
	id = 'italic-command';
	name = 'Toggle Italic';
	prefix = '';
	command: Command;

	async execute(app: App): Promise<void> {
		await this.executeBase(app, 'italic');
	}

}
