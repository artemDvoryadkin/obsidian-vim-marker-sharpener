import { Command, App } from 'obsidian';
import { MarkerCommandBase } from './MarkerCommandBase';

export class CodeCommand extends MarkerCommandBase {
	id = 'code-command';
	name = 'Smart Toggle Code';
	prefix = 'cd';
	command: Command;

	async execute(app: App): Promise<void> {
		await this.executeBase(app, 'code');
	}
}
