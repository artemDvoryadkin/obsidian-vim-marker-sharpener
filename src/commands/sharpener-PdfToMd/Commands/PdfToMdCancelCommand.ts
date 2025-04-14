import { App, Command, } from 'obsidian';
import { SharpenerCommand } from 'src/Commons/types';
import { PdfToMdConvertCommand } from '../PdfToMdCommand';
export class PdfToMdCancelCommand extends SharpenerCommand {
	id = 'pdf-to-md_cancel';
	name = 'PdfToMd Cancel convertation';

	prefix = '';
	command: Command;

	check(app: App, checking: boolean): boolean {
		if (checking) {
			//%const commandPdfToMd = (this.getMyPlugin().commands.find(command => command instanceof PdfToMdConvertCommand)) as PdfToMdConvertCommand;
			const commandPdfToMd = this.getCommandOfPlugin(PdfToMdConvertCommand) as PdfToMdConvertCommand;
			if (commandPdfToMd && commandPdfToMd.isRunning) {

				this.command.name = this.getMyPlugin().pluginName + '.PdfToMd: Cancel convertation: ' + commandPdfToMd.sourceFile_pdf?.name;
				return true;
			}
			return false;
		}
		const chechResult = this.check(app, true);
		if (chechResult) {
			this.execute(app);
		}
		return chechResult;
	}

	execute(app: App): void {

		const commandPdfToMd = this.getCommandOfPlugin(PdfToMdConvertCommand) as PdfToMdConvertCommand;

		if (commandPdfToMd) {
			commandPdfToMd.stopExecution();
		}
	}
} 