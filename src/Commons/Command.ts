import { App } from 'obsidian';


export interface Command {
	id: string;
	name: string;
	prefix: string;
	execute(app: App): void | Promise<void>;
	check(app: App): boolean;
}
