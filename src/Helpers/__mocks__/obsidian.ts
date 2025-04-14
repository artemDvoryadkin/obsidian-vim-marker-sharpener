export class App {
	workspace = {
		getActiveFile: jest.fn().mockReturnValue(null),
		getActiveViewOfType: jest.fn().mockReturnValue(null),
	};
	metadataCache = {
		getFileCache: jest.fn().mockReturnValue({
			headings: [],
			frontmatter: {},
			sections: [],
		}),
	};
	vault = {
		getMarkdownFiles: jest.fn().mockReturnValue([]),
		getFiles: jest.fn().mockReturnValue([]),
		read: jest.fn().mockResolvedValue(''),
		modify: jest.fn().mockResolvedValue(undefined),
		cachedRead: jest.fn().mockResolvedValue(''),
	};
}

export class FileSystemAdapter {
	getBasePath = jest.fn().mockReturnValue('/mock/base/path');
}

export class TFile {
	path = '';
	extension = '';
}

export class MarkdownView { }

export interface HeadingCache {
	heading: string;
	level: number;
	position: {
		start: { line: number };
		end: { line: number };
	};
} 