import { Command, App } from 'obsidian';
import { MarkerCommandBase } from './MarkerCommandBase';

export class CodeCommand extends MarkerCommandBase {
	id = 'toggle-code';
	name = 'Toggle Code';
	prefix = '';
	command: Command;

	async execute(app: App): Promise<void> {
		await this.executeBase(app, 'code');
	}
}
