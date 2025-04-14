import { DefaultDeserializer } from 'v8';
import { ParserMarkdown } from './ParserMarkdown';
import { EditorSelection } from 'obsidian';

export type MarkerType = 'bold_open' | 'bold_close' | 'italic_open' | 'italic_close' | 'highlight_open' | 'highlight_close' | 'text' | 'strikethrough_open' | 'strikethrough_close' | 'code_open' | 'code_close';
export type MarkerAction = 'bold' | 'italic' | 'highlight' | 'strikethrough' | 'code'
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

	constructor(type: MarkerType, from: number = -1, to: number = -1, content?: string, isNew: boolean = false, fromSelectedPosition?: number, toSelectedPosition?: number) {
		this.content = content || ''

		if (type == 'bold_open') { this.isBold = true; this.content = '**' }
		if (type == 'bold_close') { this.isBold = false; this.content = '**' }
		if (type == 'italic_open') { this.isBold = false; this.content = '_' }
		if (type == 'italic_close') { this.isBold = false; this.content = '_' }
		if (type == 'highlight_open') { this.isBold = false; this.content = '==' }
		if (type == 'highlight_close') { this.isBold = false; this.content = '==' }
		if (type == 'strikethrough_open') { this.isBold = false; this.content = '~~' }
		if (type == 'strikethrough_close') { this.isBold = false; this.content = '~~' }
		if (type == 'code_open') { this.isBold = false; this.content = '`' }
		if (type == 'code_close') { this.isBold = false; this.content = '`' }

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
	}
	isOpenMarker(): boolean {
		return this.type == 'bold_open' || this.type == 'italic_open' || this.type == 'highlight_open' || this.type == 'strikethrough_open' || this.type == 'code_open'
	}
	isCloseMarker(): boolean {
		return this.type == 'bold_close' || this.type == 'italic_close' || this.type == 'highlight_close' || this.type == 'strikethrough_close' || this.type == 'code_close'
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
		this.sourceTokens.push({ type: 'italic_open', content: '_' })
		this.sourceTokens.push({ type: 'italic_close', content: '_' })
		this.sourceTokens.push({ type: 'highlight_open', content: '==' })
		this.sourceTokens.push({ type: 'highlight_close', content: '==' })
		this.sourceTokens.push({ type: 'strikethrough_open', content: '~~' })
		this.sourceTokens.push({ type: 'strikethrough_close', content: '~~' })
		this.sourceTokens.push({ type: 'code_open', content: '`' })
		this.sourceTokens.push({ type: 'code_close', content: '`' })
	}

	getSourceTokens(markerAction: MarkerAction): { openToken: Token, closeToken: Token } {
		const openToken = this.sourceTokens.find(token => token.type == markerAction + '_open')
		const closeToken = this.sourceTokens.find(token => token.type == markerAction + '_close')
		if (!openToken || !closeToken) throw new Error(`Source tokens for ${markerAction} not found`)
		return { openToken, closeToken }
	}

	getAll(): { openToken: Token, closeToken: Token, markerAction: MarkerAction }[] {
		const result: { openToken: Token, closeToken: Token, markerAction: MarkerAction }[] = []
		const markers: MarkerAction[] = ['bold', 'italic', 'highlight', 'strikethrough', 'code']

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

		lines.forEach((textLine, i) => {
			const fromCharPosition = (i === 0) ? from.ch : 0; // Определение fromCharPosition
			const toCharPosition = (i === lines.length - 1) ? to.ch : textLine.length - 1; // Определение toCharPosition
			const newLine = this.markerMarkerAction(markerAction, textLine, fromCharPosition, toCharPosition); // Вызов функции
			result.push(newLine)
		})

		return result
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

	private getTags(markerAction: MarkerAction): MarkerType[] {
		if (markerAction == 'bold') return ['bold_open', 'bold_close']
		if (markerAction == 'highlight') return ['highlight_open', 'highlight_close']
		if (markerAction == 'italic') return ['italic_open', 'italic_close']
		if (markerAction == 'strikethrough') return ['strikethrough_open', 'strikethrough_close']
		if (markerAction == 'code') return ['code_open', 'code_close']
		return []
	}
	private createOpenTag(markerAction: MarkerAction, isNew: boolean = false): TextChain {
		const [openTag, closeTag] = this.getTags(markerAction);
		return new TextChain(openTag, -1, -1, undefined, true)
	}

	private createCloseTag(markerAction: MarkerAction, isNew: boolean = false): TextChain {
		const [openTag, closeTag] = this.getTags(markerAction);
		return new TextChain(closeTag, -1, -1, undefined, true)
	}

	getIsFlagByMarkerAction(markerAction: MarkerAction, chain: TextChain): boolean {
		if (markerAction == 'bold') return chain.isBold
		if (markerAction == 'italic') return chain.isItalic
		if (markerAction == 'highlight') return chain.isHighlight
		if (markerAction == 'strikethrough') return chain.isStrikethrough
		if (markerAction == 'code') return chain.isCode
		return false
	}

	setFlagByMarkerAction(markerAction: MarkerAction, chain: TextChain, value: boolean): void {
		if (markerAction == 'bold') chain.isBold = value
		if (markerAction == 'italic') chain.isItalic = value
		if (markerAction == 'highlight') chain.isHighlight = value
		if (markerAction == 'strikethrough') chain.isStrikethrough = value
		if (markerAction == 'code') chain.isCode = value
	}

	markerMarkerAction(markerAction: MarkerAction, textLine: string, fromCharPosition: number, toCharPosition?: number): LineTextResult {
		console.log("action:", markerAction, { textLine, fromCharPosition, toCharPosition })

		const parser = new ParserMarkdown();
		const chainsText = parser.parseLine(textLine, fromCharPosition, toCharPosition);

		const clearPositionFrom = parser.getClearPosition(fromCharPosition, chainsText)
		const fromChainPosition = parser.getTextChain(chainsText, fromCharPosition) as TextChain;

		const [openTag, closeTag] = this.getTags(markerAction);
		let clearPositionTo: number | undefined

		if (fromChainPosition) {

			// выделение текста блок
			if (fromCharPosition !== undefined && toCharPosition !== undefined) {
				const toChainPosition = parser.getTextChain(chainsText, toCharPosition) as TextChain;
				clearPositionTo = parser.getClearPosition(toCharPosition, chainsText)

				const isFlagFrom = this.getIsFlagByMarkerAction(markerAction, fromChainPosition)
				const isFlagTo = this.getIsFlagByMarkerAction(markerAction, toChainPosition)

				const markerOpen = this.createOpenTag(markerAction, true)
				const markerClose = this.createCloseTag(markerAction, true)

				if (fromChainPosition == toChainPosition) {
					if (isFlagFrom) {
						this.instertTextChain(chainsText, markerAction, markerClose, fromCharPosition - 1)
						this.instertTextChain(chainsText, markerAction, markerOpen, toCharPosition + 1)
					} else {
						this.instertTextChain(chainsText, markerAction, markerOpen, fromCharPosition)
						this.instertTextChain(chainsText, markerAction, markerClose, toCharPosition)
					}
				}
				else {
					// отфильтровать chainsText между fromChainPosition и toChainPosition
					if (isFlagFrom && isFlagTo) {
						this.clearByMarkerAction(chainsText, fromChainPosition, toChainPosition, markerAction)
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

				if (fromChainPosition.isBold) {
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
						const endPart = cursor + parts[i].length
						if (fromCharPosition >= beginPart && fromCharPosition <= endPart) {

							const boldOpen = this.createOpenTag(markerAction, true)
							const boldClose = this.createCloseTag(markerAction, true)
							this.instertTextChain(chainsText, markerAction, boldOpen, beginPart)
							this.instertTextChain(chainsText, markerAction, boldClose, endPart)
							break;
						}
						cursor += parts[i].length;
					}
				}
			}
		}
		console.log("chainsText", chainsText)

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
		const self = this;

		function clearLeft(chainsText: TextChain[], fromIndex: number) {
			for (let i = fromIndex; i >= 0; i--) {

				const isFlag = self.getIsFlagByMarkerAction(markerAction, chainsText[i])
				if (isFlag) { leftIndex = i }
				else { break }
			}
		}


		function clearRight(chainsText: TextChain[], fromIndex: number) {
			for (let i = fromIndex; i < chainsText.length; i++) {
				const isFlag = self.getIsFlagByMarkerAction(markerAction, chainsText[i])
				if (isFlag) { rightIndex = i }
				else { break }
			}
		}

		function markBold(chainsText: TextChain[], fromIndex: number, toIndex: number) {

			for (let i = fromIndex; i <= toIndex; i++) {
				const isFlag = self.getIsFlagByMarkerAction(markerAction, chainsText[i])
				if (isFlag && chainsText[i].type == 'text') {
					self.setFlagByMarkerAction(markerAction, chainsText[i], false)
				}
				else if (isFlag && (chainsText[i].type == openTag || chainsText[i].type == closeTag)) {
					chainsText[i].isDelete = true
					self.setFlagByMarkerAction(markerAction, chainsText[i], false)
				}
			}
		}

		if (currentChain.type == 'text') {
			clearLeft(chainsText, fromIndex)
			clearRight(chainsText, fromIndex)
			markBold(chainsText, leftIndex, rightIndex)
		} else if (currentChain.type == openTag) {
			clearRight(chainsText, fromIndex)
			markBold(chainsText, leftIndex, rightIndex)
		} else if (currentChain.type == closeTag) {
			clearLeft(chainsText, fromIndex)
			markBold(chainsText, leftIndex, rightIndex)
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
				const chainIsOpenMarker = chain.type == markerOpen.type
				if (chain.type == markerClose.type) count = 0

				if (chainIsOpenMarker && count == 1) {
					chain.isDelete = true
				} else if (chainIsOpenMarker && count == 0) {
					count = 1
				}

			})

			count = 0
			for (let i = chainsText.length - 1; i >= 0; i--) {
				const chainIsCloseMarker = chainsText[i].type == markerClose.type

				if (chainsText[i].type == markerOpen.type) count = 0

				if (chainIsCloseMarker && count == 1) {
					chainsText[i].isDelete = true
				} else if (chainIsCloseMarker && count == 0) {
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
}

