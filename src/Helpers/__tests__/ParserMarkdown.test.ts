import { ParserMarkdown } from '../ParserMarkdown'; // Импортируем функцию, которую будем тестировать

describe('parseMarkdown', () => {
	it('рабочий пример', () => {
		const input = '**Hello** __World__ test ** test';
		const parser = new ParserMarkdown();
		const output = parser.parseLine(input);

		console.log("result", output);

	});

	const testCases = [
		{ input: '**Hello** __World__' },
		{ input: '**H ello**' },
		{ input: ' Do not wrap lines.' }
	]
	testCases.forEach(testCase => {

		it(`Пример: ${testCase.input}`, () => {
			const parser = new ParserMarkdown();
			const output = parser.parseLine(testCase.input);
			console.log("result", output);
			const resultText = output.reduce((acc, item) => acc + item.content, "")

			expect(resultText).toEqual(testCase.input);
		});
	})

	// Добавьте больше тестов по мере необходимости
}); 