import * as fs from 'fs';

export function saveDataToJsonFile(data: any, filePath: string): void {
	const jsonData = JSON.stringify(data, null, 2);
	fs.writeFileSync(filePath, jsonData, 'utf8');
} 