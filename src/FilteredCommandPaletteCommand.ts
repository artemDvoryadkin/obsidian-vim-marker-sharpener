import { App, Modal, Command } from 'obsidian';
import { SharpenerCommand } from './Commons/types';

export class FilteredCommandPaletteCommand extends SharpenerCommand {
	id = 'filtered-command-palette';
	name = 'Filtered Command Palette';
	prefix = 'Show';
	command: Command;

	execute(app: App): void {
		const allCommands = (app as any).commands.listCommands();
		const filteredCommands = allCommands.filter((cmd: any) => this.filterCondition(cmd));

		console.log(filteredCommands);

		// Show the filtered commands in a custom modal
		const modal = new FilteredCommandModal(app, filteredCommands);
		modal.open();
	}

	private filterCondition(command: any): boolean {
		// Define your filtering logic here
		console.log(command);
		return command.name.includes('`'); // Example filter condition
	}
}

class FilteredCommandModal extends Modal {
	private commands: any[];
	private filteredCommands: any[];
	private selectedIndex = 0;

	constructor(app: App, commands: any[]) {
		super(app);
		this.commands = commands;
		this.filteredCommands = commands;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.createEl('h2', { text: 'Filtered Commands' });

		const searchInput = contentEl.createEl('input', { type: 'text', placeholder: 'Search commands...' });
		searchInput.addEventListener('input', () => this.updateList(searchInput.value));
		searchInput.addEventListener('keydown', (event) => this.handleKeydown(event));

		this.updateList('');
	}

	updateList(query: string) {
		const { contentEl } = this;
		const listEl = contentEl.createEl('div');
		listEl.empty();

		this.filteredCommands = this.commands.filter(cmd => cmd.name.toLowerCase().includes(query.toLowerCase()));

		this.filteredCommands.forEach((cmd, index) => {
			const commandEl = listEl.createEl('div', { text: cmd.name });
			commandEl.addClass('command-item');
			if (index === this.selectedIndex) {
				commandEl.addClass('selected');
			}
			commandEl.addEventListener('click', () => {
				(this.app as any).commands.executeCommandById(cmd.id);
				this.close();
			});
		});
	}

	handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			this.selectedIndex = (this.selectedIndex + 1) % this.filteredCommands.length;
			this.updateList('');
		} else if (event.key === 'ArrowUp') {
			this.selectedIndex = (this.selectedIndex - 1 + this.filteredCommands.length) % this.filteredCommands.length;
			this.updateList('');
		} else if (event.key === 'Enter') {
			const selectedCommand = this.filteredCommands[this.selectedIndex];
			if (selectedCommand) {
				(this.app as any).commands.executeCommandById(selectedCommand.id);
				this.close();
			}
		}
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
} 