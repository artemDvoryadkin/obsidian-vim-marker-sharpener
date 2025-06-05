import { DefaultDeserializer } from 'v8';
import { ParserMarkdown } from './ParserMarkdown';
import { EditorSelection } from 'obsidian';
import { text } from 'stream/consumers';

export type MarkerType = 'bold_open' | 'bold_close' | 'italic_open' | 'italic_close' | 'highlight_open' | 'highlight_close' | 'text' | 'strikethrough_open' | 'strikethrough_close' | 'code_open' | 'code_close' | 'comment_open' | 'comment_close';
export type MarkerAction = 'bold' | 'italic' | 'highlight' | 'strikethrough' | 'code' | 'comment'
// Define custom token types
interface Token {
	type: string;
	content?: string;
	hLevel?: number;
	params?: string;
}


export class LineTextResult {
	fromSelectPosition: number
	toSelectPosition?: number
	lineText: string
}

export class TextChain {
	constructor(type: MarkerType);
	constructor(type: MarkerType, from?: number, to?: number, content?: string);
	constructor(type: MarkerType, from?: number, to?: number, content?: string, isNew?: boolean);

	constructor(type: MarkerType, from = -1, to = -1, content?: string, isNew = false, fromSelectedPosition?: number, toSelectedPosition?: number) {
		this.content = content || ''

		if (type == 'bold_open') { this.isBold = true; this.content = '**' }
		if (type == 'bold_close') { this.isBold = false; this.content = '**' }
		if (type == 'italic_open') { this.isBold = false; this.content = '*' }
		if (type == 'italic_close') { this.isBold = false; this.content = '*' }
		if (type == 'highlight_open') { this.isBold = false; this.content = '==' }
		if (type == 'highlight_close') { this.isBold = false; this.content = '==' }
		if (type == 'strikethrough_open') { this.isBold = false; this.content = '~~' }
		if (type == 'strikethrough_close') { this.isBold = false; this.content = '~~' }
		if (type == 'code_open') { this.isBold = false; this.content = '`' }
		if (type == 'code_close') { this.isBold = false; this.content = '`' }
		if (type == 'comment_open') { this.isBold = false; this.content = '%%' }
		if (type == 'comment_close') { this.isBold = false; this.content = '%%' }

		this.from = from == undefined ? -1 : from;
		this.to = to == undefined ? -1 : to;
		this.type = type;
		this.isDelete = false;
		this.isNew = isNew || false;
		this.isBold = false;
		this.fromSelectedPosition = fromSelectedPosition;
		this.toSelectedPosition = toSelectedPosition;
		if (type == 'bold_open' || type == 'bold_close') this.markerAction = 'bold'
		if (type == 'italic_open' || type == 'italic_close') this.markerAction = 'italic'
		if (type == 'highlight_open' || type == 'highlight_close') this.markerAction = 'highlight'
		if (type == 'strikethrough_open' || type == 'strikethrough_close') this.markerAction = 'strikethrough'
		if (type == 'code_open' || type == 'code_close') this.markerAction = 'code'
		if (type == 'comment_open' || type == 'comment_close') this.markerAction = 'comment'
	}
	isOpenMarker(): boolean {
		return this.type == 'bold_open' || this.type == 'italic_open' || this.type == 'highlight_open' || this.type == 'strikethrough_open' || this.type == 'code_open' || this.type == 'comment_open'

	}
	isCloseMarker(): boolean {
		return this.type == 'bold_close' || this.type == 'italic_close' || this.type == 'highlight_close' || this.type == 'strikethrough_close' || this.type == 'code_close' || this.type == 'comment_close'

	}
	isTextMarker(): boolean {
		return (this.isItalic || this.isHighlight || this.isStrikethrough || this.isCode || this.isComment || this.isBold) && this.type == 'text'
	}

	from: number
	to: number
	type: MarkerType
	content: string
	isDelete: boolean
	isItalic: boolean
	isHighlight: boolean
	isStrikethrough: boolean
	isCode: boolean
	isComment: boolean
	isNew: boolean
	isBold: boolean
	fromSelectedPosition?: number
	toSelectedPosition?: number
	markerAction: MarkerAction
}

export class FormaterCommanger {
	private sourceTokens: Token[] = []
	constructor() {
		this.sourceTokens = []
		this.sourceTokens.push({ type: 'bold_open', content: '**' })
		this.sourceTokens.push({ type: 'bold_close', content: '**' })
		this.sourceTokens.push({ type: 'italic_open', content: '*' })
		this.sourceTokens.push({ type: 'italic_close', content: '*' })
		this.sourceTokens.push({ type: 'highlight_open', content: '==' })
		this.sourceTokens.push({ type: 'highlight_close', content: '==' })
		this.sourceTokens.push({ type: 'strikethrough_open', content: '~~' })
		this.sourceTokens.push({ type: 'strikethrough_close', content: '~~' })
		this.sourceTokens.push({ type: 'code_open', content: '`' })
		this.sourceTokens.push({ type: 'code_close', content: '`' })
		this.sourceTokens.push({ type: 'comment_open', content: '%%' })
		this.sourceTokens.push({ type: 'comment_close', content: '%%' })
	}

	getSourceTokens(markerAction: MarkerAction): { openToken: Token, closeToken: Token } {
		const openToken = this.sourceTokens.find(token => token.type == markerAction + '_open')
		const closeToken = this.sourceTokens.find(token => token.type == markerAction + '_close')
		if (!openToken || !closeToken) throw new Error(`Source tokens for ${markerAction} not found`)
		return { openToken, closeToken }
	}

	getAll(): { openToken: Token, closeToken: Token, markerAction: MarkerAction }[] {
		const result: { openToken: Token, closeToken: Token, markerAction: MarkerAction }[] = []
		const markers: MarkerAction[] = ['bold', 'italic', 'highlight', 'strikethrough', 'code', 'comment']

		markers.forEach(markerAction => {
			const { openToken, closeToken } = this.getSourceTokens(markerAction)
			result.push({ openToken, closeToken, markerAction })
		})
		return result
	}

	markerMultiline(markerAction: MarkerAction, lines: string[], selection: EditorSelection): LineTextResult[] {
		const result: LineTextResult[] = []

		let from = selection.anchor
		let to = selection.head

		if (from.line > to.line || (from.line === to.line && from.ch > to.ch)) {
			[from, to] = [to, from]
		}
		console.log("selection", selection)

		lines.forEach((textLine, i) => {
			console.log("textLine", textLine)
			const fromCharPosition = (i === 0) ? from.ch : 0; // Определение fromCharPosition
			const toCharPosition = (i === lines.length - 1) ? to.ch : textLine.length - 1; // Определение toCharPosition

			console.log("char s", fromCharPosition, toCharPosition)

			// проблема п=ного выделения строки позхиция head идет на следующую строку и ch:-1, делаеем затыску , да при ээтом подает markerAction
			if (fromCharPosition === 0 && toCharPosition === -1) {
				return
			}

			const newLine = this.markerMarkerAction(markerAction, textLine, fromCharPosition, toCharPosition); // Вызов функции
			result.push(newLine)
		})

		return result
	}

	findDotPosition(line: string): number {
		const dotIndex = line.indexOf('.');
		const fQuestion = line.indexOf('?');
		const firstDot = Math.min(
			dotIndex === -1 ? Number.MAX_VALUE : dotIndex,
			fQuestion === -1 ? Number.MAX_VALUE : fQuestion
		);

		// Проверка на нумерованный список: строка начинается с числа и точки (например, "1. ", "10. ")
		const numberedListMatch = line.match(/^(\d+)\.\s?/);

		if (numberedListMatch) {
			// Найдём вторую точку после первой
			const secondDot = line.indexOf('.', firstDot + 1);
			return secondDot !== -1 ? secondDot : -1;
		} else {
			// Вернуть первую точку, если она есть
			return firstDot !== -1 ? firstDot : -1;
		}
	}
	getSmartSelection(textLine: string, cursorPosition: number): { from: number, to: number } {
		const firstFindChar = textLine.search(/^(\*\s+|▶|●|♦|-|\d+\.\s+)/)
		const firstSpace = textLine.indexOf(" ")
		const firstDot = this.findDotPosition(textLine)
		const colonos = textLine.indexOf(":")
		const textLineLength = textLine.length
		console.log("getMarkerPosition", firstFindChar)
		// tckb
		if (firstFindChar == 0) {

			console.log("firsFindDot", { firstDot, colonos, cursorPosition })
			if (
				firstDot == -1 && colonos > -1 && cursorPosition <= colonos
				|| firstDot > -1 && colonos < firstDot && cursorPosition <= colonos) {
				console.log("test")
				return { from: firstSpace + 1, to: colonos - 1 }
			}
			else if (firstDot === -1 || colonos === -1) {
				return { from: firstSpace + 1, to: textLineLength }
			}
		}
		else {
			// заголовк :

			const block = textLine.search(/^([\w\d ]+):/)
			if (block === 0) {
				const position = textLine.indexOf(":")
				if (cursorPosition <= position) return { from: 0, to: position - 1 }
			}
		}

		return { from: cursorPosition, to: cursorPosition }
	}

	getMarkerPosition(textLine: string, cursorPosition: number): { from: number, to: number } {
		const parser = new ParserMarkdown();

		const chainsText = parser.parseLine(textLine, cursorPosition);
		const formaterCommanger = new FormaterCommanger()
		const fromChain = formaterCommanger.getChainByPosition(chainsText, cursorPosition)

		if (fromChain?.type == 'text') {
			// умное выделение
			// если это елемент списка начало 1. что-то :

			const smartSelection = this.getSmartSelection(textLine, cursorPosition)
			if (smartSelection.from != smartSelection.to) {
				return smartSelection
			}
		}
		if (fromChain?.isOpenMarker()) {
			const closeChain = formaterCommanger.findMarkerCloseAfter(fromChain.markerAction, fromChain, chainsText)
			if (closeChain) {
				if (fromChain.to + 1 == closeChain.from) {
					return { from: fromChain.from, to: closeChain.to }
				}
				else {
					return { from: fromChain.to + 1, to: closeChain.from - 1 }
				}
			}
		} else if (fromChain?.isCloseMarker()) {
			const openChain = formaterCommanger.findMarkerOpenBefore(fromChain.markerAction, fromChain, chainsText)
			if (openChain) {
				if (fromChain.from - 1 == openChain.to) {
					return { from: openChain.from, to: fromChain.to }
				}
				else {
					return { from: openChain.to + 1, to: fromChain.from - 1 }
				}
			}
		} else if (fromChain?.type == 'text' && fromChain.isTextMarker()) {
			return { from: fromChain.from, to: fromChain.to }
		}
		return { from: cursorPosition, to: cursorPosition }

	}
	makerClearOne(chain: TextChain, chains: TextChain[]) {

		const parser = new ParserMarkdown();

		let fromChain = chain
		if (fromChain?.isOpenMarker()) {
			const closeChain = this.findTextMarkerAfter(fromChain, chains)
			if (closeChain) {
				fromChain = closeChain
			}
		}
		else if (fromChain?.isCloseMarker()) {
			const openChain = this.findTextMarkerBefore(fromChain, chains)
			if (openChain) {
				fromChain = openChain
			}
		}

		if (fromChain !== undefined && fromChain.type == 'text' && fromChain.isTextMarker()) {
			this.getAll().forEach(markerAction => {
				this.clearMarkerAction(chains, fromChain!, markerAction.markerAction)
			})
		}
		/*
		else if (fromChain !== undefined && fromChain.type == 'text' && !fromChain.isTextMarker()) {
			chains.forEach(chain => {
				if (chain.type == 'text' && chain.isTextMarker()) {
					this.getAll().forEach(markerAction => {
						this.clearMarkerAction(chains, chain, markerAction.markerAction)
					})
				}
			})
		}
			*/
	}
	makerClear(textLine: string, cursorPosition: number, toCharPosition?: number): LineTextResult {

		const parser = new ParserMarkdown();
		const chains = parser.parseLine(textLine, cursorPosition, toCharPosition);

		const fromChain = parser.getTextChain(chains, cursorPosition)
		const toChain = parser.getTextChain(chains, toCharPosition !== undefined ? toCharPosition : cursorPosition)


		if (fromChain !== undefined && toChain !== undefined && fromChain == toChain && fromChain.isTextMarker()) {
			this.makerClearOne(fromChain, chains)
		}
		else if (fromChain !== undefined && toChain !== undefined && fromChain == toChain && !fromChain.isTextMarker() && fromChain.type == 'text') {
			const fromIndex = 0
			const toIndex = chains.length - 1
			for (let i = fromIndex; i <= toIndex; i++) {
				this.makerClearOne(chains[i], chains)
			}
		}
		else if (fromChain !== undefined && toChain !== undefined && fromChain !== toChain) {
			const fromIndex = chains.indexOf(fromChain)
			const toIndex = chains.indexOf(toChain)
			for (let i = fromIndex; i <= toIndex; i++) {
				this.makerClearOne(chains[i], chains)
			}
		}
		if (fromChain !== undefined && toChain !== undefined && fromChain == toChain && (fromChain.isOpenMarker() || fromChain.isCloseMarker())) {
			this.makerClearOne(fromChain, chains)
		}
		const lineText = this.optimizeChain(chains)
		return {
			lineText: lineText,
			fromSelectPosition: 0,
			toSelectPosition: 0
		}
	}


	private sliceTextChain(textChain: TextChain, position: number, textChaininsert: TextChain): TextChain[] {

		const leftContext = textChain.content.slice(0, position)
		const rightContext = textChain.content.slice(position)
		const leftRight = textChain.from + leftContext.length - 1

		const rightLeft = textChain.from + leftContext.length

		let leftSelectPosition: number | undefined
		if (textChain.fromSelectedPosition !== undefined && textChain.fromSelectedPosition < leftContext.length) {
			leftSelectPosition = textChain.fromSelectedPosition
		}

		let rightSelectPosition: number | undefined
		if (textChain.toSelectedPosition !== undefined && textChain.toSelectedPosition >= leftContext.length) {
			rightSelectPosition = textChain.toSelectedPosition - leftContext.length
		}

		const leftChain = new TextChain('text', textChain.from, leftRight, leftContext)
		const rightChain = new TextChain('text', rightLeft, textChain.to, rightContext)

		const result = []

		if (leftContext.length > 0) result.push(leftChain)
		result.push(textChaininsert)
		if (rightContext.length > 0) result.push(rightChain)

		return result
	}

	private instertTextChain(textChains: TextChain[], markerAction: MarkerAction, textChain: TextChain, position: number) {
		const [openTag, closeTag] = this.getTags(markerAction);

		const parser = new ParserMarkdown();
		const currentTextChain = parser.getTextChain(textChains, position)

		if (!currentTextChain) return textChains

		position = position - currentTextChain.from
		const currentIndex = textChains.indexOf(currentTextChain)

		if (textChain.type == openTag) {
			if (currentTextChain.type == "text") {

				const content = currentTextChain.content
				while (content.charAt(position) == " ") { position++; }
				const textChainsNew = this.sliceTextChain(currentTextChain, position, textChain)
				textChains.splice(currentIndex, 1, ...textChainsNew)

			} else {
				textChains.splice(currentIndex, 0, textChain)
			}
		}
		else if (textChain.type == closeTag) {
			if (currentTextChain.type == "text") {

				const content = currentTextChain.content
				while (content.charAt(position) == " ") { position--; }
				const textChainsNew = this.sliceTextChain(currentTextChain, position + 1, textChain)
				textChains.splice(currentIndex, 1, ...textChainsNew)
			} else {
				textChains.splice(currentIndex + 1, 0, textChain)
			}
		}
	}

	getTags(markerAction: MarkerAction): MarkerType[] {
		if (markerAction == 'bold') return ['bold_open', 'bold_close']
		if (markerAction == 'highlight') return ['highlight_open', 'highlight_close']
		if (markerAction == 'italic') return ['italic_open', 'italic_close']
		if (markerAction == 'strikethrough') return ['strikethrough_open', 'strikethrough_close']
		if (markerAction == 'code') return ['code_open', 'code_close']
		if (markerAction == 'comment') return ['comment_open', 'comment_close']
		return []
	}
	private createOpenTag(markerAction: MarkerAction, isNew = false): TextChain {
		const [openTag, closeTag] = this.getTags(markerAction);
		return new TextChain(openTag, -1, -1, undefined, isNew)
	}

	private createCloseTag(markerAction: MarkerAction, isNew = false): TextChain {
		const [openTag, closeTag] = this.getTags(markerAction);
		return new TextChain(closeTag, -1, -1, undefined, isNew)
	}

	getIsFlagByMarkerAction(markerAction: MarkerAction, chain: TextChain): boolean {
		if (markerAction == 'bold') return chain.isBold
		if (markerAction == 'italic') return chain.isItalic
		if (markerAction == 'highlight') return chain.isHighlight
		if (markerAction == 'strikethrough') return chain.isStrikethrough
		if (markerAction == 'code') return chain.isCode
		if (markerAction == 'comment') return chain.isComment

		return false
	}

	setFlagByMarkerAction(markerAction: MarkerAction, chain: TextChain, value: boolean): void {
		if (markerAction == 'bold') chain.isBold = value
		if (markerAction == 'italic') chain.isItalic = value
		if (markerAction == 'highlight') chain.isHighlight = value
		if (markerAction == 'strikethrough') chain.isStrikethrough = value
		if (markerAction == 'code') chain.isCode = value
		if (markerAction == 'comment') chain.isComment = value
	}
	isTogher(firstChain: TextChain, secondChain: TextChain, chainsText: TextChain[]): boolean {

		const fromIndex = chainsText.indexOf(firstChain)
		const toIndex = chainsText.indexOf(secondChain)
		return Math.abs(toIndex - fromIndex) == 1

	}

	markerMarkerAction(markerAction: MarkerAction, textLine: string, fromCharPosition: number, toCharPosition?: number): LineTextResult {

		const parser = new ParserMarkdown();
		const chainsText = parser.parseLine(textLine, fromCharPosition, toCharPosition);

		const clearPositionFrom = parser.getClearPosition(fromCharPosition, markerAction, chainsText)

		const fromChainPosition = parser.getTextChain(chainsText, fromCharPosition)

		const [openTag, closeTag] = this.getTags(markerAction);
		let clearPositionTo: number | undefined

		if (fromChainPosition !== undefined) {

			// выделение текста блок
			if (fromCharPosition !== undefined && toCharPosition !== undefined) {

				const toChainPosition = parser.getTextChain(chainsText, toCharPosition)
				console.log("dde", toChainPosition, chainsText, toCharPosition)
				if (toChainPosition === undefined) throw new Error("ddeieie")

				const isFlagFrom = this.getIsFlagByMarkerAction(markerAction, fromChainPosition);

				clearPositionTo = parser.getClearPosition(toCharPosition, markerAction, chainsText);
				const isFlagTo = this.getIsFlagByMarkerAction(markerAction, toChainPosition)

				const markerOpen = this.createOpenTag(markerAction, true)
				const markerClose = this.createCloseTag(markerAction, true)

				if (fromChainPosition == toChainPosition && toChainPosition !== undefined) {
					if (isFlagFrom) {
						this.instertTextChain(chainsText, markerAction, markerClose, fromCharPosition - 1)
						this.instertTextChain(chainsText, markerAction, markerOpen, toCharPosition + 1)
					} else {
						this.instertTextChain(chainsText, markerAction, markerOpen, fromCharPosition)
						this.instertTextChain(chainsText, markerAction, markerClose, toCharPosition)
					}
				}
				else if (toChainPosition !== undefined) {
					// отфильтровать chainsText между fromChainPosition и toChainPosition
					if (isFlagFrom && isFlagTo && toChainPosition !== undefined) {
						if (this.isTogher(fromChainPosition, toChainPosition, chainsText)) {

							if (fromChainPosition.isOpenMarker() && toChainPosition.type == 'text') {

								fromChainPosition.isDelete = true
								this.instertTextChain(chainsText, markerAction, markerOpen, toCharPosition + 1)

							} else if (fromChainPosition.type == 'text' && toChainPosition.isOpenMarker()) {

								toChainPosition.isDelete = true
								this.instertTextChain(chainsText, markerAction, markerClose, fromCharPosition)
							}
							else if (fromChainPosition.type == 'text' && toChainPosition.isCloseMarker()) {

								toChainPosition.isDelete = true
								this.instertTextChain(chainsText, markerAction, markerClose, fromCharPosition)
							}
						} else {
							this.clearByMarkerAction(chainsText, fromChainPosition, toChainPosition, markerAction)
						}
					}
					else if (!isFlagFrom && !isFlagTo) {
						this.instertTextChain(chainsText, markerAction, markerOpen, fromCharPosition)
						this.instertTextChain(chainsText, markerAction, markerClose, toCharPosition)
					}
					else if (isFlagFrom && !isFlagTo) {
						this.instertTextChain(chainsText, markerAction, markerClose, toCharPosition)
						this.clearMarkerRight(chainsText, fromChainPosition, markerClose, markerAction)
					}
					else if (!isFlagFrom && isFlagTo) {
						this.instertTextChain(chainsText, markerAction, markerOpen, fromCharPosition)
						this.clearMarkerLeft(chainsText, markerOpen, toChainPosition, markerAction)
					}
				}
			}
			// просто курсор без выделения 
			else if (fromCharPosition !== undefined && toCharPosition == undefined) {

				const spaceChars = [' ', '\n', '\t']
				if (spaceChars.includes(textLine.charAt(fromCharPosition)) && toCharPosition == undefined) return { fromSelectPosition: fromCharPosition, toSelectPosition: fromCharPosition, lineText: textLine }

				const isFlag = this.getIsFlagByMarkerAction(markerAction, fromChainPosition)
				if (isFlag) {
					this.clearMarkerAction(chainsText, fromChainPosition, markerAction)
				}
				else if (fromChainPosition.type == 'text') {
					const index = chainsText.indexOf(fromChainPosition);

					const content = fromChainPosition.content;
					const parts = content.split(" ");
					parts.map(part => { if (part == "") part = " " })
					let cursor = fromChainPosition.from;

					for (let i = 0; i < parts.length; i++) {
						const beginPart = cursor
						const endPart = cursor + parts[i].length - 1
						if (fromCharPosition >= beginPart && fromCharPosition <= endPart) {

							const boldOpen = this.createOpenTag(markerAction, true)
							const boldClose = this.createCloseTag(markerAction, true)
							this.instertTextChain(chainsText, markerAction, boldOpen, beginPart)
							this.instertTextChain(chainsText, markerAction, boldClose, endPart)
							break;
						}
						cursor += parts[i].length + 1;
					}
				}
			}
		}

		const lineText = this.optimizeChain(chainsText)

		let fromPositionCursor = 0
		if (fromCharPosition !== undefined) {
			let offset = 0
			for (let i = 0; i < chainsText.length; i++) {
				const chain = chainsText[i]
				if (chain.isNew) {
					offset = offset + chain.content.length
				}
				if (chain.isDelete) {
					offset = offset - chain.content.length
					continue
				}
				if (chain.from <= fromCharPosition + offset && fromCharPosition + offset <= chain.to) {
					fromPositionCursor = fromCharPosition + offset
					if (chain.type == openTag) fromPositionCursor = chain.to + 1
					if (chain.type == closeTag) fromPositionCursor = chain.from - 1
					break
				}
			}
		}

		let toPositionCursor = 0
		if (toCharPosition !== undefined) {
			let offset = 0
			for (let i = 0; i < chainsText.length; i++) {
				const chain = chainsText[i]
				if (chain.isNew) {
					offset = offset - chain.content.length
				}
				if (chain.isDelete) {
					offset = offset + chain.content.length
					continue
				}
				if (chain.from <= toCharPosition + offset && toCharPosition + offset <= chain.to) {
					toPositionCursor = toCharPosition - offset - 1
					if (chain.type == openTag) toPositionCursor = chain.to + 1
					if (chain.type == closeTag) toPositionCursor = chain.from - 1
					break
				}
			}
		}
		return { fromSelectPosition: fromPositionCursor, toSelectPosition: toPositionCursor, lineText: lineText }
	}

	markerBold(textLine: string, fromCharPosition: number, toCharPosition?: number): LineTextResult {
		return this.markerMarkerAction('bold', textLine, fromCharPosition, toCharPosition)
	}
	markerItalic(textLine: string, fromCharPosition: number, toCharPosition?: number): LineTextResult {
		return this.markerMarkerAction('italic', textLine, fromCharPosition, toCharPosition)
	}

	markerStrikethrough(textLine: string, fromCharPosition: number, toCharPosition?: number): LineTextResult {
		return this.markerMarkerAction('strikethrough', textLine, fromCharPosition, toCharPosition)
	}
	private deleteChain(chainsText: TextChain[], from: TextChain, to: TextChain) {
		const fromIndex = chainsText.indexOf(from)
		const toIndex = chainsText.indexOf(to)
		chainsText.splice(fromIndex + 1, toIndex - fromIndex - 1).forEach(chain => {
			if (chain.type != 'text') chain.isDelete = true
		})
	}


	private clearByMarkerAction(chainsText: TextChain[], from: TextChain, to: TextChain, markerAction: MarkerAction) {
		const fromIndex = chainsText.indexOf(from)
		const toIndex = chainsText.indexOf(to)
		const [openTag, closeTag] = this.getTags(markerAction);

		for (let i = fromIndex; i <= toIndex; i++) {
			if (chainsText[i].type == openTag || chainsText[i].type == closeTag) {
				this.setFlagByMarkerAction(markerAction, chainsText[i], true)
				chainsText[i].isDelete = true
			}
			if (chainsText[i].type == 'text') this.setFlagByMarkerAction(markerAction, chainsText[i], true)
		}
	}
	private clearMarkerRight(chainsText: TextChain[], from: TextChain, to: TextChain, markerAction: MarkerAction) {
		const [openTag, closeTag] = this.getTags(markerAction);
		const fromIndex = chainsText.indexOf(from)
		const toIndex = chainsText.indexOf(to)
		for (let i = fromIndex + 1; i < toIndex; i++) {
			if (chainsText[i].type == openTag || chainsText[i].type == closeTag) {
				chainsText[i].isDelete = true
				this.setFlagByMarkerAction(markerAction, chainsText[i], false)
			}
			if (chainsText[i].type != 'text') this.setFlagByMarkerAction(markerAction, chainsText[i], false)
		}
	}

	private clearMarkerLeft(chainsText: TextChain[], from: TextChain, to: TextChain, markerAction: MarkerAction) {
		const [openTag, closeTag] = this.getTags(markerAction);
		const fromIndex = chainsText.indexOf(from)
		const toIndex = chainsText.indexOf(to)
		for (let i = fromIndex + 1; i < toIndex; i++) {
			if (chainsText[i].type == openTag || chainsText[i].type == closeTag) {
				this.setFlagByMarkerAction(markerAction, chainsText[i], false)
				chainsText[i].isDelete = true
			}
			if (chainsText[i].type == 'text') this.setFlagByMarkerAction(markerAction, chainsText[i], false)
		}
	}


	private clearMarkerAction(chainsText: TextChain[], currentChain: TextChain, markerAction: MarkerAction) {
		const [openTag, closeTag] = this.getTags(markerAction);

		const fromIndex = chainsText.indexOf(currentChain)
		// нужно от fromIndex пройти в лево и право по моссиву и если блок isbold, то снять его, если это тип bold_open или bold_close, то isDelete = true, как только блок не isbold, то остановиться
		let leftIndex = fromIndex
		let rightIndex = fromIndex
		const _self = this;

		function clearLeft(chainsText: TextChain[], fromIndex: number) {
			for (let i = fromIndex; i >= 0; i--) {

				const isFlag = _self.getIsFlagByMarkerAction(markerAction, chainsText[i])
				if (isFlag) { leftIndex = i }
				else { break }
			}
		}


		function clearRight(chainsText: TextChain[], fromIndex: number) {
			for (let i = fromIndex; i < chainsText.length; i++) {
				const isFlag = _self.getIsFlagByMarkerAction(markerAction, chainsText[i])
				if (isFlag) { rightIndex = i }
				else { break }
			}
		}

		function markMarkerAction(chainsText: TextChain[], fromIndex: number, toIndex: number) {

			for (let i = fromIndex; i <= toIndex; i++) {
				const isFlag = _self.getIsFlagByMarkerAction(markerAction, chainsText[i])
				if (isFlag && chainsText[i].type == 'text') {
					_self.setFlagByMarkerAction(markerAction, chainsText[i], false)
				}
				else if (isFlag && (chainsText[i].type == openTag || chainsText[i].type == closeTag)) {
					chainsText[i].isDelete = true
					_self.setFlagByMarkerAction(markerAction, chainsText[i], false)
				}
			}
		}

		if (currentChain.type == 'text') {
			clearLeft(chainsText, fromIndex)
			clearRight(chainsText, fromIndex)
			markMarkerAction(chainsText, leftIndex, rightIndex)
		} else if (currentChain.type == openTag) {
			clearRight(chainsText, fromIndex)
			markMarkerAction(chainsText, leftIndex, rightIndex)
		} else if (currentChain.type == closeTag) {
			clearLeft(chainsText, fromIndex)
			markMarkerAction(chainsText, leftIndex, rightIndex)
		}
	}

	private getLineText(chainsText: TextChain[]): string {
		return chainsText.reduce((acc, textChain) => {
			if (textChain.isDelete) return acc
			return acc + textChain.content
		}, "");
	}
	private recalcFromTo(chainsText: TextChain[]) {
		let from = 0
		chainsText.forEach(chain => {
			if (chain.isDelete) return
			chain.from = from
			from = from + chain.content.length
			chain.to = from - 1
		})
	}

	private optimizeChain(chainsText: TextChain[]): string {
		this.recalcFromTo(chainsText)
		const markers = this.getAll()
		markers.forEach(marker => {
			const markerOpen = marker.openToken
			const markerClose = marker.closeToken
			const markerAction = marker.markerAction

			if (chainsText.length > 1) {
				for (let i = 0; i < chainsText.length - 1; i++) {
					const currentChain = chainsText[i];
					const nextChain = chainsText[i + 1];
					if (currentChain.type == markerClose.type && nextChain.type == markerOpen.type
						|| currentChain.type == markerOpen.type && nextChain.type == markerClose.type
					) {
						currentChain.isDelete = true
						nextChain.isDelete = true
					}
				}
			}

			let count = 0
			chainsText.forEach(chain => {
				const chainIsOpenMarker = chain.isOpenMarker() && !chain.isDelete && chain.markerAction == markerAction

				if (chain.isCloseMarker() && chain.markerAction == markerAction
				) count = 0

				if (chainIsOpenMarker && count == 1 && chain.markerAction == markerAction
				) {
					chain.isDelete = true
				} else if (chainIsOpenMarker && count == 0 && chain.markerAction == markerAction
				) {
					count = 1
				}

			})

			count = 0
			for (let i = chainsText.length - 1; i >= 0; i--) {
				const current = chainsText[i]
				if (current.isOpenMarker() && current.markerAction == markerAction
				) count = 0

				const chainIsCloseMarker = current.isCloseMarker() && !current.isDelete && current.markerAction == markerAction
				if (chainIsCloseMarker && count == 1 && current.markerAction == markerAction) {
					current.isDelete = true
				} else if (chainIsCloseMarker && count == 0 && current.markerAction == markerAction) {
					count = 1
				}
			}

			const lineText = this.getLineText(chainsText)
			const parser = new ParserMarkdown();
			const chainsTextNew = parser.parseLine(lineText);

			if (chainsTextNew.length > 1) {
				for (let i = 0; i < chainsText.length - 1; i++) {
					const currentChain = chainsTextNew[i];
					const nextChain = chainsTextNew[i + 1];
					if (currentChain && nextChain && currentChain.type == markerClose.type && nextChain.type == markerOpen.type) {
						this.removeChain(chainsTextNew, currentChain)
						this.removeChain(chainsTextNew, nextChain)
					}
				}
			}
			chainsText = chainsTextNew
		})
		return this.getLineText(chainsText)
	}

	private removeChain(chainsText: TextChain[], textChain: TextChain) {
		const index = chainsText.indexOf(textChain);
		if (index !== -1) {
			chainsText.splice(index, 1);
		}
	}


	findBoldCloseAfter(textChain: TextChain, chainsText: TextChain[]): TextChain | null {
		return this.findMarkerCloseAfter('bold', textChain, chainsText)
	}

	findMarkerCloseAfter(markerAction: MarkerAction, textChain: TextChain, chainsText: TextChain[]): TextChain | null {
		const markerClose = this.createCloseTag(markerAction, false)
		const startIndex = chainsText.indexOf(textChain);
		if (startIndex === -1) return null;

		for (let i = startIndex + 1; i < chainsText.length; i++) {
			if (chainsText[i].type === markerClose.type) {
				return chainsText[i];
			}
		}
		return null;
	}

	findBoldOpenBefore(textChain: TextChain, chainsText: TextChain[]): TextChain | null {
		return this.findMarkerOpenBefore('bold', textChain, chainsText)
	}

	getNextChain(textChain: TextChain, chainsText: TextChain[]): TextChain | undefined {
		const startIndex = chainsText.indexOf(textChain);
		if (startIndex === -1 || startIndex < chainsText.length - 1) return undefined;

		return chainsText[startIndex + 1];
	}

	getNextChainByTypeAndPositionAndMarkered(position: number, type: MarkerType, chainsText: TextChain[]): TextChain | undefined {
		const startIndex = chainsText.find(chain => (position < chain.from) && chain.type == type && chain.isTextMarker())

		return startIndex ?? undefined
	}

	getPreviousChainByTypeAndPositionAndMarkered(position: number, type: MarkerType, chainsText: TextChain[]): TextChain | undefined {
		let result: TextChain | undefined = undefined;

		for (const chain of chainsText) {
			if ((position > chain.to) && chain.type === type && chain.isTextMarker()) {
				result = chain;
			}
		}

		return result;
	}

	getChainByPosition(chainsText: TextChain[], position: number): TextChain | undefined {
		const startIndex = chainsText.findIndex(chain => chain.from <= position && position <= chain.to);
		if (startIndex === -1) return undefined;

		return chainsText[startIndex];
	}


	getPrevChain(textChain: TextChain, chainsText: TextChain[]): TextChain | undefined {
		const startIndex = chainsText.indexOf(textChain);
		if (startIndex === 1 || startIndex == 0) return undefined;

		return chainsText[startIndex - 1];
	}

	findMarkerOpenBefore(markerAction: MarkerAction, textChain: TextChain, chainsText: TextChain[]): TextChain | null {

		const markerOpen = this.createOpenTag(markerAction, false)
		const startIndex = chainsText.indexOf(textChain);
		if (startIndex === -1) return null;

		for (let i = startIndex; i >= 0; i--) {
			if (chainsText[i].type === markerOpen.type) {
				return chainsText[i];
			}
		}
		return null;
	}
	findTextMarkerBefore(textChain: TextChain, chainsText: TextChain[]): TextChain | undefined {

		const startIndex = chainsText.indexOf(textChain);
		if (startIndex === -1) return undefined;

		for (let i = startIndex; i >= 0; i--) {
			if (chainsText[i].type === 'text') {
				return chainsText[i];
			}
		}
		return undefined;
	}
	findTextMarkerAfter(textChain: TextChain, chainsText: TextChain[]): TextChain | undefined {

		const startIndex = chainsText.indexOf(textChain);
		if (startIndex === -1) return undefined;

		for (let i = startIndex; i < chainsText.length; i++) {
			if (chainsText[i].type === 'text') {
				return chainsText[i];
			}
		}
		return undefined;
	}
}

