declare namespace jest {
	interface Matchers<R> {
		toBeAndLog(expected: string): R;
	}
} 