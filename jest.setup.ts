// jest.setup.ts
export { }; // Add this line at the top or bottom of the file

expect.extend({
	toBeAndLog(received, expected) {
		console.log("Ожидаемое:", expected, "Фактическое:", received);
		const pass = received === expected;
		return {
			message: () => `Expected ${expected}, but received ${received}`,
			pass,
		};
	},
});