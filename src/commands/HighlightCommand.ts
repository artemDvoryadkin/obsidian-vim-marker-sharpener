import { Command, App } from 'obsidian';
import { MarkerCommandBase } from './MarkerCommandBase';


export class HighlightCommand extends MarkerCommandBase {
	id = 'highlight-command';
	name = 'Smart Toggle Highlight';
	prefix = 'hc';
	command: Command;

	async execute(app: App): Promise<void> {
		await this.executeBase(app, 'highlight');
	}
}
