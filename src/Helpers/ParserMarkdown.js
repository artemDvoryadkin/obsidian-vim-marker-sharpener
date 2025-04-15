import { TextChain, FormaterCommanger } from './FormaterHelper';
export class ParserMarkdown {
    getTextChain(textChains, cursorPosition) {
        return textChains.find(textChain => textChain.from <= cursorPosition && textChain.to >= cursorPosition);
    }
    getTextChains(textChains, from, to) {
        return textChains.filter(textChain => textChain.from <= from && textChain.to >= from
            || textChain.from <= to && textChain.to >= to);
    }
    getClearPosition(position, markerAction, chainsText) {
        let clearPosition = -1;
        let currentPosition = -1;
        const formaterCommanger = new FormaterCommanger();
        const [openTag, closeTag] = formaterCommanger.getTags(markerAction);
        for (let i = 0; i < chainsText.length; i++) {
            const textChain = chainsText[i];
            let isSkip = false;
            if (textChain.type == openTag || textChain.type == closeTag)
                isSkip = true;
            for (let i = 0; i < textChain.content.length; i++) {
                currentPosition++;
                if (!isSkip)
                    clearPosition++;
                if (currentPosition == position)
                    return clearPosition;
            }
        }
        return clearPosition;
    }
    getPositionByClearPosition(clearPosition, chainsText) {
        let currentPosition = -1;
        let currentClearPosition = -1;
        for (let i = 0; i < chainsText.length; i++) {
            const textChain = chainsText[i];
            let isSkip = false;
            if (textChain.isDelete)
                continue;
            if (textChain.type == 'bold_open' || textChain.type == 'bold_close')
                isSkip = true;
            for (let i = 0; i < textChain.content.length; i++) {
                currentPosition++;
                if (!isSkip)
                    currentClearPosition++;
                if (currentClearPosition == clearPosition) {
                    return currentPosition;
                }
            }
        }
        return currentPosition;
    }
    parseLine(line, fromSelectPosition, toSelectPosition) {
        const result = [];
        const formaterCommanger = new FormaterCommanger();
        const allMarkers = formaterCommanger.getAll();
        let currentIndex = 0;
        let startSearchPosition = 0;
        let foundOpenMarker = false;
        const openMarker = new Map();
        while (currentIndex < line.length) {
            allMarkers.forEach(marker => {
                const { openToken, closeToken } = marker;
                if (!openToken || !closeToken)
                    throw new Error('Source tokens for bold not found');
                const content = openToken.content;
                const contentLength = content.length;
                const markers = [content];
                foundOpenMarker = openMarker.has(marker.markerAction) ? openMarker.get(marker.markerAction) : false;
                if (line.startsWith(content, currentIndex)) {
                    if (foundOpenMarker) {
                        if (currentIndex + contentLength == line.length ||
                            line[currentIndex - 1] != ' ') {
                            const closeTokenChain = new TextChain(closeToken.type, currentIndex, currentIndex + 1, closeToken.content);
                            if (currentIndex != 0 && startSearchPosition != currentIndex) {
                                const text = line.substring(startSearchPosition, currentIndex);
                                const textChain = new TextChain('text', startSearchPosition, currentIndex - 1, text);
                                result.push(textChain);
                            }
                            result.push(closeTokenChain);
                            startSearchPosition = currentIndex + contentLength;
                            currentIndex++;
                            //foundOpenMarker = false;
                            openMarker.set(marker.markerAction, false);
                        }
                    }
                    else if (line[currentIndex + contentLength] != ' ' && currentIndex + contentLength < line.length) {
                        //foundOpenMarker = true;
                        openMarker.set(marker.markerAction, true);
                        if (currentIndex != 0 && startSearchPosition != currentIndex) {
                            const text = line.substring(startSearchPosition, currentIndex);
                            const textChain = new TextChain('text', startSearchPosition, currentIndex - 1, text);
                            result.push(textChain);
                        }
                        const textChain = new TextChain(openToken.type, currentIndex, currentIndex + 1, openToken.content);
                        result.push(textChain);
                        startSearchPosition = currentIndex + contentLength;
                        currentIndex++;
                        //foundOpenMarker = true;
                        openMarker.set(marker.markerAction, true);
                    }
                }
                //}
            });
            if (currentIndex == line.length - 1) {
                const text = line.substring(startSearchPosition);
                const textChain = new TextChain('text', startSearchPosition, currentIndex, text);
                result.push(textChain);
            }
            currentIndex++;
        }
        // если блок block_open и следующий текстто нужно добавить в блок текста что он isBold
        this.markeredTokens(result, 'bold');
        this.markeredTokens(result, 'italic');
        this.markeredTokens(result, 'highlight');
        this.markeredTokens(result, 'strikethrough');
        this.markeredTokens(result, 'code');
        for (let i = 0; i < result.length; i++) {
            const currentChain = result[i];
            if (fromSelectPosition !== undefined
                && currentChain.from <= fromSelectPosition && currentChain.to >= fromSelectPosition) {
                currentChain.fromSelectedPosition = fromSelectPosition - currentChain.from;
            }
            if (toSelectPosition !== undefined && currentChain.from <= toSelectPosition && currentChain.to >= toSelectPosition) {
                currentChain.toSelectedPosition = toSelectPosition - currentChain.from;
            }
        }
        return result;
    }
    markeredTokens(tokens, markerAction) {
        const formaterCommanger = new FormaterCommanger();
        const { openToken, closeToken } = formaterCommanger.getSourceTokens(markerAction);
        let isOpenToken = false;
        for (let i = 0; i < tokens.length - 1; i++) {
            const currentChain = tokens[i];
            if (currentChain.type == openToken.type)
                isOpenToken = true;
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
            if (currentChain.type == closeToken.type)
                isOpenToken = false;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyTWFya2Rvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQYXJzZXJNYXJrZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLGlCQUFpQixFQUFnQixNQUFNLGtCQUFrQixDQUFDO0FBRTFGLE1BQU0sT0FBTyxjQUFjO0lBRTFCLFlBQVksQ0FBQyxVQUF1QixFQUFFLGNBQXNCO1FBRTNELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksY0FBYyxJQUFJLFNBQVMsQ0FBQyxFQUFFLElBQUksY0FBYyxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUNELGFBQWEsQ0FBQyxVQUF1QixFQUFFLElBQVksRUFBRSxFQUFVO1FBRTlELE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUNwQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsRUFBRSxJQUFJLElBQUk7ZUFDM0MsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQzdDLENBQUM7SUFDSCxDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsUUFBZ0IsRUFBRSxZQUEwQixFQUFFLFVBQXVCO1FBQ3JGLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3RCLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBRXhCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFBO1FBQ2pELE1BQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXBFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUUvQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUE7WUFFbEIsSUFBSSxTQUFTLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxTQUFTLENBQUMsSUFBSSxJQUFJLFFBQVE7Z0JBQUUsTUFBTSxHQUFHLElBQUksQ0FBQTtZQUUxRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25ELGVBQWUsRUFBRSxDQUFBO2dCQUNqQixJQUFJLENBQUMsTUFBTTtvQkFBRSxhQUFhLEVBQUUsQ0FBQTtnQkFDNUIsSUFBSSxlQUFlLElBQUksUUFBUTtvQkFBRSxPQUFPLGFBQWEsQ0FBQTthQUNyRDtTQUNEO1FBRUQsT0FBTyxhQUFhLENBQUE7SUFDckIsQ0FBQztJQUVELDBCQUEwQixDQUFDLGFBQXFCLEVBQUUsVUFBdUI7UUFDeEUsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDeEIsSUFBSSxvQkFBb0IsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUU3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFL0IsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFBO1lBQ2xCLElBQUksU0FBUyxDQUFDLFFBQVE7Z0JBQUUsU0FBUTtZQUNoQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLElBQUksV0FBVyxJQUFJLFNBQVMsQ0FBQyxJQUFJLElBQUksWUFBWTtnQkFBRSxNQUFNLEdBQUcsSUFBSSxDQUFBO1lBRWxGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsT0FBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkQsZUFBZSxFQUFFLENBQUE7Z0JBQ2pCLElBQUksQ0FBQyxNQUFNO29CQUFFLG9CQUFvQixFQUFFLENBQUE7Z0JBQ25DLElBQUksb0JBQW9CLElBQUksYUFBYSxFQUFFO29CQUMxQyxPQUFPLGVBQWUsQ0FBQTtpQkFDdEI7YUFDRDtTQUNEO1FBRUQsT0FBTyxlQUFlLENBQUE7SUFDdkIsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZLEVBQUUsa0JBQTJCLEVBQUUsZ0JBQXlCO1FBQzdFLE1BQU0sTUFBTSxHQUFnQixFQUFFLENBQUM7UUFDL0IsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUE7UUFDakQsTUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUE7UUFFN0MsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1FBRTVCLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQTtRQUMzQixNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUdwRCxPQUFPLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBRWxDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzNCLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFBO2dCQUN4QyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsVUFBVTtvQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUE7Z0JBRWxGLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFRLENBQUE7Z0JBQ2xDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUE7Z0JBQ3BDLE1BQU0sT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRTFCLGVBQWUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtnQkFFcEcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsRUFBRTtvQkFDM0MsSUFBSSxlQUFlLEVBQUU7d0JBQ3BCLElBQ0MsWUFBWSxHQUFHLGFBQWEsSUFBSSxJQUFJLENBQUMsTUFBTTs0QkFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7NEJBRS9CLE1BQU0sZUFBZSxHQUFHLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFrQixFQUFFLFlBQVksRUFBRSxZQUFZLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFFekgsSUFBSSxZQUFZLElBQUksQ0FBQyxJQUFJLG1CQUFtQixJQUFJLFlBQVksRUFBRTtnQ0FDN0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztnQ0FDL0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLG1CQUFtQixFQUFFLFlBQVksR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0NBRXJGLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7NkJBQ3RCOzRCQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7NEJBRTdCLG1CQUFtQixHQUFHLFlBQVksR0FBRyxhQUFhLENBQUE7NEJBQ2xELFlBQVksRUFBRSxDQUFDOzRCQUVmLDBCQUEwQjs0QkFDMUIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFBO3lCQUMxQztxQkFDRDt5QkFDSSxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLFlBQVksR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDakcseUJBQXlCO3dCQUN6QixVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUE7d0JBRXpDLElBQUksWUFBWSxJQUFJLENBQUMsSUFBSSxtQkFBbUIsSUFBSSxZQUFZLEVBQUU7NEJBQzdELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDLENBQUM7NEJBQy9ELE1BQU0sU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUVyRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO3lCQUN0Qjt3QkFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBa0IsRUFBRSxZQUFZLEVBQUUsWUFBWSxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ2pILE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBRXZCLG1CQUFtQixHQUFHLFlBQVksR0FBRyxhQUFhLENBQUM7d0JBQ25ELFlBQVksRUFBRSxDQUFDO3dCQUVmLHlCQUF5Qjt3QkFDekIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFBO3FCQUV6QztpQkFDRDtnQkFDRCxHQUFHO1lBQ0osQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNqRCxNQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNqRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2FBQ3RCO1lBQ0QsWUFBWSxFQUFFLENBQUM7U0FDZjtRQUNELHNGQUFzRjtRQUN0RixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQTtRQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUVuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDOUIsSUFBSSxrQkFBa0IsS0FBSyxTQUFTO21CQUNoQyxZQUFZLENBQUMsSUFBSSxJQUFJLGtCQUFrQixJQUFJLFlBQVksQ0FBQyxFQUFFLElBQUksa0JBQWtCLEVBQUU7Z0JBQ3JGLFlBQVksQ0FBQyxvQkFBb0IsR0FBRyxrQkFBa0IsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFBO2FBQzFFO1lBQ0QsSUFBSSxnQkFBZ0IsS0FBSyxTQUFTLElBQUksWUFBWSxDQUFDLElBQUksSUFBSSxnQkFBZ0IsSUFBSSxZQUFZLENBQUMsRUFBRSxJQUFJLGdCQUFnQixFQUFFO2dCQUNuSCxZQUFZLENBQUMsa0JBQWtCLEdBQUcsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQTthQUN0RTtTQUNEO1FBR0QsT0FBTyxNQUFNLENBQUM7SUFDZixDQUFDO0lBQ08sY0FBYyxDQUFDLE1BQW1CLEVBQUUsWUFBMEI7UUFFckUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUE7UUFDakQsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUE7UUFFakYsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFBO1FBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDOUIsSUFBSSxZQUFZLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJO2dCQUFFLFdBQVcsR0FBRyxJQUFJLENBQUE7WUFFM0QsSUFBSSxZQUFZLElBQUksTUFBTSxFQUFFO2dCQUMzQixZQUFZLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQzthQUNsQztpQkFDSSxJQUFJLFlBQVksSUFBSSxRQUFRLEVBQUU7Z0JBQ2xDLFlBQVksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO2FBQ3BDO2lCQUNJLElBQUksWUFBWSxJQUFJLFdBQVcsRUFBRTtnQkFDckMsWUFBWSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7YUFDdkM7aUJBQ0ksSUFBSSxZQUFZLElBQUksZUFBZSxFQUFFO2dCQUN6QyxZQUFZLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQzthQUMzQztpQkFDSSxJQUFJLFlBQVksSUFBSSxNQUFNLEVBQUU7Z0JBQ2hDLFlBQVksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO2FBQ2xDO1lBQ0QsSUFBSSxZQUFZLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJO2dCQUFFLFdBQVcsR0FBRyxLQUFLLENBQUE7U0FDN0Q7SUFDRixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0Q2hhaW4sIE1hcmtlclR5cGUsIEZvcm1hdGVyQ29tbWFuZ2VyLCBNYXJrZXJBY3Rpb24gfSBmcm9tICcuL0Zvcm1hdGVySGVscGVyJztcblxuZXhwb3J0IGNsYXNzIFBhcnNlck1hcmtkb3duIHtcblxuXHRnZXRUZXh0Q2hhaW4odGV4dENoYWluczogVGV4dENoYWluW10sIGN1cnNvclBvc2l0aW9uOiBudW1iZXIpOiBUZXh0Q2hhaW4gfCB1bmRlZmluZWQge1xuXG5cdFx0cmV0dXJuIHRleHRDaGFpbnMuZmluZCh0ZXh0Q2hhaW4gPT4gdGV4dENoYWluLmZyb20gPD0gY3Vyc29yUG9zaXRpb24gJiYgdGV4dENoYWluLnRvID49IGN1cnNvclBvc2l0aW9uKTtcblx0fVxuXHRnZXRUZXh0Q2hhaW5zKHRleHRDaGFpbnM6IFRleHRDaGFpbltdLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiBUZXh0Q2hhaW5bXSB8IHVuZGVmaW5lZCB7XG5cblx0XHRyZXR1cm4gdGV4dENoYWlucy5maWx0ZXIodGV4dENoYWluID0+XG5cdFx0XHR0ZXh0Q2hhaW4uZnJvbSA8PSBmcm9tICYmIHRleHRDaGFpbi50byA+PSBmcm9tXG5cdFx0XHR8fCB0ZXh0Q2hhaW4uZnJvbSA8PSB0byAmJiB0ZXh0Q2hhaW4udG8gPj0gdG9cblx0XHQpO1xuXHR9XG5cdGdldENsZWFyUG9zaXRpb24ocG9zaXRpb246IG51bWJlciwgbWFya2VyQWN0aW9uOiBNYXJrZXJBY3Rpb24sIGNoYWluc1RleHQ6IFRleHRDaGFpbltdKTogbnVtYmVyIHtcblx0XHRsZXQgY2xlYXJQb3NpdGlvbiA9IC0xXG5cdFx0bGV0IGN1cnJlbnRQb3NpdGlvbiA9IC0xXG5cblx0XHRjb25zdCBmb3JtYXRlckNvbW1hbmdlciA9IG5ldyBGb3JtYXRlckNvbW1hbmdlcigpXG5cdFx0Y29uc3QgW29wZW5UYWcsIGNsb3NlVGFnXSA9IGZvcm1hdGVyQ29tbWFuZ2VyLmdldFRhZ3MobWFya2VyQWN0aW9uKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hhaW5zVGV4dC5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgdGV4dENoYWluID0gY2hhaW5zVGV4dFtpXVxuXG5cdFx0XHRsZXQgaXNTa2lwID0gZmFsc2VcblxuXHRcdFx0aWYgKHRleHRDaGFpbi50eXBlID09IG9wZW5UYWcgfHwgdGV4dENoYWluLnR5cGUgPT0gY2xvc2VUYWcpIGlzU2tpcCA9IHRydWVcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Q2hhaW4uY29udGVudCEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y3VycmVudFBvc2l0aW9uKytcblx0XHRcdFx0aWYgKCFpc1NraXApIGNsZWFyUG9zaXRpb24rK1xuXHRcdFx0XHRpZiAoY3VycmVudFBvc2l0aW9uID09IHBvc2l0aW9uKSByZXR1cm4gY2xlYXJQb3NpdGlvblxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGVhclBvc2l0aW9uXG5cdH1cblxuXHRnZXRQb3NpdGlvbkJ5Q2xlYXJQb3NpdGlvbihjbGVhclBvc2l0aW9uOiBudW1iZXIsIGNoYWluc1RleHQ6IFRleHRDaGFpbltdKTogbnVtYmVyIHtcblx0XHRsZXQgY3VycmVudFBvc2l0aW9uID0gLTFcblx0XHRsZXQgY3VycmVudENsZWFyUG9zaXRpb24gPSAtMVxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGFpbnNUZXh0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCB0ZXh0Q2hhaW4gPSBjaGFpbnNUZXh0W2ldXG5cblx0XHRcdGxldCBpc1NraXAgPSBmYWxzZVxuXHRcdFx0aWYgKHRleHRDaGFpbi5pc0RlbGV0ZSkgY29udGludWVcblx0XHRcdGlmICh0ZXh0Q2hhaW4udHlwZSA9PSAnYm9sZF9vcGVuJyB8fCB0ZXh0Q2hhaW4udHlwZSA9PSAnYm9sZF9jbG9zZScpIGlzU2tpcCA9IHRydWVcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Q2hhaW4uY29udGVudCEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y3VycmVudFBvc2l0aW9uKytcblx0XHRcdFx0aWYgKCFpc1NraXApIGN1cnJlbnRDbGVhclBvc2l0aW9uKytcblx0XHRcdFx0aWYgKGN1cnJlbnRDbGVhclBvc2l0aW9uID09IGNsZWFyUG9zaXRpb24pIHtcblx0XHRcdFx0XHRyZXR1cm4gY3VycmVudFBvc2l0aW9uXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY3VycmVudFBvc2l0aW9uXG5cdH1cblxuXHRwYXJzZUxpbmUobGluZTogc3RyaW5nLCBmcm9tU2VsZWN0UG9zaXRpb24/OiBudW1iZXIsIHRvU2VsZWN0UG9zaXRpb24/OiBudW1iZXIpOiBUZXh0Q2hhaW5bXSB7XG5cdFx0Y29uc3QgcmVzdWx0OiBUZXh0Q2hhaW5bXSA9IFtdO1xuXHRcdGNvbnN0IGZvcm1hdGVyQ29tbWFuZ2VyID0gbmV3IEZvcm1hdGVyQ29tbWFuZ2VyKClcblx0XHRjb25zdCBhbGxNYXJrZXJzID0gZm9ybWF0ZXJDb21tYW5nZXIuZ2V0QWxsKClcblxuXHRcdGxldCBjdXJyZW50SW5kZXggPSAwO1xuXHRcdGxldCBzdGFydFNlYXJjaFBvc2l0aW9uID0gMDtcblxuXHRcdGxldCBmb3VuZE9wZW5NYXJrZXIgPSBmYWxzZVxuXHRcdGNvbnN0IG9wZW5NYXJrZXIgPSBuZXcgTWFwPE1hcmtlckFjdGlvbiwgYm9vbGVhbj4oKTtcblxuXG5cdFx0d2hpbGUgKGN1cnJlbnRJbmRleCA8IGxpbmUubGVuZ3RoKSB7XG5cblx0XHRcdGFsbE1hcmtlcnMuZm9yRWFjaChtYXJrZXIgPT4ge1xuXHRcdFx0XHRjb25zdCB7IG9wZW5Ub2tlbiwgY2xvc2VUb2tlbiB9ID0gbWFya2VyXG5cdFx0XHRcdGlmICghb3BlblRva2VuIHx8ICFjbG9zZVRva2VuKSB0aHJvdyBuZXcgRXJyb3IoJ1NvdXJjZSB0b2tlbnMgZm9yIGJvbGQgbm90IGZvdW5kJylcblxuXHRcdFx0XHRjb25zdCBjb250ZW50ID0gb3BlblRva2VuLmNvbnRlbnQhXG5cdFx0XHRcdGNvbnN0IGNvbnRlbnRMZW5ndGggPSBjb250ZW50Lmxlbmd0aFxuXHRcdFx0XHRjb25zdCBtYXJrZXJzID0gW2NvbnRlbnRdO1xuXG5cdFx0XHRcdGZvdW5kT3Blbk1hcmtlciA9IG9wZW5NYXJrZXIuaGFzKG1hcmtlci5tYXJrZXJBY3Rpb24pID8gb3Blbk1hcmtlci5nZXQobWFya2VyLm1hcmtlckFjdGlvbikhIDogZmFsc2VcblxuXHRcdFx0XHRpZiAobGluZS5zdGFydHNXaXRoKGNvbnRlbnQsIGN1cnJlbnRJbmRleCkpIHtcblx0XHRcdFx0XHRpZiAoZm91bmRPcGVuTWFya2VyKSB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRJbmRleCArIGNvbnRlbnRMZW5ndGggPT0gbGluZS5sZW5ndGggfHxcblx0XHRcdFx0XHRcdFx0bGluZVtjdXJyZW50SW5kZXggLSAxXSAhPSAnICcpIHtcblxuXHRcdFx0XHRcdFx0XHRjb25zdCBjbG9zZVRva2VuQ2hhaW4gPSBuZXcgVGV4dENoYWluKGNsb3NlVG9rZW4udHlwZSBhcyBNYXJrZXJUeXBlLCBjdXJyZW50SW5kZXgsIGN1cnJlbnRJbmRleCArIDEsIGNsb3NlVG9rZW4uY29udGVudCk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRJbmRleCAhPSAwICYmIHN0YXJ0U2VhcmNoUG9zaXRpb24gIT0gY3VycmVudEluZGV4KSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGV4dCA9IGxpbmUuc3Vic3RyaW5nKHN0YXJ0U2VhcmNoUG9zaXRpb24sIGN1cnJlbnRJbmRleCk7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGV4dENoYWluID0gbmV3IFRleHRDaGFpbigndGV4dCcsIHN0YXJ0U2VhcmNoUG9zaXRpb24sIGN1cnJlbnRJbmRleCAtIDEsIHRleHQpO1xuXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2godGV4dENoYWluKVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goY2xvc2VUb2tlbkNoYWluKTtcblxuXHRcdFx0XHRcdFx0XHRzdGFydFNlYXJjaFBvc2l0aW9uID0gY3VycmVudEluZGV4ICsgY29udGVudExlbmd0aFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50SW5kZXgrKztcblxuXHRcdFx0XHRcdFx0XHQvL2ZvdW5kT3Blbk1hcmtlciA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRvcGVuTWFya2VyLnNldChtYXJrZXIubWFya2VyQWN0aW9uLCBmYWxzZSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAobGluZVtjdXJyZW50SW5kZXggKyBjb250ZW50TGVuZ3RoXSAhPSAnICcgJiYgY3VycmVudEluZGV4ICsgY29udGVudExlbmd0aCA8IGxpbmUubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHQvL2ZvdW5kT3Blbk1hcmtlciA9IHRydWU7XG5cdFx0XHRcdFx0XHRvcGVuTWFya2VyLnNldChtYXJrZXIubWFya2VyQWN0aW9uLCB0cnVlKVxuXG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudEluZGV4ICE9IDAgJiYgc3RhcnRTZWFyY2hQb3NpdGlvbiAhPSBjdXJyZW50SW5kZXgpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdGV4dCA9IGxpbmUuc3Vic3RyaW5nKHN0YXJ0U2VhcmNoUG9zaXRpb24sIGN1cnJlbnRJbmRleCk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRleHRDaGFpbiA9IG5ldyBUZXh0Q2hhaW4oJ3RleHQnLCBzdGFydFNlYXJjaFBvc2l0aW9uLCBjdXJyZW50SW5kZXggLSAxLCB0ZXh0KTtcblxuXHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh0ZXh0Q2hhaW4pXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnN0IHRleHRDaGFpbiA9IG5ldyBUZXh0Q2hhaW4ob3BlblRva2VuLnR5cGUgYXMgTWFya2VyVHlwZSwgY3VycmVudEluZGV4LCBjdXJyZW50SW5kZXggKyAxLCBvcGVuVG9rZW4uY29udGVudCk7XG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh0ZXh0Q2hhaW4pO1xuXG5cdFx0XHRcdFx0XHRzdGFydFNlYXJjaFBvc2l0aW9uID0gY3VycmVudEluZGV4ICsgY29udGVudExlbmd0aDtcblx0XHRcdFx0XHRcdGN1cnJlbnRJbmRleCsrO1xuXG5cdFx0XHRcdFx0XHQvL2ZvdW5kT3Blbk1hcmtlciA9IHRydWU7XG5cdFx0XHRcdFx0XHRvcGVuTWFya2VyLnNldChtYXJrZXIubWFya2VyQWN0aW9uLCB0cnVlKVxuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vfVxuXHRcdFx0fSlcblx0XHRcdGlmIChjdXJyZW50SW5kZXggPT0gbGluZS5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdGNvbnN0IHRleHQgPSBsaW5lLnN1YnN0cmluZyhzdGFydFNlYXJjaFBvc2l0aW9uKTtcblx0XHRcdFx0Y29uc3QgdGV4dENoYWluID0gbmV3IFRleHRDaGFpbigndGV4dCcsIHN0YXJ0U2VhcmNoUG9zaXRpb24sIGN1cnJlbnRJbmRleCwgdGV4dCk7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHRleHRDaGFpbilcblx0XHRcdH1cblx0XHRcdGN1cnJlbnRJbmRleCsrO1xuXHRcdH1cblx0XHQvLyDQtdGB0LvQuCDQsdC70L7QuiBibG9ja19vcGVuINC4INGB0LvQtdC00YPRjtGJ0LjQuSDRgtC10LrRgdGC0YLQviDQvdGD0LbQvdC+INC00L7QsdCw0LLQuNGC0Ywg0LIg0LHQu9C+0Log0YLQtdC60YHRgtCwINGH0YLQviDQvtC9IGlzQm9sZFxuXHRcdHRoaXMubWFya2VyZWRUb2tlbnMocmVzdWx0LCAnYm9sZCcpXG5cdFx0dGhpcy5tYXJrZXJlZFRva2VucyhyZXN1bHQsICdpdGFsaWMnKVxuXHRcdHRoaXMubWFya2VyZWRUb2tlbnMocmVzdWx0LCAnaGlnaGxpZ2h0Jylcblx0XHR0aGlzLm1hcmtlcmVkVG9rZW5zKHJlc3VsdCwgJ3N0cmlrZXRocm91Z2gnKVxuXHRcdHRoaXMubWFya2VyZWRUb2tlbnMocmVzdWx0LCAnY29kZScpXG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgY3VycmVudENoYWluID0gcmVzdWx0W2ldXG5cdFx0XHRpZiAoZnJvbVNlbGVjdFBvc2l0aW9uICE9PSB1bmRlZmluZWRcblx0XHRcdFx0JiYgY3VycmVudENoYWluLmZyb20gPD0gZnJvbVNlbGVjdFBvc2l0aW9uICYmIGN1cnJlbnRDaGFpbi50byA+PSBmcm9tU2VsZWN0UG9zaXRpb24pIHtcblx0XHRcdFx0Y3VycmVudENoYWluLmZyb21TZWxlY3RlZFBvc2l0aW9uID0gZnJvbVNlbGVjdFBvc2l0aW9uIC0gY3VycmVudENoYWluLmZyb21cblx0XHRcdH1cblx0XHRcdGlmICh0b1NlbGVjdFBvc2l0aW9uICE9PSB1bmRlZmluZWQgJiYgY3VycmVudENoYWluLmZyb20gPD0gdG9TZWxlY3RQb3NpdGlvbiAmJiBjdXJyZW50Q2hhaW4udG8gPj0gdG9TZWxlY3RQb3NpdGlvbikge1xuXHRcdFx0XHRjdXJyZW50Q2hhaW4udG9TZWxlY3RlZFBvc2l0aW9uID0gdG9TZWxlY3RQb3NpdGlvbiAtIGN1cnJlbnRDaGFpbi5mcm9tXG5cdFx0XHR9XG5cdFx0fVxuXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cdHByaXZhdGUgbWFya2VyZWRUb2tlbnModG9rZW5zOiBUZXh0Q2hhaW5bXSwgbWFya2VyQWN0aW9uOiBNYXJrZXJBY3Rpb24pIHtcblxuXHRcdGNvbnN0IGZvcm1hdGVyQ29tbWFuZ2VyID0gbmV3IEZvcm1hdGVyQ29tbWFuZ2VyKClcblx0XHRjb25zdCB7IG9wZW5Ub2tlbiwgY2xvc2VUb2tlbiB9ID0gZm9ybWF0ZXJDb21tYW5nZXIuZ2V0U291cmNlVG9rZW5zKG1hcmtlckFjdGlvbilcblxuXHRcdGxldCBpc09wZW5Ub2tlbiA9IGZhbHNlXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0XHRjb25zdCBjdXJyZW50Q2hhaW4gPSB0b2tlbnNbaV1cblx0XHRcdGlmIChjdXJyZW50Q2hhaW4udHlwZSA9PSBvcGVuVG9rZW4udHlwZSkgaXNPcGVuVG9rZW4gPSB0cnVlXG5cblx0XHRcdGlmIChtYXJrZXJBY3Rpb24gPT0gJ2JvbGQnKSB7XG5cdFx0XHRcdGN1cnJlbnRDaGFpbi5pc0JvbGQgPSBpc09wZW5Ub2tlbjtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKG1hcmtlckFjdGlvbiA9PSAnaXRhbGljJykge1xuXHRcdFx0XHRjdXJyZW50Q2hhaW4uaXNJdGFsaWMgPSBpc09wZW5Ub2tlbjtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKG1hcmtlckFjdGlvbiA9PSAnaGlnaGxpZ2h0Jykge1xuXHRcdFx0XHRjdXJyZW50Q2hhaW4uaXNIaWdobGlnaHQgPSBpc09wZW5Ub2tlbjtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKG1hcmtlckFjdGlvbiA9PSAnc3RyaWtldGhyb3VnaCcpIHtcblx0XHRcdFx0Y3VycmVudENoYWluLmlzU3RyaWtldGhyb3VnaCA9IGlzT3BlblRva2VuO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAobWFya2VyQWN0aW9uID09ICdjb2RlJykge1xuXHRcdFx0XHRjdXJyZW50Q2hhaW4uaXNDb2RlID0gaXNPcGVuVG9rZW47XG5cdFx0XHR9XG5cdFx0XHRpZiAoY3VycmVudENoYWluLnR5cGUgPT0gY2xvc2VUb2tlbi50eXBlKSBpc09wZW5Ub2tlbiA9IGZhbHNlXG5cdFx0fVxuXHR9XG59XG4iXX0=