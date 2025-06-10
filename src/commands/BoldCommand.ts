import { Command, App } from 'obsidian';
import { MarkerCommandBase } from './MarkerCommandBase';
import { ParserMarkdown } from 'src/Helpers/ParserMarkdown';

export class BoldCommand extends MarkerCommandBase {
	id = 'toggle-bold';
	name = 'Toggle bold';
	prefix = '';
	command: Command;

	async execute(app: App): Promise<void> {
		await this.executeBase(app, 'bold');
	}
}
