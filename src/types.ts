import { App } from 'obsidian';

export interface Command {
	id: string;
	name: string;
	execute(app: App): void | Promise<void>;
}
