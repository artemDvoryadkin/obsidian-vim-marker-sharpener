import { TextChain, MarkerType, FormaterCommanger, MarkerAction } from './FormaterHelper';

export class ParserMarkdown {

	getTextChain(textChains: TextChain[], cursorPosition: number): TextChain | undefined {

		return textChains.find(textChain => textChain.from <= cursorPosition && textChain.to >= cursorPosition);
	}
	getTextChains(textChains: TextChain[], from: number, to: number): TextChain[] | undefined {

		return textChains.filter(textChain =>
			textChain.from <= from && textChain.to >= from
			|| textChain.from <= to && textChain.to >= to
		);
	}
	getClearPosition(position: number, chainsText: TextChain[]): number {
		let clearPosition = -1
		let currentPosition = -1

		for (let i = 0; i < chainsText.length; i++) {
			const textChain = chainsText[i]

			let isSkip = false
			if (textChain.type == 'bold_open' || textChain.type == 'bold_close') isSkip = true

			for (let i = 0; i < textChain.content!.length; i++) {
				currentPosition++
				if (!isSkip) clearPosition++
				if (currentPosition == position) return clearPosition
			}
		}

		return clearPosition
	}

	getPositionByClearPosition(clearPosition: number, chainsText: TextChain[]): number {
		let currentPosition = -1
		let currentClearPosition = -1

		for (let i = 0; i < chainsText.length; i++) {
			const textChain = chainsText[i]

			let isSkip = false
			if (textChain.isDelete) continue
			if (textChain.type == 'bold_open' || textChain.type == 'bold_close') isSkip = true

			for (let i = 0; i < textChain.content!.length; i++) {
				currentPosition++
				if (!isSkip) currentClearPosition++
				if (currentClearPosition == clearPosition) {
					return currentPosition
				}
			}
		}

		return currentPosition
	}

	parseLine(line: string, fromSelectPosition?: number, toSelectPosition?: number): TextChain[] {
		const result: TextChain[] = [];
		const formaterCommanger = new FormaterCommanger()
		const allMarkers = formaterCommanger.getAll()

		let currentIndex = 0;
		let startSearchPosition = 0;

		let foundOpenMarker = false
		const openMarker = new Map<MarkerAction, boolean>();


		while (currentIndex < line.length) {

			allMarkers.forEach(marker => {
				const { openToken, closeToken } = marker
				if (!openToken || !closeToken) throw new Error('Source tokens for bold not found')

				const content = openToken.content!
				const contentLength = content.length
				const markers = [content];

				foundOpenMarker = openMarker.has(marker.markerAction) ? openMarker.get(marker.markerAction)! : false

				if (line.startsWith(content, currentIndex)) {
					if (foundOpenMarker) {
						if (
							currentIndex + contentLength == line.length ||
							line[currentIndex - 1] != ' ') {

							const closeTokenChain = new TextChain(closeToken.type as MarkerType, currentIndex, currentIndex + 1, closeToken.content);

							if (currentIndex != 0 && startSearchPosition != currentIndex) {
								const text = line.substring(startSearchPosition, currentIndex);
								const textChain = new TextChain('text', startSearchPosition, currentIndex - 1, text);

								result.push(textChain)
							}

							result.push(closeTokenChain);

							startSearchPosition = currentIndex + contentLength
							currentIndex++;

							//foundOpenMarker = false;
							openMarker.set(marker.markerAction, false)
						}
					}
					else if (line[currentIndex + contentLength] != ' ' && currentIndex + contentLength < line.length) {
						//foundOpenMarker = true;
						openMarker.set(marker.markerAction, true)

						if (currentIndex != 0 && startSearchPosition != currentIndex) {
							const text = line.substring(startSearchPosition, currentIndex);
							const textChain = new TextChain('text', startSearchPosition, currentIndex - 1, text);

							result.push(textChain)
						}

						const textChain = new TextChain(openToken.type as MarkerType, currentIndex, currentIndex + 1, openToken.content);
						result.push(textChain);

						startSearchPosition = currentIndex + contentLength;
						currentIndex++;

						//foundOpenMarker = true;
						openMarker.set(marker.markerAction, true)

					}
				}
				//}
			})
			if (currentIndex == line.length - 1) {
				const text = line.substring(startSearchPosition);
				const textChain = new TextChain('text', startSearchPosition, currentIndex, text);
				result.push(textChain)
			}
			currentIndex++;
		}
		// если блок block_open и следующий текстто нужно добавить в блок текста что он isBold
		this.markeredTokens(result, 'bold')
		this.markeredTokens(result, 'italic')
		this.markeredTokens(result, 'highlight')
		this.markeredTokens(result, 'strikethrough')
		this.markeredTokens(result, 'code')

		for (let i = 0; i < result.length; i++) {
			const currentChain = result[i]
			if (fromSelectPosition !== undefined
				&& currentChain.from <= fromSelectPosition && currentChain.to >= fromSelectPosition) {
				currentChain.fromSelectedPosition = fromSelectPosition - currentChain.from
			}
			if (toSelectPosition !== undefined && currentChain.from <= toSelectPosition && currentChain.to >= toSelectPosition) {
				currentChain.toSelectedPosition = toSelectPosition - currentChain.from
			}
		}


		return result;
	}
	private markeredTokens(tokens: TextChain[], markerAction: MarkerAction) {

		const formaterCommanger = new FormaterCommanger()
		const { openToken, closeToken } = formaterCommanger.getSourceTokens(markerAction)

		let isOpenToken = false
		for (let i = 0; i < tokens.length - 1; i++) {
			const currentChain = tokens[i]
			if (currentChain.type == openToken.type) isOpenToken = true

			if (markerAction == 'bold') {
				currentChain.isBold = isOpenToken;
			}
			else if (markerAction == 'italic') {
				currentChain.isItalic = isOpenToken;
			}
			else if (markerAction == 'highlight') {
				currentChain.isHighlight = isOpenToken;
			}
			else if (markerAction == 'strikethrough') {
				currentChain.isStrikethrough = isOpenToken;
			}
			else if (markerAction == 'code') {
				currentChain.isCode = isOpenToken;
			}
			if (currentChain.type == closeToken.type) isOpenToken = false
		}
	}
}
