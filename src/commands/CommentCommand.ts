import { Command, App } from 'obsidian';
import { MarkerCommandBase } from './MarkerCommandBase';

export class CommentCommand extends MarkerCommandBase {
	id = 'toggle-comment';
	name = 'Toggle comment';
	prefix = '';
	command: Command;

	async execute(app: App): Promise<void> {
		await this.executeBase(app, 'comment');
	}
}
