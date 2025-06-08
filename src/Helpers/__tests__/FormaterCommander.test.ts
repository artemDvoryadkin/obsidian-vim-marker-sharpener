import { FormaterCommanger, } from '../FormaterHelper';
import { ParserMarkdown } from '../ParserMarkdown';
import { expect } from '@jest/globals';
import { Remarkable } from 'remarkable';
declare const __DEV__ = true;

describe('smart selector', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});

	// выделение строки полной
	// TODO: ошибка нужно пофиксить ели есть символы табуляции
	it.each([
		{ input: "- test6: test.", position: 1, selectStart: 2, selectEnd: 6 },
		{ input: "1. est6: test.", position: 1, selectStart: 3, selectEnd: 6 },
		{ input: "test6 eee10: test.", position: 1, selectStart: 0, selectEnd: 10 },
		{ input: "● kltest  eee14: test.\n test", position: 10, selectStart: 2, selectEnd: 14 },

	])(`->$input позиция {$selectStart,$selectEnd}`, ({ input, position, selectStart, selectEnd }) => {
		const resultCall = formaterCommanger.getSmartSelection(input, position);
		expect(resultCall.from).toBe(selectStart);
		expect(resultCall.to).toBe(selectEnd);
	})
})
describe('снятие выделения', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});

	// выделение строки полной
	// TODO: ошибка нужно пофиксить ели есть символы табуляции
	it.each([
		{ input: "as **bold** or **italicized**", position: 0, result: "as bold or italicized", description: "" },
		{ input: "as **bold** or ==**italicized** test==", position: 0, result: "as bold or italicized test", descripion: "" },
		{ input: "as **bold** or **italicized**", position: 5, result: "as bold or **italicized**", description: "" },
		{ input: "as **bold** or **italicized**", position: 3, result: "as bold or **italicized**", description: "" }

	])(`->$input позиция $position =>> $result :: $description`, ({ input, position, result, description }) => {
		const resultCall = formaterCommanger.makerClear(input, position);
		expect(resultCall.lineText).toBe(result);
	})
})
describe('снятие выделения множественных выделений', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});

	// выделение строки полной
	// TODO: ошибка нужно пофиксить ели есть символы табуляции
	it.each([
		{ input: "as **bold** or **italicized**", position: 0, positionTo: 5, result: "as bold or **italicized**", description: "" },
		{ input: "as **bold** or ==**italicized** test==", position: 0, positionTo: 10, result: "as bold or ==**italicized** test==", descripion: "" },
		{ input: "as **bold** or **italicized**", position: 5, positionTo: 10, result: "as bold or **italicized**", description: "" },
		{ input: "as **bold** or **italicized**", position: 3, positionTo: 10, result: "as bold or **italicized**", description: "" }


	])(`->$input позиция $position $positionTo =>> $result :: $description`, ({ input, position, positionTo, result, description }) => {
		const resultCall = formaterCommanger.makerClear(input, position, positionTo);
		expect(resultCall.lineText).toBe(result);
	})
})
describe('Разное селкт маркер', () => {
	let formaterCommanger: FormaterCommanger;

	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	});

	// выделение строки полной
	// TODO: ошибка нужно пофиксить ели есть символы табуляции
	it.each([
		{ input: "test4 **dddd** www", position: 8, result: { from: 8, to: 11 }, description: "" },
		{ input: "test4 **dddd** www", position: 7, result: { from: 8, to: 11 }, description: "" },
		{ input: "test4 **dddd** www", position: 12, result: { from: 8, to: 11 }, description: "" },
		{ input: "test4 dddd www  17", position: 5, result: { from: 5, to: 5 }, description: "" },
		{ input: "- `Cmd+Shift+P` → `Введи Shell Command: Install 'cursor'` command in PATH", position: 3, result: { from: 3, to: 13 }, description: "" },


	])(`->$input позиция $position =>> $result :: $description`, ({ input, position, result, description }) => {
		const resultCall = formaterCommanger.getMarkerPosition(input, position)
		__DEV__ && console.log("resultCall", resultCall)
		expect(resultCall.from).toEqual(result.from);
		expect(resultCall.to).toEqual(result.to);
	})
})
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
		expect(resultCall.lineText).toBe(result);
	})
})
describe('РАБОЧИЙ ПРИМЕР', () => {
	let formaterCommanger: FormaterCommanger;


	beforeEach(() => {
		formaterCommanger = new FormaterCommanger();
	}); test('рабочий пример2', () => {
		const result = formaterCommanger.markerBold("**Lorem** rpsum do", 0, 14)
		expect(result.lineText).toBe("**Lorem rpsum** do");
	});
	test('рабочий пример', () => {
		const testData =
			{ input: "- [x] если не выделено и вызывается команда", positionBeging: 6, positionEnd: 10, result: "- [x] **если** не выделено и вызывается команда", description: "" }

		const result = formaterCommanger.markerBold(testData.input, testData.positionBeging, testData.positionEnd)
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
		expect(resultCall.lineText).toBe(result);
	})

	it.each([
		{ input: "Текст5 жирный ", positionBeging: 1, positionEnd: 4, result: "Т*екст*5 жирный ", description: "выделение часли слова" },
		{ input: "Текст5 жирный ", positionBeging: 0, positionEnd: 5, result: "*Текст5* жирный ", description: "выделение часли слова" },
		{ input: "Текст5 жирный ", positionBeging: 0, positionEnd: 9, result: "*Текст5 жир*ный ", description: "выделение часли слова" },
		{ input: "Текст5    жирный ", positionBeging: 0, positionEnd: 7, result: "*Текст5*    жирный ", description: "выделение часли слова" },
		{ input: "  Текст7    жирный ", positionBeging: 0, positionEnd: 9, result: "  *Текст7*    жирный ", description: "выделение часли слова" }
	])(`Пример:$input позиция $positionBeging $positionEnd =>> $result :: $description`, ({ input, positionBeging, positionEnd, result, description }) => {
		const resultCall = formaterCommanger.markerItalic(input, positionBeging, positionEnd)
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
		expect(resultCall.lineText).toBe(result);
	})

	it.each([
		{ input: "Текст5 жирный ", position: 6, result: "Текст5 жирный ", description: "" }
		, { input: "Текст5\tжирный ", position: 6, result: "Текст5\tжирный ", description: "" }
		, { input: "Текст5\nжирный ", position: 6, result: "Текст5\nжирный ", description: "" }
	])(`пробел не выделяется ->> Пример:$input позиция $position =>> $result :: $description`, ({ input, position, result, description }) => {
		const resultCall = formaterCommanger.markerBold(input, position)
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
		expect(resultCall.lineText).toBe(result);
	})

	it.each([
		{ input: "~~Текст7~~ жирный ", from: 0, to: 13, result: "~~Текст7 жир~~ный ", description: "" },
		/*{ input: "Текст5 ~~жир~~ный ", from: 0, to: 9, result: "~~Текст5 жир~~ный ", description: "" }*/
	])(`Пример:$input позиция $from $to =>> $result :: $description`, ({ input, from, to, result, description }) => {
		const resultCall = formaterCommanger.markerStrikethrough(input, from, to)
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
			expect(resultCall.lineText).toBe(result);
		}
	);

	it.each([
		{ input: "After **installing** **all** necessary ", from: 9, to: 23, result: "After **installing all** necessary ", description: "" },
		{ input: "After **installing** **all** necessary ", from: 18, to: 21, result: "After **installing all** necessary ", description: "" },
		{ input: "**Текст7** жирный **второе выделение**", from: 5, to: 25, result: "**Текст7 жирный второе выделение**", description: "" }
	])(`Пример:$input позиция $from $to =>> $result :: $description`, ({ input, from, to, result, description }) => {
		const resultCall = formaterCommanger.markerBold(input, from, to)
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
		expect(resultCall.lineText).toBe(result);
	})
})