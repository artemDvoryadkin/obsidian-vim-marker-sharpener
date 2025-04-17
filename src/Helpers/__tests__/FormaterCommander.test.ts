import { FormaterCommanger, } from '../FormaterHelper';
import { ParserMarkdown } from '../ParserMarkdown';
import { expect } from '@jest/globals';
import { Remarkable } from 'remarkable';

describe('Разное', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});

	// выделение строки полной
	// TODO: ошибка нужно пофиксить ели есть символы табуляции
	it.each([
		{ input: "Y consistent with D and C to the end of line ", position: 3, result: "Y **consistent** with D and C to the end of line ", description: "" },
		{ input: "as **_bold_** or italicized", position: 17, result: "as **_bold_** or **italicized**", description: "" }


	])(`->$input позиция $position =>> $result :: $description`, ({ input, position, result, description }) => {
		const resultCall = formaterCommanger.markerBold(input, position)
		console.log("result", result);
		expect(resultCall.lineText).toBe(result);
	})
})
describe('РАБОЧИЙ ПРИМЕР', () => {
	let formaterCommanger: FormaterCommanger;


	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	}); test('рабочий пример2', () => {
		const result = formaterCommanger.markerBold("**Lorem** rpsum do", 0, 14)
		console.log("result=", result);
		expect(result.lineText).toBe("**Lorem rpsum** do");
	});
	test('рабочий пример', () => {
		const testData =
			{ input: "- [x] если не выделено и вызывается команда", positionBeging: 6, positionEnd: 10, result: "- [x] **если** не выделено и вызывается команда", description: "" }

		const result = formaterCommanger.markerBold(testData.input, testData.positionBeging, testData.positionEnd)
		console.log("result=", result);
		expect(result.lineText).toBe(testData.result);
		expect(result.fromSelectPosition).toBe(8);
		expect(result.toSelectPosition).toBe(11);
	});
})

describe('Вычитание выделения болд в слове по выделению', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});

	it.each([
		{ input: "**Текст7 жирный** ", positionBeging: 9, positionEnd: 11, result: "**Текст7** жир**ный** ", description: "" },
		{ input: "**Текст7 жирный** ", positionBeging: 8, positionEnd: 15, result: "**Текст7** жирный ", description: "" },
	])(`Пример:$input позиция $positionBeging $positionEnd =>> $result :: $description`, ({ input, positionBeging, positionEnd, result, description }) => {
		const resultCall = formaterCommanger.markerBold(input, positionBeging, positionEnd)
		console.log("result", result);
		expect(resultCall.lineText).toBe(result);
	})
})
describe('Добавление выделения болд в слове по выделению', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});

	it.each([
		{ input: "Текст5 жирный ", positionBeging: 1, positionEnd: 9, result: "Т**екст5 жир**ный ", description: "выделение часли слова" },
		{ input: "Текст5 жирный ", positionBeging: 1, positionEnd: 4, result: "Т**екст**5 жирный ", description: "выделение часли слова" },
		{ input: "Текст5 жирный ", positionBeging: 0, positionEnd: 5, result: "**Текст5** жирный ", description: "выделение часли слова" },
		{ input: "Текст5 жирный ", positionBeging: 0, positionEnd: 9, result: "**Текст5 жир**ный ", description: "выделение часли слова" },
		{ input: "Текст5    жирный ", positionBeging: 0, positionEnd: 7, result: "**Текст5**    жирный ", description: "выделение часли слова" },
		{ input: "  Текст7    жирный ", positionBeging: 0, positionEnd: 9, result: "  **Текст7**    жирный ", description: "выделение часли слова" }
	])(`Пример:$input позиция $positionBeging $positionEnd =>> $result :: $description`, ({ input, positionBeging, positionEnd, result, description }) => {
		const resultCall = formaterCommanger.markerBold(input, positionBeging, positionEnd)
		console.log("result", result);
		expect(resultCall.lineText).toBe(result);
	})

	it.each([
		{ input: "Текст5 жирный ", positionBeging: 1, positionEnd: 4, result: "Т_екст_5 жирный ", description: "выделение часли слова" },
		{ input: "Текст5 жирный ", positionBeging: 0, positionEnd: 5, result: "_Текст5_ жирный ", description: "выделение часли слова" },
		{ input: "Текст5 жирный ", positionBeging: 0, positionEnd: 9, result: "_Текст5 жир_ный ", description: "выделение часли слова" },
		{ input: "Текст5    жирный ", positionBeging: 0, positionEnd: 7, result: "_Текст5_    жирный ", description: "выделение часли слова" },
		{ input: "  Текст7    жирный ", positionBeging: 0, positionEnd: 9, result: "  _Текст7_    жирный ", description: "выделение часли слова" }
	])(`Пример:$input позиция $positionBeging $positionEnd =>> $result :: $description`, ({ input, positionBeging, positionEnd, result, description }) => {
		const resultCall = formaterCommanger.markerItalic(input, positionBeging, positionEnd)
		console.log("result", result);
		expect(resultCall.lineText).toBe(result);
	})
})

describe('Разное', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});

	// выделение строки полной
	it.each([
		{ input: "Текст7 , жирный ", fromPosition: 0, toPosition: 15, result: "**Текст7 , жирный** ", fromSelectPosition: 2, toSelectPosition: 16, description: "" },
		{ input: "Lorem rpsum dolor sit amet ", fromPosition: 6, toPosition: 20, result: "Lorem **rpsum dolor sit** amet ", fromSelectPosition: 8, toSelectPosition: 21, description: "" },
	])(`выделение строки полной ->> Пример:$input позиция $fromPosition $toPosition =>> $result :: $description`, ({ input, fromPosition, toPosition, result, fromSelectPosition, toSelectPosition, description }) => {
		const parser = new ParserMarkdown();
		const chainsText = parser.parseLine(input, fromPosition, toPosition)

		const resultCall = formaterCommanger.markerBold(input, fromPosition, toPosition)
		console.log("result", resultCall);
		expect(resultCall.lineText).toBe(result);
		expect(resultCall.fromSelectPosition).toBe(fromSelectPosition);
		expect(resultCall.toSelectPosition).toBe(toSelectPosition);
	})
	// получить чистую позицию
	it.each([
		{ input: "**Текст7** , жирный ", position: 13, result: 9, description: "" },
		{ input: "Текст", position: 4, result: 4, description: "" }
	])(`разное ->> Пример:$input позиция $position =>> $result :: $description`, ({ input, position, result, description }) => {
		const parser = new ParserMarkdown();
		const chainsText = parser.parseLine(input)
		const clearPosition = parser.getClearPosition(position, 'bold', chainsText)
		console.log("result", result);
		expect(clearPosition).toBe(result);

		const positionByClearPosition = parser.getPositionByClearPosition(clearPosition, chainsText)
		expect(positionByClearPosition).toBe(position);

	})

	// TODO: ошибка нужно пофиксить ели есть символы табуляции
	it.each([
		//{ input: "Текст5   , жирный ", position: 9, result: "Текст5   **,** жирный ", description: "" },
		//{ input: "Текст5 \t\t, жирный ", position: 9, result: "Текст5 \t\t**,** жирный ", description: "" },
		{ input: "Y consistent with D and C to the end of line ", position: 3, result: "Y **consistent** with D and C to the end of line ", description: "" }
	])(`разное ->> Пример:$input позиция $position =>> $result :: $description`, ({ input, position, result, description }) => {
		const resultCall = formaterCommanger.markerBold(input, position)
		console.log("result", result);
		expect(resultCall.lineText).toBe(result);
	})

	it.each([
		{ input: "Текст5 жирный ", position: 6, result: "Текст5 жирный ", description: "" }
		, { input: "Текст5\tжирный ", position: 6, result: "Текст5\tжирный ", description: "" }
		, { input: "Текст5\nжирный ", position: 6, result: "Текст5\nжирный ", description: "" }
	])(`пробел не выделяется ->> Пример:$input позиция $position =>> $result :: $description`, ({ input, position, result, description }) => {
		const resultCall = formaterCommanger.markerBold(input, position)
		console.log("result", result);
		expect(resultCall.lineText).toBe(result);
	})
})
describe('добавление выделения болд в слове при выделении', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});

	it.each([
		{ input: "**Текст7** жирный ", from: 0, to: 13, result: "**Текст7 жир**ный ", description: "" },
		{ input: "Текст5 **жир**ный ", from: 0, to: 9, result: "**Текст5 жир**ный ", description: "" }
	])(`Пример:$input позиция $from $to =>> $result :: $description`, ({ input, from, to, result, description }) => {
		const resultCall = formaterCommanger.markerBold(input, from, to)
		console.log("result", result);
		expect(resultCall.lineText).toBe(result);
	})

	it.each([
		{ input: "~~Текст7~~ жирный ", from: 0, to: 13, result: "~~Текст7 жир~~ный ", description: "" },
		/*{ input: "Текст5 ~~жир~~ный ", from: 0, to: 9, result: "~~Текст5 жир~~ный ", description: "" }*/
	])(`Пример:$input позиция $from $to =>> $result :: $description`, ({ input, from, to, result, description }) => {
		const resultCall = formaterCommanger.markerStrikethrough(input, from, to)
		console.log("result", result);
		expect(resultCall.lineText).toBe(result);
	})
})


describe('объединение выделений болд', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});
	const testCases = [
		{ input: "After **installing** **all** necessary ", from: 9, to: 23, result: "After **installing all** necessary ", description: "" },
		{ input: "After **installing** **all** necessary ", from: 18, to: 21, result: "After **installing all** necessary ", description: "" },
		{ input: "**Текст7** жирный **второе выделение**", from: 5, to: 25, result: "**Текст7 жирный второе выделение**", description: "" }
	]
	/*
	const hasOnly = testCases.some(tc => tc.only);
	const filtered = hasOnly
		? testCases.filter(tc => tc.only)
		: testCases;

		*/
	it.each(testCases)(
		`Пример:$input позиция $from $to =>> $result :: $description`, ({ input, from, to, result, description }) => {
			const resultCall = formaterCommanger.markerBold(input, from, to)
			console.log("result", result);
			expect(resultCall.lineText).toBe(result);
		}
	);

	it.each([
		{ input: "After **installing** **all** necessary ", from: 9, to: 23, result: "After **installing all** necessary ", description: "" },
		{ input: "After **installing** **all** necessary ", from: 18, to: 21, result: "After **installing all** necessary ", description: "" },
		{ input: "**Текст7** жирный **второе выделение**", from: 5, to: 25, result: "**Текст7 жирный второе выделение**", description: "" }
	])(`Пример:$input позиция $from $to =>> $result :: $description`, ({ input, from, to, result, description }) => {
		const resultCall = formaterCommanger.markerBold(input, from, to)
		console.log("result", result);
		expect(resultCall.lineText).toBe(result);
	})
})

describe('добавление выделения болд в слове', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});

	it.each([
		{ input: "Текст5 жи**р**ный ", position: 7, result: "Текст5 **жир**ный ", description: "часть слова до выделения" }
		, { input: "Текст жи**р**ный ", position: 13, result: "Текст жи**рный** ", description: "часть слова после выделения" }
	])(`Пример:$input позиция $position =>> $result :: $description`, ({ input, position, result, description }) => {
		const resultCall = formaterCommanger.markerBold(input, position)
		console.log("result", result);
		expect(resultCall.lineText).toBe(result);
	})
})

describe('Снятие выделения выделением слова', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});

	// снимаем выделение со слова, находясь на маркетах выделения
	it.each([
		{ input: "**exmap editorToggleComment obcommand** vim-marker-sharpener:toggle-comment ", position: 0, positionTo: 5, result: "exma**p editorToggleComment obcommand** vim-marker-sharpener:toggle-comment ", description: "четвертая звезда" },
		{ input: "**exmap editorToggleComment obcommand** vim-marker-sharpener:toggle-comment ", position: 0, positionTo: 6, result: "exmap **editorToggleComment obcommand** vim-marker-sharpener:toggle-comment ", description: "четвертая звезда" },
		{ input: "**exmap editorToggleComment obcommand** vim-marker-sharpener:toggle-comment ", position: 0, positionTo: 7, result: "exmap **editorToggleComment obcommand** vim-marker-sharpener:toggle-comment ", description: "четвертая звезда" },
	])(`Пример:$input позиция $position, $positionTo =>> $result :: $description`, ({ input, position, positionTo, result, description }) => {
		const resultCall = formaterCommanger.markerBold(input, position, positionTo)
		console.log("result", result);
		expect(resultCall.lineText).toBe(result);
	})
})
describe('Снятие выделения болд со слова', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});

	// снимаем выделение со слова, находясь на маркетах выделения
	it.each([
		{ input: " **Текст8** жирный ", position: 3, result: " Текст8 жирный ", description: "первая буква" }
		, { input: "Текст5 **жирный** ", position: 7, result: "Текст5 жирный ", description: "первая звезда" }
		, { input: "Текст5 **жирный** ", position: 8, result: "Текст5 жирный ", description: "вторая звезда" }
		, { input: "Текст5 **жирный** ", position: 15, result: "Текст5 жирный ", description: "третья звезда" }
		, { input: "Текст5 **жирный** ", position: 16, result: "Текст5 жирный ", description: "четвертая звезда" }
	])(`Пример:$input позиция $position =>> $result :: $description`, ({ input, position, result, description }) => {
		const resultCall = formaterCommanger.markerBold(input, position)
		console.log("result", result);
		expect(resultCall.lineText).toBe(result);
	})
})

describe('Снимаем выделение болд в букве слова', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});

	it.each([
		{ input: "Текст5 **жирный** ", position: 10, result: "Текст5 жирный ", description: "часть слова до выделения" }
		, { input: "Текст жи**р**ный ", position: 8, result: "Текст жирный ", description: "звездочка левая первая" }
		, { input: "Текст жи**р**ный ", position: 9, result: "Текст жирный ", description: "звездочка левая вторая" }
		, { input: "Текст жи**р**ный ", position: 10, result: "Текст жирный ", description: "часть слова после выделения" }
		, { input: "Текст жи**р**ный ", position: 11, result: "Текст жирный ", description: "звездочка правая первая закрывающая" }
		, { input: "Текст жи**р**ный ", position: 12, result: "Текст жирный ", description: "звездочка вторая закрывающая" }
		, { input: "**слово**", position: 3, result: "слово", description: "" }
	])(`Пример:$input позиция $position =>> $result :: $description`, ({ input, position, result, description }) => {
		const resultCall = formaterCommanger.markerBold(input, position)
		console.log("result", result);
		expect(resultCall.lineText).toBe(result);
	})
})