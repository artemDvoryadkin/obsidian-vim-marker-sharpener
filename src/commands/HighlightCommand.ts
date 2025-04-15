import { Command, App } from 'obsidian';
import { MarkerCommandBase } from './MarkerCommandBase';

export class HighlightCommand extends MarkerCommandBase {
	id = 'highlight-command';
	name = 'Toggle Highlight';
	prefix = '';
	command: Command;

	async execute(app: App): Promise<void> {
		await this.executeBase(app, 'highlight');
	}
}
