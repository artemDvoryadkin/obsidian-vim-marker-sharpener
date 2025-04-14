import { exec } from 'child_process';
import { App, Notice, Command } from 'obsidian';
import { SharpenerCommand } from '../Commons/types';

export class ScriptExecutor {
	id = 'script-executor';
	name = 'Script Executor';
	prefix = '`se';

	private app: App;
	private scriptPaths: string[];
	logEntries: string[] = [];
	private shouldStop = false;
	private currentProcess: ReturnType<typeof exec> | null = null;

	constructor(app: App, scriptPaths: string[]) {
		this.app = app;
		this.scriptPaths = scriptPaths;
	}

	public async executeScripts(
		logHandler: (logEntries: string[]) => void,
		logDestinations: { console?: boolean, notice?: boolean } = { console: true, notice: true },
		completionCallback?: () => void
	): Promise<string> {

		let output = '';

		const log = async (message: string) => {
			if (logDestinations.console) {
				console.log(message);
			}

			// Check if the message ends with a newline
			console.log("executeScripts.log", { message, "logEntirues": this.logEntries });

			if (this.logEntries.length == 0 || this.logEntries.length > 0 && (this.logEntries[0].endsWith("\n") || message.endsWith("\n"))) {
				this.logEntries = [...message.split("\r").pop()?.split("\n") || ""].concat(this.logEntries);
			} else if (message.startsWith("\r")) {
				this.logEntries[0] = message.split("\r").pop() || "";
			} else {
				this.logEntries[0] += message.split("\r").pop() || "";
			}

			output = this.logEntries.map(line => line.trim().replace(/[\r\n]+/g, '')).reduce((acc, line) => line + acc + "\n", "").trim();

			// Call the logHandler callback with the current log entries
			logHandler(this.logEntries);

			if (logDestinations.notice) {
				new Notice(message);
			}

			console.log("executeScript->>logEntries.log", this.logEntries);
		};

		const executeScript = async (index: number): Promise<void> => {
			if (this.shouldStop) {
				await log('Execution stopped by user.----\n');
				return;
			}
			console.log("executeScript->>logEntries", this.logEntries);


			console.log("executeScript->>index", index, this.scriptPaths);
			if (index < this.scriptPaths.length) {
				try {

					const scriptPath = this.scriptPaths[index];
					await log(`> Executing script: \`${scriptPath}\`\n`);
					this.currentProcess = exec(`${scriptPath}`);


					if (this.currentProcess.stdout) {
						this.currentProcess.stdout.on('data', async (data) => {
							await log(data.replace(/</g, '\\<'));
						});
					}

					if (this.currentProcess.stderr) {
						this.currentProcess.stderr.on('data', async (data) => {
							await log(data.replace(/</g, '\\<'));
						});
					}

					this.currentProcess.on('close', async (code) => {
						this.currentProcess = null;

						await log(`> Script exited with code: ${code}\n`);
						if (this.shouldStop) {
							await log('> Execution stopped by user.\n');
							return;
						}
						if (code !== 0) {
							await log(`> Script exited with code: ${code}\n`);
							// -[ ] нужно сдлеать доработку если нулл пришел. Это убили процесс снаружи
							return
						} else {
							await log(`> Script executed successfully.\n`);
						}

						if (index >= this.scriptPaths.length - 1) {
							await log('> All scripts executed successfully!\n');
							if (completionCallback) {
								completionCallback();
							}
							return;
						}
						if (code === 0) {
							await executeScript(index + 1); // Call the next script
						}
					});
					await new Promise((resolve) => {
						const checkExitCode = setInterval(() => {
							if (this.currentProcess?.exitCode !== null) {
								clearInterval(checkExitCode);
								resolve(this.currentProcess?.exitCode);
							}
						}, 1000); // Check every 100ms
					});
				} catch (error) {
					const message = `> Error executing script: ${error.message}\n`;
					await log(message);
				}
			}
		};

		await executeScript(0); // Start executing scripts from the first one
		await logHandler(this.logEntries);

		return output;
	}

	public stopExecution(): void {
		this.shouldStop = true;
		if (this.currentProcess) {
			this.currentProcess.kill();
			this.currentProcess = null;
		}
	}
} 