declare global {
	// eslint-disable-next-line no-var
	var __DEV__: boolean;
}
if (typeof globalThis.__DEV__ === 'undefined') {
	globalThis.__DEV__ = true;
}

export { }; 