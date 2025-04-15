import { ParserMarkdown } from './ParserMarkdown';
export class LineTextResult {
}
export class TextChain {
    constructor(type, from = -1, to = -1, content, isNew = false, fromSelectedPosition, toSelectedPosition) {
        this.content = content || '';
        if (type == 'bold_open') {
            this.isBold = true;
            this.content = '**';
        }
        if (type == 'bold_close') {
            this.isBold = false;
            this.content = '**';
        }
        if (type == 'italic_open') {
            this.isBold = false;
            this.content = '_';
        }
        if (type == 'italic_close') {
            this.isBold = false;
            this.content = '_';
        }
        if (type == 'highlight_open') {
            this.isBold = false;
            this.content = '==';
        }
        if (type == 'highlight_close') {
            this.isBold = false;
            this.content = '==';
        }
        if (type == 'strikethrough_open') {
            this.isBold = false;
            this.content = '~~';
        }
        if (type == 'strikethrough_close') {
            this.isBold = false;
            this.content = '~~';
        }
        if (type == 'code_open') {
            this.isBold = false;
            this.content = '`';
        }
        if (type == 'code_close') {
            this.isBold = false;
            this.content = '`';
        }
        this.from = from == undefined ? -1 : from;
        this.to = to == undefined ? -1 : to;
        this.type = type;
        this.isDelete = false;
        this.isNew = isNew || false;
        this.isBold = false;
        this.fromSelectedPosition = fromSelectedPosition;
        this.toSelectedPosition = toSelectedPosition;
        if (type == 'bold_open' || type == 'bold_close')
            this.markerAction = 'bold';
        if (type == 'italic_open' || type == 'italic_close')
            this.markerAction = 'italic';
        if (type == 'highlight_open' || type == 'highlight_close')
            this.markerAction = 'highlight';
        if (type == 'strikethrough_open' || type == 'strikethrough_close')
            this.markerAction = 'strikethrough';
        if (type == 'code_open' || type == 'code_close')
            this.markerAction = 'code';
    }
    isOpenMarker() {
        return this.type == 'bold_open' || this.type == 'italic_open' || this.type == 'highlight_open' || this.type == 'strikethrough_open' || this.type == 'code_open';
    }
    isCloseMarker() {
        return this.type == 'bold_close' || this.type == 'italic_close' || this.type == 'highlight_close' || this.type == 'strikethrough_close' || this.type == 'code_close';
    }
}
export class FormaterCommanger {
    constructor() {
        this.sourceTokens = [];
        this.sourceTokens = [];
        this.sourceTokens.push({ type: 'bold_open', content: '**' });
        this.sourceTokens.push({ type: 'bold_close', content: '**' });
        this.sourceTokens.push({ type: 'italic_open', content: '_' });
        this.sourceTokens.push({ type: 'italic_close', content: '_' });
        this.sourceTokens.push({ type: 'highlight_open', content: '==' });
        this.sourceTokens.push({ type: 'highlight_close', content: '==' });
        this.sourceTokens.push({ type: 'strikethrough_open', content: '~~' });
        this.sourceTokens.push({ type: 'strikethrough_close', content: '~~' });
        this.sourceTokens.push({ type: 'code_open', content: '`' });
        this.sourceTokens.push({ type: 'code_close', content: '`' });
    }
    getSourceTokens(markerAction) {
        const openToken = this.sourceTokens.find(token => token.type == markerAction + '_open');
        const closeToken = this.sourceTokens.find(token => token.type == markerAction + '_close');
        if (!openToken || !closeToken)
            throw new Error(`Source tokens for ${markerAction} not found`);
        return { openToken, closeToken };
    }
    getAll() {
        const result = [];
        const markers = ['bold', 'italic', 'highlight', 'strikethrough', 'code'];
        markers.forEach(markerAction => {
            const { openToken, closeToken } = this.getSourceTokens(markerAction);
            result.push({ openToken, closeToken, markerAction });
        });
        return result;
    }
    markerMultiline(markerAction, lines, selection) {
        const result = [];
        let from = selection.anchor;
        let to = selection.head;
        if (from.line > to.line || (from.line === to.line && from.ch > to.ch)) {
            [from, to] = [to, from];
        }
        lines.forEach((textLine, i) => {
            const fromCharPosition = (i === 0) ? from.ch : 0; // Определение fromCharPosition
            const toCharPosition = (i === lines.length - 1) ? to.ch : textLine.length - 1; // Определение toCharPosition
            const newLine = this.markerMarkerAction(markerAction, textLine, fromCharPosition, toCharPosition); // Вызов функции
            result.push(newLine);
        });
        return result;
    }
    sliceTextChain(textChain, position, textChaininsert) {
        const leftContext = textChain.content.slice(0, position);
        const rightContext = textChain.content.slice(position);
        const leftRight = textChain.from + leftContext.length - 1;
        const rightLeft = textChain.from + leftContext.length;
        let leftSelectPosition;
        if (textChain.fromSelectedPosition !== undefined && textChain.fromSelectedPosition < leftContext.length) {
            leftSelectPosition = textChain.fromSelectedPosition;
        }
        let rightSelectPosition;
        if (textChain.toSelectedPosition !== undefined && textChain.toSelectedPosition >= leftContext.length) {
            rightSelectPosition = textChain.toSelectedPosition - leftContext.length;
        }
        const leftChain = new TextChain('text', textChain.from, leftRight, leftContext);
        const rightChain = new TextChain('text', rightLeft, textChain.to, rightContext);
        const result = [];
        if (leftContext.length > 0)
            result.push(leftChain);
        result.push(textChaininsert);
        if (rightContext.length > 0)
            result.push(rightChain);
        return result;
    }
    instertTextChain(textChains, markerAction, textChain, position) {
        const [openTag, closeTag] = this.getTags(markerAction);
        const parser = new ParserMarkdown();
        const currentTextChain = parser.getTextChain(textChains, position);
        if (!currentTextChain)
            return textChains;
        position = position - currentTextChain.from;
        const currentIndex = textChains.indexOf(currentTextChain);
        if (textChain.type == openTag) {
            if (currentTextChain.type == "text") {
                const content = currentTextChain.content;
                while (content.charAt(position) == " ") {
                    position++;
                }
                const textChainsNew = this.sliceTextChain(currentTextChain, position, textChain);
                textChains.splice(currentIndex, 1, ...textChainsNew);
            }
            else {
                textChains.splice(currentIndex, 0, textChain);
            }
        }
        else if (textChain.type == closeTag) {
            if (currentTextChain.type == "text") {
                const content = currentTextChain.content;
                while (content.charAt(position) == " ") {
                    position--;
                }
                const textChainsNew = this.sliceTextChain(currentTextChain, position + 1, textChain);
                textChains.splice(currentIndex, 1, ...textChainsNew);
            }
            else {
                textChains.splice(currentIndex + 1, 0, textChain);
            }
        }
    }
    getTags(markerAction) {
        if (markerAction == 'bold')
            return ['bold_open', 'bold_close'];
        if (markerAction == 'highlight')
            return ['highlight_open', 'highlight_close'];
        if (markerAction == 'italic')
            return ['italic_open', 'italic_close'];
        if (markerAction == 'strikethrough')
            return ['strikethrough_open', 'strikethrough_close'];
        if (markerAction == 'code')
            return ['code_open', 'code_close'];
        return [];
    }
    createOpenTag(markerAction, isNew = false) {
        const [openTag, closeTag] = this.getTags(markerAction);
        return new TextChain(openTag, -1, -1, undefined, true);
    }
    createCloseTag(markerAction, isNew = false) {
        const [openTag, closeTag] = this.getTags(markerAction);
        return new TextChain(closeTag, -1, -1, undefined, true);
    }
    getIsFlagByMarkerAction(markerAction, chain) {
        if (markerAction == 'bold')
            return chain.isBold;
        if (markerAction == 'italic')
            return chain.isItalic;
        if (markerAction == 'highlight')
            return chain.isHighlight;
        if (markerAction == 'strikethrough')
            return chain.isStrikethrough;
        if (markerAction == 'code')
            return chain.isCode;
        return false;
    }
    setFlagByMarkerAction(markerAction, chain, value) {
        if (markerAction == 'bold')
            chain.isBold = value;
        if (markerAction == 'italic')
            chain.isItalic = value;
        if (markerAction == 'highlight')
            chain.isHighlight = value;
        if (markerAction == 'strikethrough')
            chain.isStrikethrough = value;
        if (markerAction == 'code')
            chain.isCode = value;
    }
    markerMarkerAction(markerAction, textLine, fromCharPosition, toCharPosition) {
        console.log("action:", markerAction, { textLine, fromCharPosition, toCharPosition });
        const parser = new ParserMarkdown();
        const chainsText = parser.parseLine(textLine, fromCharPosition, toCharPosition);
        const clearPositionFrom = parser.getClearPosition(fromCharPosition, markerAction, chainsText);
        const fromChainPosition = parser.getTextChain(chainsText, fromCharPosition);
        const [openTag, closeTag] = this.getTags(markerAction);
        let clearPositionTo;
        if (fromChainPosition) {
            // выделение текста блок
            if (fromCharPosition !== undefined && toCharPosition !== undefined) {
                const toChainPosition = parser.getTextChain(chainsText, toCharPosition);
                const isFlagFrom = this.getIsFlagByMarkerAction(markerAction, fromChainPosition);
                clearPositionTo = parser.getClearPosition(toCharPosition, markerAction, chainsText);
                const isFlagTo = this.getIsFlagByMarkerAction(markerAction, toChainPosition);
                const markerOpen = this.createOpenTag(markerAction, true);
                const markerClose = this.createCloseTag(markerAction, true);
                if (fromChainPosition == toChainPosition) {
                    if (isFlagFrom) {
                        this.instertTextChain(chainsText, markerAction, markerClose, fromCharPosition - 1);
                        this.instertTextChain(chainsText, markerAction, markerOpen, toCharPosition + 1);
                    }
                    else {
                        this.instertTextChain(chainsText, markerAction, markerOpen, fromCharPosition);
                        this.instertTextChain(chainsText, markerAction, markerClose, toCharPosition);
                    }
                }
                else {
                    // отфильтровать chainsText между fromChainPosition и toChainPosition
                    if (isFlagFrom && isFlagTo) {
                        this.clearByMarkerAction(chainsText, fromChainPosition, toChainPosition, markerAction);
                    }
                    else if (!isFlagFrom && !isFlagTo) {
                        this.instertTextChain(chainsText, markerAction, markerOpen, fromCharPosition);
                        this.instertTextChain(chainsText, markerAction, markerClose, toCharPosition);
                    }
                    else if (isFlagFrom && !isFlagTo) {
                        this.instertTextChain(chainsText, markerAction, markerClose, toCharPosition);
                        this.clearMarkerRight(chainsText, fromChainPosition, markerClose, markerAction);
                    }
                    else if (!isFlagFrom && isFlagTo) {
                        this.instertTextChain(chainsText, markerAction, markerOpen, fromCharPosition);
                        this.clearMarkerLeft(chainsText, markerOpen, toChainPosition, markerAction);
                    }
                }
            }
            // просто курсор без выделения 
            else if (fromCharPosition !== undefined && toCharPosition == undefined) {
                const spaceChars = [' ', '\n', '\t'];
                if (spaceChars.includes(textLine.charAt(fromCharPosition)) && toCharPosition == undefined)
                    return { fromSelectPosition: fromCharPosition, toSelectPosition: fromCharPosition, lineText: textLine };
                const isFlag = this.getIsFlagByMarkerAction(markerAction, fromChainPosition);
                if (isFlag) {
                    this.clearMarkerAction(chainsText, fromChainPosition, markerAction);
                }
                else if (fromChainPosition.type == 'text') {
                    const index = chainsText.indexOf(fromChainPosition);
                    const content = fromChainPosition.content;
                    const parts = content.split(" ");
                    parts.map(part => { if (part == "")
                        part = " "; });
                    let cursor = fromChainPosition.from;
                    for (let i = 0; i < parts.length; i++) {
                        const beginPart = cursor;
                        const endPart = cursor + parts[i].length - 1;
                        if (fromCharPosition >= beginPart && fromCharPosition <= endPart) {
                            const boldOpen = this.createOpenTag(markerAction, true);
                            const boldClose = this.createCloseTag(markerAction, true);
                            this.instertTextChain(chainsText, markerAction, boldOpen, beginPart);
                            this.instertTextChain(chainsText, markerAction, boldClose, endPart);
                            break;
                        }
                        cursor += parts[i].length + 1;
                    }
                }
            }
        }
        console.log("chainsText", chainsText);
        const lineText = this.optimizeChain(chainsText);
        let fromPositionCursor = 0;
        if (fromCharPosition !== undefined) {
            let offset = 0;
            for (let i = 0; i < chainsText.length; i++) {
                const chain = chainsText[i];
                if (chain.isNew) {
                    offset = offset + chain.content.length;
                }
                if (chain.isDelete) {
                    offset = offset - chain.content.length;
                    continue;
                }
                if (chain.from <= fromCharPosition + offset && fromCharPosition + offset <= chain.to) {
                    fromPositionCursor = fromCharPosition + offset;
                    if (chain.type == openTag)
                        fromPositionCursor = chain.to + 1;
                    if (chain.type == closeTag)
                        fromPositionCursor = chain.from - 1;
                    break;
                }
            }
        }
        let toPositionCursor = 0;
        if (toCharPosition !== undefined) {
            let offset = 0;
            for (let i = 0; i < chainsText.length; i++) {
                const chain = chainsText[i];
                if (chain.isNew) {
                    offset = offset - chain.content.length;
                }
                if (chain.isDelete) {
                    offset = offset + chain.content.length;
                    continue;
                }
                if (chain.from <= toCharPosition + offset && toCharPosition + offset <= chain.to) {
                    toPositionCursor = toCharPosition - offset - 1;
                    if (chain.type == openTag)
                        toPositionCursor = chain.to + 1;
                    if (chain.type == closeTag)
                        toPositionCursor = chain.from - 1;
                    break;
                }
            }
        }
        return { fromSelectPosition: fromPositionCursor, toSelectPosition: toPositionCursor, lineText: lineText };
    }
    markerBold(textLine, fromCharPosition, toCharPosition) {
        return this.markerMarkerAction('bold', textLine, fromCharPosition, toCharPosition);
    }
    markerItalic(textLine, fromCharPosition, toCharPosition) {
        return this.markerMarkerAction('italic', textLine, fromCharPosition, toCharPosition);
    }
    markerStrikethrough(textLine, fromCharPosition, toCharPosition) {
        return this.markerMarkerAction('strikethrough', textLine, fromCharPosition, toCharPosition);
    }
    deleteChain(chainsText, from, to) {
        const fromIndex = chainsText.indexOf(from);
        const toIndex = chainsText.indexOf(to);
        chainsText.splice(fromIndex + 1, toIndex - fromIndex - 1).forEach(chain => {
            if (chain.type != 'text')
                chain.isDelete = true;
        });
    }
    clearByMarkerAction(chainsText, from, to, markerAction) {
        const fromIndex = chainsText.indexOf(from);
        const toIndex = chainsText.indexOf(to);
        const [openTag, closeTag] = this.getTags(markerAction);
        for (let i = fromIndex; i <= toIndex; i++) {
            if (chainsText[i].type == openTag || chainsText[i].type == closeTag) {
                this.setFlagByMarkerAction(markerAction, chainsText[i], true);
                chainsText[i].isDelete = true;
            }
            if (chainsText[i].type == 'text')
                this.setFlagByMarkerAction(markerAction, chainsText[i], true);
        }
    }
    clearMarkerRight(chainsText, from, to, markerAction) {
        const [openTag, closeTag] = this.getTags(markerAction);
        const fromIndex = chainsText.indexOf(from);
        const toIndex = chainsText.indexOf(to);
        for (let i = fromIndex + 1; i < toIndex; i++) {
            if (chainsText[i].type == openTag || chainsText[i].type == closeTag) {
                chainsText[i].isDelete = true;
                this.setFlagByMarkerAction(markerAction, chainsText[i], false);
            }
            if (chainsText[i].type != 'text')
                this.setFlagByMarkerAction(markerAction, chainsText[i], false);
        }
    }
    clearMarkerLeft(chainsText, from, to, markerAction) {
        const [openTag, closeTag] = this.getTags(markerAction);
        const fromIndex = chainsText.indexOf(from);
        const toIndex = chainsText.indexOf(to);
        for (let i = fromIndex + 1; i < toIndex; i++) {
            if (chainsText[i].type == openTag || chainsText[i].type == closeTag) {
                this.setFlagByMarkerAction(markerAction, chainsText[i], false);
                chainsText[i].isDelete = true;
            }
            if (chainsText[i].type == 'text')
                this.setFlagByMarkerAction(markerAction, chainsText[i], false);
        }
    }
    clearMarkerAction(chainsText, currentChain, markerAction) {
        const [openTag, closeTag] = this.getTags(markerAction);
        const fromIndex = chainsText.indexOf(currentChain);
        // нужно от fromIndex пройти в лево и право по моссиву и если блок isbold, то снять его, если это тип bold_open или bold_close, то isDelete = true, как только блок не isbold, то остановиться
        let leftIndex = fromIndex;
        let rightIndex = fromIndex;
        const self = this;
        function clearLeft(chainsText, fromIndex) {
            for (let i = fromIndex; i >= 0; i--) {
                const isFlag = self.getIsFlagByMarkerAction(markerAction, chainsText[i]);
                if (isFlag) {
                    leftIndex = i;
                }
                else {
                    break;
                }
            }
        }
        function clearRight(chainsText, fromIndex) {
            for (let i = fromIndex; i < chainsText.length; i++) {
                const isFlag = self.getIsFlagByMarkerAction(markerAction, chainsText[i]);
                if (isFlag) {
                    rightIndex = i;
                }
                else {
                    break;
                }
            }
        }
        function markBold(chainsText, fromIndex, toIndex) {
            for (let i = fromIndex; i <= toIndex; i++) {
                const isFlag = self.getIsFlagByMarkerAction(markerAction, chainsText[i]);
                if (isFlag && chainsText[i].type == 'text') {
                    self.setFlagByMarkerAction(markerAction, chainsText[i], false);
                }
                else if (isFlag && (chainsText[i].type == openTag || chainsText[i].type == closeTag)) {
                    chainsText[i].isDelete = true;
                    self.setFlagByMarkerAction(markerAction, chainsText[i], false);
                }
            }
        }
        if (currentChain.type == 'text') {
            clearLeft(chainsText, fromIndex);
            clearRight(chainsText, fromIndex);
            markBold(chainsText, leftIndex, rightIndex);
        }
        else if (currentChain.type == openTag) {
            clearRight(chainsText, fromIndex);
            markBold(chainsText, leftIndex, rightIndex);
        }
        else if (currentChain.type == closeTag) {
            clearLeft(chainsText, fromIndex);
            markBold(chainsText, leftIndex, rightIndex);
        }
    }
    getLineText(chainsText) {
        return chainsText.reduce((acc, textChain) => {
            if (textChain.isDelete)
                return acc;
            return acc + textChain.content;
        }, "");
    }
    recalcFromTo(chainsText) {
        let from = 0;
        chainsText.forEach(chain => {
            if (chain.isDelete)
                return;
            chain.from = from;
            from = from + chain.content.length;
            chain.to = from - 1;
        });
    }
    optimizeChain(chainsText) {
        this.recalcFromTo(chainsText);
        const markers = this.getAll();
        markers.forEach(marker => {
            const markerOpen = marker.openToken;
            const markerClose = marker.closeToken;
            if (chainsText.length > 1) {
                for (let i = 0; i < chainsText.length - 1; i++) {
                    const currentChain = chainsText[i];
                    const nextChain = chainsText[i + 1];
                    if (currentChain.type == markerClose.type && nextChain.type == markerOpen.type
                        || currentChain.type == markerOpen.type && nextChain.type == markerClose.type) {
                        currentChain.isDelete = true;
                        nextChain.isDelete = true;
                    }
                }
            }
            let count = 0;
            chainsText.forEach(chain => {
                const chainIsOpenMarker = chain.type == markerOpen.type;
                if (chain.type == markerClose.type)
                    count = 0;
                if (chainIsOpenMarker && count == 1) {
                    chain.isDelete = true;
                }
                else if (chainIsOpenMarker && count == 0) {
                    count = 1;
                }
            });
            count = 0;
            for (let i = chainsText.length - 1; i >= 0; i--) {
                const chainIsCloseMarker = chainsText[i].type == markerClose.type;
                if (chainsText[i].type == markerOpen.type)
                    count = 0;
                if (chainIsCloseMarker && count == 1) {
                    chainsText[i].isDelete = true;
                }
                else if (chainIsCloseMarker && count == 0) {
                    count = 1;
                }
            }
            const lineText = this.getLineText(chainsText);
            const parser = new ParserMarkdown();
            const chainsTextNew = parser.parseLine(lineText);
            if (chainsTextNew.length > 1) {
                for (let i = 0; i < chainsText.length - 1; i++) {
                    const currentChain = chainsTextNew[i];
                    const nextChain = chainsTextNew[i + 1];
                    if (currentChain && nextChain && currentChain.type == markerClose.type && nextChain.type == markerOpen.type) {
                        this.removeChain(chainsTextNew, currentChain);
                        this.removeChain(chainsTextNew, nextChain);
                    }
                }
            }
            chainsText = chainsTextNew;
        });
        return this.getLineText(chainsText);
    }
    removeChain(chainsText, textChain) {
        const index = chainsText.indexOf(textChain);
        if (index !== -1) {
            chainsText.splice(index, 1);
        }
    }
    findBoldCloseAfter(textChain, chainsText) {
        return this.findMarkerCloseAfter('bold', textChain, chainsText);
    }
    findMarkerCloseAfter(markerAction, textChain, chainsText) {
        const markerClose = this.createCloseTag(markerAction, false);
        const startIndex = chainsText.indexOf(textChain);
        if (startIndex === -1)
            return null;
        for (let i = startIndex + 1; i < chainsText.length; i++) {
            if (chainsText[i].type === markerClose.type) {
                return chainsText[i];
            }
        }
        return null;
    }
    findBoldOpenBefore(textChain, chainsText) {
        return this.findMarkerOpenBefore('bold', textChain, chainsText);
    }
    findMarkerOpenBefore(markerAction, textChain, chainsText) {
        const markerOpen = this.createOpenTag(markerAction, false);
        const startIndex = chainsText.indexOf(textChain);
        if (startIndex === -1)
            return null;
        for (let i = startIndex; i >= 0; i--) {
            if (chainsText[i].type === markerOpen.type) {
                return chainsText[i];
            }
        }
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybWF0ZXJIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGb3JtYXRlckhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFjbEQsTUFBTSxPQUFPLGNBQWM7Q0FJMUI7QUFFRCxNQUFNLE9BQU8sU0FBUztJQUtyQixZQUFZLElBQWdCLEVBQUUsT0FBZSxDQUFDLENBQUMsRUFBRSxLQUFhLENBQUMsQ0FBQyxFQUFFLE9BQWdCLEVBQUUsUUFBaUIsS0FBSyxFQUFFLG9CQUE2QixFQUFFLGtCQUEyQjtRQUNySyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFFNUIsSUFBSSxJQUFJLElBQUksV0FBVyxFQUFFO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtTQUFFO1FBQ3BFLElBQUksSUFBSSxJQUFJLFlBQVksRUFBRTtZQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUE7U0FBRTtRQUN0RSxJQUFJLElBQUksSUFBSSxhQUFhLEVBQUU7WUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFBO1NBQUU7UUFDdEUsSUFBSSxJQUFJLElBQUksY0FBYyxFQUFFO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtTQUFFO1FBQ3ZFLElBQUksSUFBSSxJQUFJLGdCQUFnQixFQUFFO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtTQUFFO1FBQzFFLElBQUksSUFB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QUssVUFBVSxDQUFDLElBQUksRUFBRTtnQkFDM0MsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckI7U0FDRDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVmYXVsdERlc2VyaWFsaXplciB9IGZyb20gJ3Y4JztcbmltcG9ydCB7IFBhcnNlck1hcmtkb3duIH0gZnJvbSAnLi9QYXJzZXJNYXJrZG93bic7XG5pbXBvcnQgeyBFZGl0b3JTZWxlY3Rpb24gfSBmcm9tICdvYnNpZGlhbic7XG5cbmV4cG9ydCB0eXBlIE1hcmtlclR5cGUgPSAnYm9sZF9vcGVuJyB8ICdib2xkX2Nsb3NlJyB8ICdpdGFsaWNfb3BlbicgfCAnaXRhbGljX2Nsb3NlJyB8ICdoaWdobGlnaHRfb3BlbicgfCAnaGlnaGxpZ2h0X2Nsb3NlJyB8ICd0ZXh0JyB8ICdzdHJpa2V0aHJvdWdoX29wZW4nIHwgJ3N0cmlrZXRocm91Z2hfY2xvc2UnIHwgJ2NvZGVfb3BlbicgfCAnY29kZV9jbG9zZSc7XG5leHBvcnQgdHlwZSBNYXJrZXJBY3Rpb24gPSAnYm9sZCcgfCAnaXRhbGljJyB8ICdoaWdobGlnaHQnIHwgJ3N0cmlrZXRocm91Z2gnIHwgJ2NvZGUnXG4vLyBEZWZpbmUgY3VzdG9tIHRva2VuIHR5cGVzXG5pbnRlcmZhY2UgVG9rZW4ge1xuXHR0eXBlOiBzdHJpbmc7XG5cdGNvbnRlbnQ/OiBzdHJpbmc7XG5cdGhMZXZlbD86IG51bWJlcjtcblx0cGFyYW1zPzogc3RyaW5nO1xufVxuXG5cbmV4cG9ydCBjbGFzcyBMaW5lVGV4dFJlc3VsdCB7XG5cdGZyb21TZWxlY3RQb3NpdGlvbjogbnVtYmVyXG5cdHRvU2VsZWN0UG9zaXRpb24/OiBudW1iZXJcblx0bGluZVRleHQ6IHN0cmluZ1xufVxuXG5leHBvcnQgY2xhc3MgVGV4dENoYWluIHtcblx0Y29uc3RydWN0b3IodHlwZTogTWFya2VyVHlwZSk7XG5cdGNvbnN0cnVjdG9yKHR5cGU6IE1hcmtlclR5cGUsIGZyb20/OiBudW1iZXIsIHRvPzogbnVtYmVyLCBjb250ZW50Pzogc3RyaW5nKTtcblx0Y29uc3RydWN0b3IodHlwZTogTWFya2VyVHlwZSwgZnJvbT86IG51bWJlciwgdG8/OiBudW1iZXIsIGNvbnRlbnQ/OiBzdHJpbmcsIGlzTmV3PzogYm9vbGVhbik7XG5cblx0Y29uc3RydWN0b3IodHlwZTogTWFya2VyVHlwZSwgZnJvbTogbnVtYmVyID0gLTEsIHRvOiBudW1iZXIgPSAtMSwgY29udGVudD86IHN0cmluZywgaXNOZXc6IGJvb2xlYW4gPSBmYWxzZSwgZnJvbVNlbGVjdGVkUG9zaXRpb24/OiBudW1iZXIsIHRvU2VsZWN0ZWRQb3NpdGlvbj86IG51bWJlcikge1xuXHRcdHRoaXMuY29udGVudCA9IGNvbnRlbnQgfHwgJydcblxuXHRcdGlmICh0eXBlID09ICdib2xkX29wZW4nKSB7IHRoaXMuaXNCb2xkID0gdHJ1ZTsgdGhpcy5jb250ZW50ID0gJyoqJyB9XG5cdFx0aWYgKHR5cGUgPT0gJ2JvbGRfY2xvc2UnKSB7IHRoaXMuaXNCb2xkID0gZmFsc2U7IHRoaXMuY29udGVudCA9ICcqKicgfVxuXHRcdGlmICh0eXBlID09ICdpdGFsaWNfb3BlbicpIHsgdGhpcy5pc0JvbGQgPSBmYWxzZTsgdGhpcy5jb250ZW50ID0gJ18nIH1cblx0XHRpZiAodHlwZSA9PSAnaXRhbGljX2Nsb3NlJykgeyB0aGlzLmlzQm9sZCA9IGZhbHNlOyB0aGlzLmNvbnRlbnQgPSAnXycgfVxuXHRcdGlmICh0eXBlID09ICdoaWdobGlnaHRfb3BlbicpIHsgdGhpcy5pc0JvbGQgPSBmYWxzZTsgdGhpcy5jb250ZW50ID0gJz09JyB9XG5cdFx0aWYgKHR5cGUgPT0gJ2hpZ2hsaWdodF9jbG9zZScpIHsgdGhpcy5pc0JvbGQgPSBmYWxzZTsgdGhpcy5jb250ZW50ID0gJz09JyB9XG5cdFx0aWYgKHR5cGUgPT0gJ3N0cmlrZXRocm91Z2hfb3BlbicpIHsgdGhpcy5pc0JvbGQgPSBmYWxzZTsgdGhpcy5jb250ZW50ID0gJ35+JyB9XG5cdFx0aWYgKHR5cGUgPT0gJ3N0cmlrZXRocm91Z2hfY2xvc2UnKSB7IHRoaXMuaXNCb2xkID0gZmFsc2U7IHRoaXMuY29udGVudCA9ICd+ficgfVxuXHRcdGlmICh0eXBlID09ICdjb2RlX29wZW4nKSB7IHRoaXMuaXNCb2xkID0gZmFsc2U7IHRoaXMuY29udGVudCA9ICdgJyB9XG5cdFx0aWYgKHR5cGUgPT0gJ2NvZGVfY2xvc2UnKSB7IHRoaXMuaXNCb2xkID0gZmFsc2U7IHRoaXMuY29udGVudCA9ICdgJyB9XG5cblx0XHR0aGlzLmZyb20gPSBmcm9tID09IHVuZGVmaW5lZCA/IC0xIDogZnJvbTtcblx0XHR0aGlzLnRvID0gdG8gPT0gdW5kZWZpbmVkID8gLTEgOiB0bztcblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHRcdHRoaXMuaXNEZWxldGUgPSBmYWxzZTtcblx0XHR0aGlzLmlzTmV3ID0gaXNOZXcgfHwgZmFsc2U7XG5cdFx0dGhpcy5pc0JvbGQgPSBmYWxzZTtcblx0XHR0aGlzLmZyb21TZWxlY3RlZFBvc2l0aW9uID0gZnJvbVNlbGVjdGVkUG9zaXRpb247XG5cdFx0dGhpcy50b1NlbGVjdGVkUG9zaXRpb24gPSB0b1NlbGVjdGVkUG9zaXRpb247XG5cdFx0aWYgKHR5cGUgPT0gJ2JvbGRfb3BlbicgfHwgdHlwZSA9PSAnYm9sZF9jbG9zZScpIHRoaXMubWFya2VyQWN0aW9uID0gJ2JvbGQnXG5cdFx0aWYgKHR5cGUgPT0gJ2l0YWxpY19vcGVuJyB8fCB0eXBlID09ICdpdGFsaWNfY2xvc2UnKSB0aGlzLm1hcmtlckFjdGlvbiA9ICdpdGFsaWMnXG5cdFx0aWYgKHR5cGUgPT0gJ2hpZ2hsaWdodF9vcGVuJyB8fCB0eXBlID09ICdoaWdobGlnaHRfY2xvc2UnKSB0aGlzLm1hcmtlckFjdGlvbiA9ICdoaWdobGlnaHQnXG5cdFx0aWYgKHR5cGUgPT0gJ3N0cmlrZXRocm91Z2hfb3BlbicgfHwgdHlwZSA9PSAnc3RyaWtldGhyb3VnaF9jbG9zZScpIHRoaXMubWFya2VyQWN0aW9uID0gJ3N0cmlrZXRocm91Z2gnXG5cdFx0aWYgKHR5cGUgPT0gJ2NvZGVfb3BlbicgfHwgdHlwZSA9PSAnY29kZV9jbG9zZScpIHRoaXMubWFya2VyQWN0aW9uID0gJ2NvZGUnXG5cdH1cblx0aXNPcGVuTWFya2VyKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLnR5cGUgPT0gJ2JvbGRfb3BlbicgfHwgdGhpcy50eXBlID09ICdpdGFsaWNfb3BlbicgfHwgdGhpcy50eXBlID09ICdoaWdobGlnaHRfb3BlbicgfHwgdGhpcy50eXBlID09ICdzdHJpa2V0aHJvdWdoX29wZW4nIHx8IHRoaXMudHlwZSA9PSAnY29kZV9vcGVuJ1xuXHR9XG5cdGlzQ2xvc2VNYXJrZXIoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMudHlwZSA9PSAnYm9sZF9jbG9zZScgfHwgdGhpcy50eXBlID09ICdpdGFsaWNfY2xvc2UnIHx8IHRoaXMudHlwZSA9PSAnaGlnaGxpZ2h0X2Nsb3NlJyB8fCB0aGlzLnR5cGUgPT0gJ3N0cmlrZXRocm91Z2hfY2xvc2UnIHx8IHRoaXMudHlwZSA9PSAnY29kZV9jbG9zZSdcblx0fVxuXHRmcm9tOiBudW1iZXJcblx0dG86IG51bWJlclxuXHR0eXBlOiBNYXJrZXJUeXBlXG5cdGNvbnRlbnQ6IHN0cmluZ1xuXHRpc0RlbGV0ZTogYm9vbGVhblxuXHRpc0l0YWxpYzogYm9vbGVhblxuXHRpc0hpZ2hsaWdodDogYm9vbGVhblxuXHRpc1N0cmlrZXRocm91Z2g6IGJvb2xlYW5cblx0aXNDb2RlOiBib29sZWFuXG5cdGlzTmV3OiBib29sZWFuXG5cdGlzQm9sZDogYm9vbGVhblxuXHRmcm9tU2VsZWN0ZWRQb3NpdGlvbj86IG51bWJlclxuXHR0b1NlbGVjdGVkUG9zaXRpb24/OiBudW1iZXJcblx0bWFya2VyQWN0aW9uOiBNYXJrZXJBY3Rpb25cbn1cblxuZXhwb3J0IGNsYXNzIEZvcm1hdGVyQ29tbWFuZ2VyIHtcblx0cHJpdmF0ZSBzb3VyY2VUb2tlbnM6IFRva2VuW10gPSBbXVxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnNvdXJjZVRva2VucyA9IFtdXG5cdFx0dGhpcy5zb3VyY2VUb2tlbnMucHVzaCh7IHR5cGU6ICdib2xkX29wZW4nLCBjb250ZW50OiAnKionIH0pXG5cdFx0dGhpcy5zb3VyY2VUb2tlbnMucHVzaCh7IHR5cGU6ICdib2xkX2Nsb3NlJywgY29udGVudDogJyoqJyB9KVxuXHRcdHRoaXMuc291cmNlVG9rZW5zLnB1c2goeyB0eXBlOiAnaXRhbGljX29wZW4nLCBjb250ZW50OiAnXycgfSlcblx0XHR0aGlzLnNvdXJjZVRva2Vucy5wdXNoKHsgdHlwZTogJ2l0YWxpY19jbG9zZScsIGNvbnRlbnQ6ICdfJyB9KVxuXHRcdHRoaXMuc291cmNlVG9rZW5zLnB1c2goeyB0eXBlOiAnaGlnaGxpZ2h0X29wZW4nLCBjb250ZW50OiAnPT0nIH0pXG5cdFx0dGhpcy5zb3VyY2VUb2tlbnMucHVzaCh7IHR5cGU6ICdoaWdobGlnaHRfY2xvc2UnLCBjb250ZW50OiAnPT0nIH0pXG5cdFx0dGhpcy5zb3VyY2VUb2tlbnMucHVzaCh7IHR5cGU6ICdzdHJpa2V0aHJvdWdoX29wZW4nLCBjb250ZW50OiAnfn4nIH0pXG5cdFx0dGhpcy5zb3VyY2VUb2tlbnMucHVzaCh7IHR5cGU6ICdzdHJpa2V0aHJvdWdoX2Nsb3NlJywgY29udGVudDogJ35+JyB9KVxuXHRcdHRoaXMuc291cmNlVG9rZW5zLnB1c2goeyB0eXBlOiAnY29kZV9vcGVuJywgY29udGVudDogJ2AnIH0pXG5cdFx0dGhpcy5zb3VyY2VUb2tlbnMucHVzaCh7IHR5cGU6ICdjb2RlX2Nsb3NlJywgY29udGVudDogJ2AnIH0pXG5cdH1cblxuXHRnZXRTb3VyY2VUb2tlbnMobWFya2VyQWN0aW9uOiBNYXJrZXJBY3Rpb24pOiB7IG9wZW5Ub2tlbjogVG9rZW4sIGNsb3NlVG9rZW46IFRva2VuIH0ge1xuXHRcdGNvbnN0IG9wZW5Ub2tlbiA9IHRoaXMuc291cmNlVG9rZW5zLmZpbmQodG9rZW4gPT4gdG9rZW4udHlwZSA9PSBtYXJrZXJBY3Rpb24gKyAnX29wZW4nKVxuXHRcdGNvbnN0IGNsb3NlVG9rZW4gPSB0aGlzLnNvdXJjZVRva2Vucy5maW5kKHRva2VuID0+IHRva2VuLnR5cGUgPT0gbWFya2VyQWN0aW9uICsgJ19jbG9zZScpXG5cdFx0aWYgKCFvcGVuVG9rZW4gfHwgIWNsb3NlVG9rZW4pIHRocm93IG5ldyBFcnJvcihgU291cmNlIHRva2VucyBmb3IgJHttYXJrZXJBY3Rpb259IG5vdCBmb3VuZGApXG5cdFx0cmV0dXJuIHsgb3BlblRva2VuLCBjbG9zZVRva2VuIH1cblx0fVxuXG5cdGdldEFsbCgpOiB7IG9wZW5Ub2tlbjogVG9rZW4sIGNsb3NlVG9rZW46IFRva2VuLCBtYXJrZXJBY3Rpb246IE1hcmtlckFjdGlvbiB9W10ge1xuXHRcdGNvbnN0IHJlc3VsdDogeyBvcGVuVG9rZW46IFRva2VuLCBjbG9zZVRva2VuOiBUb2tlbiwgbWFya2VyQWN0aW9uOiBNYXJrZXJBY3Rpb24gfVtdID0gW11cblx0XHRjb25zdCBtYXJrZXJzOiBNYXJrZXJBY3Rpb25bXSA9IFsnYm9sZCcsICdpdGFsaWMnLCAnaGlnaGxpZ2h0JywgJ3N0cmlrZXRocm91Z2gnLCAnY29kZSddXG5cblx0XHRtYXJrZXJzLmZvckVhY2gobWFya2VyQWN0aW9uID0+IHtcblx0XHRcdGNvbnN0IHsgb3BlblRva2VuLCBjbG9zZVRva2VuIH0gPSB0aGlzLmdldFNvdXJjZVRva2VucyhtYXJrZXJBY3Rpb24pXG5cdFx0XHRyZXN1bHQucHVzaCh7IG9wZW5Ub2tlbiwgY2xvc2VUb2tlbiwgbWFya2VyQWN0aW9uIH0pXG5cdFx0fSlcblx0XHRyZXR1cm4gcmVzdWx0XG5cdH1cblxuXHRtYXJrZXJNdWx0aWxpbmUobWFya2VyQWN0aW9uOiBNYXJrZXJBY3Rpb24sIGxpbmVzOiBzdHJpbmdbXSwgc2VsZWN0aW9uOiBFZGl0b3JTZWxlY3Rpb24pOiBMaW5lVGV4dFJlc3VsdFtdIHtcblx0XHRjb25zdCByZXN1bHQ6IExpbmVUZXh0UmVzdWx0W10gPSBbXVxuXG5cdFx0bGV0IGZyb20gPSBzZWxlY3Rpb24uYW5jaG9yXG5cdFx0bGV0IHRvID0gc2VsZWN0aW9uLmhlYWRcblxuXHRcdGlmIChmcm9tLmxpbmUgPiB0by5saW5lIHx8IChmcm9tLmxpbmUgPT09IHRvLmxpbmUgJiYgZnJvbS5jaCA+IHRvLmNoKSkge1xuXHRcdFx0W2Zyb20sIHRvXSA9IFt0bywgZnJvbV1cblx0XHR9XG5cblx0XHRsaW5lcy5mb3JFYWNoKCh0ZXh0TGluZSwgaSkgPT4ge1xuXHRcdFx0Y29uc3QgZnJvbUNoYXJQb3NpdGlvbiA9IChpID09PSAwKSA/IGZyb20uY2ggOiAwOyAvLyDQntC/0YDQtdC00LXQu9C10L3QuNC1IGZyb21DaGFyUG9zaXRpb25cblx0XHRcdGNvbnN0IHRvQ2hhclBvc2l0aW9uID0gKGkgPT09IGxpbmVzLmxlbmd0aCAtIDEpID8gdG8uY2ggOiB0ZXh0TGluZS5sZW5ndGggLSAxOyAvLyDQntC/0YDQtdC00LXQu9C10L3QuNC1IHRvQ2hhclBvc2l0aW9uXG5cdFx0XHRjb25zdCBuZXdMaW5lID0gdGhpcy5tYXJrZXJNYXJrZXJBY3Rpb24obWFya2VyQWN0aW9uLCB0ZXh0TGluZSwgZnJvbUNoYXJQb3NpdGlvbiwgdG9DaGFyUG9zaXRpb24pOyAvLyDQktGL0LfQvtCyINGE0YPQvdC60YbQuNC4XG5cdFx0XHRyZXN1bHQucHVzaChuZXdMaW5lKVxuXHRcdH0pXG5cblx0XHRyZXR1cm4gcmVzdWx0XG5cdH1cblxuXHRwcml2YXRlIHNsaWNlVGV4dENoYWluKHRleHRDaGFpbjogVGV4dENoYWluLCBwb3NpdGlvbjogbnVtYmVyLCB0ZXh0Q2hhaW5pbnNlcnQ6IFRleHRDaGFpbik6IFRleHRDaGFpbltdIHtcblxuXHRcdGNvbnN0IGxlZnRDb250ZXh0ID0gdGV4dENoYWluLmNvbnRlbnQuc2xpY2UoMCwgcG9zaXRpb24pXG5cdFx0Y29uc3QgcmlnaHRDb250ZXh0ID0gdGV4dENoYWluLmNvbnRlbnQuc2xpY2UocG9zaXRpb24pXG5cdFx0Y29uc3QgbGVmdFJpZ2h0ID0gdGV4dENoYWluLmZyb20gKyBsZWZ0Q29udGV4dC5sZW5ndGggLSAxXG5cblx0XHRjb25zdCByaWdodExlZnQgPSB0ZXh0Q2hhaW4uZnJvbSArIGxlZnRDb250ZXh0Lmxlbmd0aFxuXG5cdFx0bGV0IGxlZnRTZWxlY3RQb3NpdGlvbjogbnVtYmVyIHwgdW5kZWZpbmVkXG5cdFx0aWYgKHRleHRDaGFpbi5mcm9tU2VsZWN0ZWRQb3NpdGlvbiAhPT0gdW5kZWZpbmVkICYmIHRleHRDaGFpbi5mcm9tU2VsZWN0ZWRQb3NpdGlvbiA8IGxlZnRDb250ZXh0Lmxlbmd0aCkge1xuXHRcdFx0bGVmdFNlbGVjdFBvc2l0aW9uID0gdGV4dENoYWluLmZyb21TZWxlY3RlZFBvc2l0aW9uXG5cdFx0fVxuXG5cdFx0bGV0IHJpZ2h0U2VsZWN0UG9zaXRpb246IG51bWJlciB8IHVuZGVmaW5lZFxuXHRcdGlmICh0ZXh0Q2hhaW4udG9TZWxlY3RlZFBvc2l0aW9uICE9PSB1bmRlZmluZWQgJiYgdGV4dENoYWluLnRvU2VsZWN0ZWRQb3NpdGlvbiA+PSBsZWZ0Q29udGV4dC5sZW5ndGgpIHtcblx0XHRcdHJpZ2h0U2VsZWN0UG9zaXRpb24gPSB0ZXh0Q2hhaW4udG9TZWxlY3RlZFBvc2l0aW9uIC0gbGVmdENvbnRleHQubGVuZ3RoXG5cdFx0fVxuXG5cdFx0Y29uc3QgbGVmdENoYWluID0gbmV3IFRleHRDaGFpbigndGV4dCcsIHRleHRDaGFpbi5mcm9tLCBsZWZ0UmlnaHQsIGxlZnRDb250ZXh0KVxuXHRcdGNvbnN0IHJpZ2h0Q2hhaW4gPSBuZXcgVGV4dENoYWluKCd0ZXh0JywgcmlnaHRMZWZ0LCB0ZXh0Q2hhaW4udG8sIHJpZ2h0Q29udGV4dClcblxuXHRcdGNvbnN0IHJlc3VsdCA9IFtdXG5cblx0XHRpZiAobGVmdENvbnRleHQubGVuZ3RoID4gMCkgcmVzdWx0LnB1c2gobGVmdENoYWluKVxuXHRcdHJlc3VsdC5wdXNoKHRleHRDaGFpbmluc2VydClcblx0XHRpZiAocmlnaHRDb250ZXh0Lmxlbmd0aCA+IDApIHJlc3VsdC5wdXNoKHJpZ2h0Q2hhaW4pXG5cblx0XHRyZXR1cm4gcmVzdWx0XG5cdH1cblxuXHRwcml2YXRlIGluc3RlcnRUZXh0Q2hhaW4odGV4dENoYWluczogVGV4dENoYWluW10sIG1hcmtlckFjdGlvbjogTWFya2VyQWN0aW9uLCB0ZXh0Q2hhaW46IFRleHRDaGFpbiwgcG9zaXRpb246IG51bWJlcikge1xuXHRcdGNvbnN0IFtvcGVuVGFnLCBjbG9zZVRhZ10gPSB0aGlzLmdldFRhZ3MobWFya2VyQWN0aW9uKTtcblxuXHRcdGNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXJNYXJrZG93bigpO1xuXHRcdGNvbnN0IGN1cnJlbnRUZXh0Q2hhaW4gPSBwYXJzZXIuZ2V0VGV4dENoYWluKHRleHRDaGFpbnMsIHBvc2l0aW9uKVxuXG5cdFx0aWYgKCFjdXJyZW50VGV4dENoYWluKSByZXR1cm4gdGV4dENoYWluc1xuXG5cdFx0cG9zaXRpb24gPSBwb3NpdGlvbiAtIGN1cnJlbnRUZXh0Q2hhaW4uZnJvbVxuXHRcdGNvbnN0IGN1cnJlbnRJbmRleCA9IHRleHRDaGFpbnMuaW5kZXhPZihjdXJyZW50VGV4dENoYWluKVxuXG5cdFx0aWYgKHRleHRDaGFpbi50eXBlID09IG9wZW5UYWcpIHtcblx0XHRcdGlmIChjdXJyZW50VGV4dENoYWluLnR5cGUgPT0gXCJ0ZXh0XCIpIHtcblxuXHRcdFx0XHRjb25zdCBjb250ZW50ID0gY3VycmVudFRleHRDaGFpbi5jb250ZW50XG5cdFx0XHRcdHdoaWxlIChjb250ZW50LmNoYXJBdChwb3NpdGlvbikgPT0gXCIgXCIpIHsgcG9zaXRpb24rKzsgfVxuXHRcdFx0XHRjb25zdCB0ZXh0Q2hhaW5zTmV3ID0gdGhpcy5zbGljZVRleHRDaGFpbihjdXJyZW50VGV4dENoYWluLCBwb3NpdGlvbiwgdGV4dENoYWluKVxuXHRcdFx0XHR0ZXh0Q2hhaW5zLnNwbGljZShjdXJyZW50SW5kZXgsIDEsIC4uLnRleHRDaGFpbnNOZXcpXG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRleHRDaGFpbnMuc3BsaWNlKGN1cnJlbnRJbmRleCwgMCwgdGV4dENoYWluKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmICh0ZXh0Q2hhaW4udHlwZSA9PSBjbG9zZVRhZykge1xuXHRcdFx0aWYgKGN1cnJlbnRUZXh0Q2hhaW4udHlwZSA9PSBcInRleHRcIikge1xuXG5cdFx0XHRcdGNvbnN0IGNvbnRlbnQgPSBjdXJyZW50VGV4dENoYWluLmNvbnRlbnRcblx0XHRcdFx0d2hpbGUgKGNvbnRlbnQuY2hhckF0KHBvc2l0aW9uKSA9PSBcIiBcIikgeyBwb3NpdGlvbi0tOyB9XG5cdFx0XHRcdGNvbnN0IHRleHRDaGFpbnNOZXcgPSB0aGlzLnNsaWNlVGV4dENoYWluKGN1cnJlbnRUZXh0Q2hhaW4sIHBvc2l0aW9uICsgMSwgdGV4dENoYWluKVxuXHRcdFx0XHR0ZXh0Q2hhaW5zLnNwbGljZShjdXJyZW50SW5kZXgsIDEsIC4uLnRleHRDaGFpbnNOZXcpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0ZXh0Q2hhaW5zLnNwbGljZShjdXJyZW50SW5kZXggKyAxLCAwLCB0ZXh0Q2hhaW4pXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0VGFncyhtYXJrZXJBY3Rpb246IE1hcmtlckFjdGlvbik6IE1hcmtlclR5cGVbXSB7XG5cdFx0aWYgKG1hcmtlckFjdGlvbiA9PSAnYm9sZCcpIHJldHVybiBbJ2JvbGRfb3BlbicsICdib2xkX2Nsb3NlJ11cblx0XHRpZiAobWFya2VyQWN0aW9uID09ICdoaWdobGlnaHQnKSByZXR1cm4gWydoaWdobGlnaHRfb3BlbicsICdoaWdobGlnaHRfY2xvc2UnXVxuXHRcdGlmIChtYXJrZXJBY3Rpb24gPT0gJ2l0YWxpYycpIHJldHVybiBbJ2l0YWxpY19vcGVuJywgJ2l0YWxpY19jbG9zZSddXG5cdFx0aWYgKG1hcmtlckFjdGlvbiA9PSAnc3RyaWtldGhyb3VnaCcpIHJldHVybiBbJ3N0cmlrZXRocm91Z2hfb3BlbicsICdzdHJpa2V0aHJvdWdoX2Nsb3NlJ11cblx0XHRpZiAobWFya2VyQWN0aW9uID09ICdjb2RlJykgcmV0dXJuIFsnY29kZV9vcGVuJywgJ2NvZGVfY2xvc2UnXVxuXHRcdHJldHVybiBbXVxuXHR9XG5cdHByaXZhdGUgY3JlYXRlT3BlblRhZyhtYXJrZXJBY3Rpb246IE1hcmtlckFjdGlvbiwgaXNOZXc6IGJvb2xlYW4gPSBmYWxzZSk6IFRleHRDaGFpbiB7XG5cdFx0Y29uc3QgW29wZW5UYWcsIGNsb3NlVGFnXSA9IHRoaXMuZ2V0VGFncyhtYXJrZXJBY3Rpb24pO1xuXHRcdHJldHVybiBuZXcgVGV4dENoYWluKG9wZW5UYWcsIC0xLCAtMSwgdW5kZWZpbmVkLCB0cnVlKVxuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVDbG9zZVRhZyhtYXJrZXJBY3Rpb246IE1hcmtlckFjdGlvbiwgaXNOZXc6IGJvb2xlYW4gPSBmYWxzZSk6IFRleHRDaGFpbiB7XG5cdFx0Y29uc3QgW29wZW5UYWcsIGNsb3NlVGFnXSA9IHRoaXMuZ2V0VGFncyhtYXJrZXJBY3Rpb24pO1xuXHRcdHJldHVybiBuZXcgVGV4dENoYWluKGNsb3NlVGFnLCAtMSwgLTEsIHVuZGVmaW5lZCwgdHJ1ZSlcblx0fVxuXG5cdGdldElzRmxhZ0J5TWFya2VyQWN0aW9uKG1hcmtlckFjdGlvbjogTWFya2VyQWN0aW9uLCBjaGFpbjogVGV4dENoYWluKTogYm9vbGVhbiB7XG5cdFx0aWYgKG1hcmtlckFjdGlvbiA9PSAnYm9sZCcpIHJldHVybiBjaGFpbi5pc0JvbGRcblx0XHRpZiAobWFya2VyQWN0aW9uID09ICdpdGFsaWMnKSByZXR1cm4gY2hhaW4uaXNJdGFsaWNcblx0XHRpZiAobWFya2VyQWN0aW9uID09ICdoaWdobGlnaHQnKSByZXR1cm4gY2hhaW4uaXNIaWdobGlnaHRcblx0XHRpZiAobWFya2VyQWN0aW9uID09ICdzdHJpa2V0aHJvdWdoJykgcmV0dXJuIGNoYWluLmlzU3RyaWtldGhyb3VnaFxuXHRcdGlmIChtYXJrZXJBY3Rpb24gPT0gJ2NvZGUnKSByZXR1cm4gY2hhaW4uaXNDb2RlXG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblxuXHRzZXRGbGFnQnlNYXJrZXJBY3Rpb24obWFya2VyQWN0aW9uOiBNYXJrZXJBY3Rpb24sIGNoYWluOiBUZXh0Q2hhaW4sIHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG5cdFx0aWYgKG1hcmtlckFjdGlvbiA9PSAnYm9sZCcpIGNoYWluLmlzQm9sZCA9IHZhbHVlXG5cdFx0aWYgKG1hcmtlckFjdGlvbiA9PSAnaXRhbGljJykgY2hhaW4uaXNJdGFsaWMgPSB2YWx1ZVxuXHRcdGlmIChtYXJrZXJBY3Rpb24gPT0gJ2hpZ2hsaWdodCcpIGNoYWluLmlzSGlnaGxpZ2h0ID0gdmFsdWVcblx0XHRpZiAobWFya2VyQWN0aW9uID09ICdzdHJpa2V0aHJvdWdoJykgY2hhaW4uaXNTdHJpa2V0aHJvdWdoID0gdmFsdWVcblx0XHRpZiAobWFya2VyQWN0aW9uID09ICdjb2RlJykgY2hhaW4uaXNDb2RlID0gdmFsdWVcblx0fVxuXG5cdG1hcmtlck1hcmtlckFjdGlvbihtYXJrZXJBY3Rpb246IE1hcmtlckFjdGlvbiwgdGV4dExpbmU6IHN0cmluZywgZnJvbUNoYXJQb3NpdGlvbjogbnVtYmVyLCB0b0NoYXJQb3NpdGlvbj86IG51bWJlcik6IExpbmVUZXh0UmVzdWx0IHtcblx0XHRjb25zb2xlLmxvZyhcImFjdGlvbjpcIiwgbWFya2VyQWN0aW9uLCB7IHRleHRMaW5lLCBmcm9tQ2hhclBvc2l0aW9uLCB0b0NoYXJQb3NpdGlvbiB9KVxuXG5cdFx0Y29uc3QgcGFyc2VyID0gbmV3IFBhcnNlck1hcmtkb3duKCk7XG5cdFx0Y29uc3QgY2hhaW5zVGV4dCA9IHBhcnNlci5wYXJzZUxpbmUodGV4dExpbmUsIGZyb21DaGFyUG9zaXRpb24sIHRvQ2hhclBvc2l0aW9uKTtcblxuXHRcdGNvbnN0IGNsZWFyUG9zaXRpb25Gcm9tID0gcGFyc2VyLmdldENsZWFyUG9zaXRpb24oZnJvbUNoYXJQb3NpdGlvbiwgbWFya2VyQWN0aW9uLCBjaGFpbnNUZXh0KVxuXHRcdGNvbnN0IGZyb21DaGFpblBvc2l0aW9uID0gcGFyc2VyLmdldFRleHRDaGFpbihjaGFpbnNUZXh0LCBmcm9tQ2hhclBvc2l0aW9uKSBhcyBUZXh0Q2hhaW47XG5cblx0XHRjb25zdCBbb3BlblRhZywgY2xvc2VUYWddID0gdGhpcy5nZXRUYWdzKG1hcmtlckFjdGlvbik7XG5cdFx0bGV0IGNsZWFyUG9zaXRpb25UbzogbnVtYmVyIHwgdW5kZWZpbmVkXG5cblx0XHRpZiAoZnJvbUNoYWluUG9zaXRpb24pIHtcblxuXHRcdFx0Ly8g0LLRi9C00LXQu9C10L3QuNC1INGC0LXQutGB0YLQsCDQsdC70L7QulxuXHRcdFx0aWYgKGZyb21DaGFyUG9zaXRpb24gIT09IHVuZGVmaW5lZCAmJiB0b0NoYXJQb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnN0IHRvQ2hhaW5Qb3NpdGlvbiA9IHBhcnNlci5nZXRUZXh0Q2hhaW4oY2hhaW5zVGV4dCwgdG9DaGFyUG9zaXRpb24pIGFzIFRleHRDaGFpbjtcblx0XHRcdFx0Y29uc3QgaXNGbGFnRnJvbSA9IHRoaXMuZ2V0SXNGbGFnQnlNYXJrZXJBY3Rpb24obWFya2VyQWN0aW9uLCBmcm9tQ2hhaW5Qb3NpdGlvbik7XG5cblx0XHRcdFx0Y2xlYXJQb3NpdGlvblRvID0gcGFyc2VyLmdldENsZWFyUG9zaXRpb24odG9DaGFyUG9zaXRpb24sIG1hcmtlckFjdGlvbiwgY2hhaW5zVGV4dCk7XG5cdFx0XHRcdGNvbnN0IGlzRmxhZ1RvID0gdGhpcy5nZXRJc0ZsYWdCeU1hcmtlckFjdGlvbihtYXJrZXJBY3Rpb24sIHRvQ2hhaW5Qb3NpdGlvbilcblxuXHRcdFx0XHRjb25zdCBtYXJrZXJPcGVuID0gdGhpcy5jcmVhdGVPcGVuVGFnKG1hcmtlckFjdGlvbiwgdHJ1ZSlcblx0XHRcdFx0Y29uc3QgbWFya2VyQ2xvc2UgPSB0aGlzLmNyZWF0ZUNsb3NlVGFnKG1hcmtlckFjdGlvbiwgdHJ1ZSlcblxuXHRcdFx0XHRpZiAoZnJvbUNoYWluUG9zaXRpb24gPT0gdG9DaGFpblBvc2l0aW9uKSB7XG5cdFx0XHRcdFx0aWYgKGlzRmxhZ0Zyb20pIHtcblx0XHRcdFx0XHRcdHRoaXMuaW5zdGVydFRleHRDaGFpbihjaGFpbnNUZXh0LCBtYXJrZXJBY3Rpb24sIG1hcmtlckNsb3NlLCBmcm9tQ2hhclBvc2l0aW9uIC0gMSlcblx0XHRcdFx0XHRcdHRoaXMuaW5zdGVydFRleHRDaGFpbihjaGFpbnNUZXh0LCBtYXJrZXJBY3Rpb24sIG1hcmtlck9wZW4sIHRvQ2hhclBvc2l0aW9uICsgMSlcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5pbnN0ZXJ0VGV4dENoYWluKGNoYWluc1RleHQsIG1hcmtlckFjdGlvbiwgbWFya2VyT3BlbiwgZnJvbUNoYXJQb3NpdGlvbilcblx0XHRcdFx0XHRcdHRoaXMuaW5zdGVydFRleHRDaGFpbihjaGFpbnNUZXh0LCBtYXJrZXJBY3Rpb24sIG1hcmtlckNsb3NlLCB0b0NoYXJQb3NpdGlvbilcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Ly8g0L7RgtGE0LjQu9GM0YLRgNC+0LLQsNGC0YwgY2hhaW5zVGV4dCDQvNC10LbQtNGDIGZyb21DaGFpblBvc2l0aW9uINC4IHRvQ2hhaW5Qb3NpdGlvblxuXHRcdFx0XHRcdGlmIChpc0ZsYWdGcm9tICYmIGlzRmxhZ1RvKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmNsZWFyQnlNYXJrZXJBY3Rpb24oY2hhaW5zVGV4dCwgZnJvbUNoYWluUG9zaXRpb24sIHRvQ2hhaW5Qb3NpdGlvbiwgbWFya2VyQWN0aW9uKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmICghaXNGbGFnRnJvbSAmJiAhaXNGbGFnVG8pIHtcblx0XHRcdFx0XHRcdHRoaXMuaW5zdGVydFRleHRDaGFpbihjaGFpbnNUZXh0LCBtYXJrZXJBY3Rpb24sIG1hcmtlck9wZW4sIGZyb21DaGFyUG9zaXRpb24pXG5cdFx0XHRcdFx0XHR0aGlzLmluc3RlcnRUZXh0Q2hhaW4oY2hhaW5zVGV4dCwgbWFya2VyQWN0aW9uLCBtYXJrZXJDbG9zZSwgdG9DaGFyUG9zaXRpb24pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKGlzRmxhZ0Zyb20gJiYgIWlzRmxhZ1RvKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluc3RlcnRUZXh0Q2hhaW4oY2hhaW5zVGV4dCwgbWFya2VyQWN0aW9uLCBtYXJrZXJDbG9zZSwgdG9DaGFyUG9zaXRpb24pXG5cdFx0XHRcdFx0XHR0aGlzLmNsZWFyTWFya2VyUmlnaHQoY2hhaW5zVGV4dCwgZnJvbUNoYWluUG9zaXRpb24sIG1hcmtlckNsb3NlLCBtYXJrZXJBY3Rpb24pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKCFpc0ZsYWdGcm9tICYmIGlzRmxhZ1RvKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluc3RlcnRUZXh0Q2hhaW4oY2hhaW5zVGV4dCwgbWFya2VyQWN0aW9uLCBtYXJrZXJPcGVuLCBmcm9tQ2hhclBvc2l0aW9uKVxuXHRcdFx0XHRcdFx0dGhpcy5jbGVhck1hcmtlckxlZnQoY2hhaW5zVGV4dCwgbWFya2VyT3BlbiwgdG9DaGFpblBvc2l0aW9uLCBtYXJrZXJBY3Rpb24pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyDQv9GA0L7RgdGC0L4g0LrRg9GA0YHQvtGAINCx0LXQtyDQstGL0LTQtdC70LXQvdC40Y8gXG5cdFx0XHRlbHNlIGlmIChmcm9tQ2hhclBvc2l0aW9uICE9PSB1bmRlZmluZWQgJiYgdG9DaGFyUG9zaXRpb24gPT0gdW5kZWZpbmVkKSB7XG5cblx0XHRcdFx0Y29uc3Qgc3BhY2VDaGFycyA9IFsnICcsICdcXG4nLCAnXFx0J11cblx0XHRcdFx0aWYgKHNwYWNlQ2hhcnMuaW5jbHVkZXModGV4dExpbmUuY2hhckF0KGZyb21DaGFyUG9zaXRpb24pKSAmJiB0b0NoYXJQb3NpdGlvbiA9PSB1bmRlZmluZWQpIHJldHVybiB7IGZyb21TZWxlY3RQb3NpdGlvbjogZnJvbUNoYXJQb3NpdGlvbiwgdG9TZWxlY3RQb3NpdGlvbjogZnJvbUNoYXJQb3NpdGlvbiwgbGluZVRleHQ6IHRleHRMaW5lIH1cblxuXHRcdFx0XHRjb25zdCBpc0ZsYWcgPSB0aGlzLmdldElzRmxhZ0J5TWFya2VyQWN0aW9uKG1hcmtlckFjdGlvbiwgZnJvbUNoYWluUG9zaXRpb24pXG5cdFx0XHRcdGlmIChpc0ZsYWcpIHtcblx0XHRcdFx0XHR0aGlzLmNsZWFyTWFya2VyQWN0aW9uKGNoYWluc1RleHQsIGZyb21DaGFpblBvc2l0aW9uLCBtYXJrZXJBY3Rpb24pXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoZnJvbUNoYWluUG9zaXRpb24udHlwZSA9PSAndGV4dCcpIHtcblx0XHRcdFx0XHRjb25zdCBpbmRleCA9IGNoYWluc1RleHQuaW5kZXhPZihmcm9tQ2hhaW5Qb3NpdGlvbik7XG5cblx0XHRcdFx0XHRjb25zdCBjb250ZW50ID0gZnJvbUNoYWluUG9zaXRpb24uY29udGVudDtcblx0XHRcdFx0XHRjb25zdCBwYXJ0cyA9IGNvbnRlbnQuc3BsaXQoXCIgXCIpO1xuXHRcdFx0XHRcdHBhcnRzLm1hcChwYXJ0ID0+IHsgaWYgKHBhcnQgPT0gXCJcIikgcGFydCA9IFwiIFwiIH0pXG5cdFx0XHRcdFx0bGV0IGN1cnNvciA9IGZyb21DaGFpblBvc2l0aW9uLmZyb207XG5cblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBiZWdpblBhcnQgPSBjdXJzb3Jcblx0XHRcdFx0XHRcdGNvbnN0IGVuZFBhcnQgPSBjdXJzb3IgKyBwYXJ0c1tpXS5sZW5ndGggLSAxXG5cdFx0XHRcdFx0XHRpZiAoZnJvbUNoYXJQb3NpdGlvbiA+PSBiZWdpblBhcnQgJiYgZnJvbUNoYXJQb3NpdGlvbiA8PSBlbmRQYXJ0KSB7XG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgYm9sZE9wZW4gPSB0aGlzLmNyZWF0ZU9wZW5UYWcobWFya2VyQWN0aW9uLCB0cnVlKVxuXHRcdFx0XHRcdFx0XHRjb25zdCBib2xkQ2xvc2UgPSB0aGlzLmNyZWF0ZUNsb3NlVGFnKG1hcmtlckFjdGlvbiwgdHJ1ZSlcblx0XHRcdFx0XHRcdFx0dGhpcy5pbnN0ZXJ0VGV4dENoYWluKGNoYWluc1RleHQsIG1hcmtlckFjdGlvbiwgYm9sZE9wZW4sIGJlZ2luUGFydClcblx0XHRcdFx0XHRcdFx0dGhpcy5pbnN0ZXJ0VGV4dENoYWluKGNoYWluc1RleHQsIG1hcmtlckFjdGlvbiwgYm9sZENsb3NlLCBlbmRQYXJ0KVxuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGN1cnNvciArPSBwYXJ0c1tpXS5sZW5ndGggKyAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRjb25zb2xlLmxvZyhcImNoYWluc1RleHRcIiwgY2hhaW5zVGV4dClcblxuXHRcdGNvbnN0IGxpbmVUZXh0ID0gdGhpcy5vcHRpbWl6ZUNoYWluKGNoYWluc1RleHQpXG5cblx0XHRsZXQgZnJvbVBvc2l0aW9uQ3Vyc29yID0gMFxuXHRcdGlmIChmcm9tQ2hhclBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGxldCBvZmZzZXQgPSAwXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoYWluc1RleHQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgY2hhaW4gPSBjaGFpbnNUZXh0W2ldXG5cdFx0XHRcdGlmIChjaGFpbi5pc05ldykge1xuXHRcdFx0XHRcdG9mZnNldCA9IG9mZnNldCArIGNoYWluLmNvbnRlbnQubGVuZ3RoXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGNoYWluLmlzRGVsZXRlKSB7XG5cdFx0XHRcdFx0b2Zmc2V0ID0gb2Zmc2V0IC0gY2hhaW4uY29udGVudC5sZW5ndGhcblx0XHRcdFx0XHRjb250aW51ZVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjaGFpbi5mcm9tIDw9IGZyb21DaGFyUG9zaXRpb24gKyBvZmZzZXQgJiYgZnJvbUNoYXJQb3NpdGlvbiArIG9mZnNldCA8PSBjaGFpbi50bykge1xuXHRcdFx0XHRcdGZyb21Qb3NpdGlvbkN1cnNvciA9IGZyb21DaGFyUG9zaXRpb24gKyBvZmZzZXRcblx0XHRcdFx0XHRpZiAoY2hhaW4udHlwZSA9PSBvcGVuVGFnKSBmcm9tUG9zaXRpb25DdXJzb3IgPSBjaGFpbi50byArIDFcblx0XHRcdFx0XHRpZiAoY2hhaW4udHlwZSA9PSBjbG9zZVRhZykgZnJvbVBvc2l0aW9uQ3Vyc29yID0gY2hhaW4uZnJvbSAtIDFcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGV0IHRvUG9zaXRpb25DdXJzb3IgPSAwXG5cdFx0aWYgKHRvQ2hhclBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGxldCBvZmZzZXQgPSAwXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoYWluc1RleHQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgY2hhaW4gPSBjaGFpbnNUZXh0W2ldXG5cdFx0XHRcdGlmIChjaGFpbi5pc05ldykge1xuXHRcdFx0XHRcdG9mZnNldCA9IG9mZnNldCAtIGNoYWluLmNvbnRlbnQubGVuZ3RoXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGNoYWluLmlzRGVsZXRlKSB7XG5cdFx0XHRcdFx0b2Zmc2V0ID0gb2Zmc2V0ICsgY2hhaW4uY29udGVudC5sZW5ndGhcblx0XHRcdFx0XHRjb250aW51ZVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjaGFpbi5mcm9tIDw9IHRvQ2hhclBvc2l0aW9uICsgb2Zmc2V0ICYmIHRvQ2hhclBvc2l0aW9uICsgb2Zmc2V0IDw9IGNoYWluLnRvKSB7XG5cdFx0XHRcdFx0dG9Qb3NpdGlvbkN1cnNvciA9IHRvQ2hhclBvc2l0aW9uIC0gb2Zmc2V0IC0gMVxuXHRcdFx0XHRcdGlmIChjaGFpbi50eXBlID09IG9wZW5UYWcpIHRvUG9zaXRpb25DdXJzb3IgPSBjaGFpbi50byArIDFcblx0XHRcdFx0XHRpZiAoY2hhaW4udHlwZSA9PSBjbG9zZVRhZykgdG9Qb3NpdGlvbkN1cnNvciA9IGNoYWluLmZyb20gLSAxXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4geyBmcm9tU2VsZWN0UG9zaXRpb246IGZyb21Qb3NpdGlvbkN1cnNvciwgdG9TZWxlY3RQb3NpdGlvbjogdG9Qb3NpdGlvbkN1cnNvciwgbGluZVRleHQ6IGxpbmVUZXh0IH1cblx0fVxuXG5cdG1hcmtlckJvbGQodGV4dExpbmU6IHN0cmluZywgZnJvbUNoYXJQb3NpdGlvbjogbnVtYmVyLCB0b0NoYXJQb3NpdGlvbj86IG51bWJlcik6IExpbmVUZXh0UmVzdWx0IHtcblx0XHRyZXR1cm4gdGhpcy5tYXJrZXJNYXJrZXJBY3Rpb24oJ2JvbGQnLCB0ZXh0TGluZSwgZnJvbUNoYXJQb3NpdGlvbiwgdG9DaGFyUG9zaXRpb24pXG5cdH1cblx0bWFya2VySXRhbGljKHRleHRMaW5lOiBzdHJpbmcsIGZyb21DaGFyUG9zaXRpb246IG51bWJlciwgdG9DaGFyUG9zaXRpb24/OiBudW1iZXIpOiBMaW5lVGV4dFJlc3VsdCB7XG5cdFx0cmV0dXJuIHRoaXMubWFya2VyTWFya2VyQWN0aW9uKCdpdGFsaWMnLCB0ZXh0TGluZSwgZnJvbUNoYXJQb3NpdGlvbiwgdG9DaGFyUG9zaXRpb24pXG5cdH1cblxuXHRtYXJrZXJTdHJpa2V0aHJvdWdoKHRleHRMaW5lOiBzdHJpbmcsIGZyb21DaGFyUG9zaXRpb246IG51bWJlciwgdG9DaGFyUG9zaXRpb24/OiBudW1iZXIpOiBMaW5lVGV4dFJlc3VsdCB7XG5cdFx0cmV0dXJuIHRoaXMubWFya2VyTWFya2VyQWN0aW9uKCdzdHJpa2V0aHJvdWdoJywgdGV4dExpbmUsIGZyb21DaGFyUG9zaXRpb24sIHRvQ2hhclBvc2l0aW9uKVxuXHR9XG5cdHByaXZhdGUgZGVsZXRlQ2hhaW4oY2hhaW5zVGV4dDogVGV4dENoYWluW10sIGZyb206IFRleHRDaGFpbiwgdG86IFRleHRDaGFpbikge1xuXHRcdGNvbnN0IGZyb21JbmRleCA9IGNoYWluc1RleHQuaW5kZXhPZihmcm9tKVxuXHRcdGNvbnN0IHRvSW5kZXggPSBjaGFpbnNUZXh0LmluZGV4T2YodG8pXG5cdFx0Y2hhaW5zVGV4dC5zcGxpY2UoZnJvbUluZGV4ICsgMSwgdG9JbmRleCAtIGZyb21JbmRleCAtIDEpLmZvckVhY2goY2hhaW4gPT4ge1xuXHRcdFx0aWYgKGNoYWluLnR5cGUgIT0gJ3RleHQnKSBjaGFpbi5pc0RlbGV0ZSA9IHRydWVcblx0XHR9KVxuXHR9XG5cblxuXHRwcml2YXRlIGNsZWFyQnlNYXJrZXJBY3Rpb24oY2hhaW5zVGV4dDogVGV4dENoYWluW10sIGZyb206IFRleHRDaGFpbiwgdG86IFRleHRDaGFpbiwgbWFya2VyQWN0aW9uOiBNYXJrZXJBY3Rpb24pIHtcblx0XHRjb25zdCBmcm9tSW5kZXggPSBjaGFpbnNUZXh0LmluZGV4T2YoZnJvbSlcblx0XHRjb25zdCB0b0luZGV4ID0gY2hhaW5zVGV4dC5pbmRleE9mKHRvKVxuXHRcdGNvbnN0IFtvcGVuVGFnLCBjbG9zZVRhZ10gPSB0aGlzLmdldFRhZ3MobWFya2VyQWN0aW9uKTtcblxuXHRcdGZvciAobGV0IGkgPSBmcm9tSW5kZXg7IGkgPD0gdG9JbmRleDsgaSsrKSB7XG5cdFx0XHRpZiAoY2hhaW5zVGV4dFtpXS50eXBlID09IG9wZW5UYWcgfHwgY2hhaW5zVGV4dFtpXS50eXBlID09IGNsb3NlVGFnKSB7XG5cdFx0XHRcdHRoaXMuc2V0RmxhZ0J5TWFya2VyQWN0aW9uKG1hcmtlckFjdGlvbiwgY2hhaW5zVGV4dFtpXSwgdHJ1ZSlcblx0XHRcdFx0Y2hhaW5zVGV4dFtpXS5pc0RlbGV0ZSA9IHRydWVcblx0XHRcdH1cblx0XHRcdGlmIChjaGFpbnNUZXh0W2ldLnR5cGUgPT0gJ3RleHQnKSB0aGlzLnNldEZsYWdCeU1hcmtlckFjdGlvbihtYXJrZXJBY3Rpb24sIGNoYWluc1RleHRbaV0sIHRydWUpXG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgY2xlYXJNYXJrZXJSaWdodChjaGFpbnNUZXh0OiBUZXh0Q2hhaW5bXSwgZnJvbTogVGV4dENoYWluLCB0bzogVGV4dENoYWluLCBtYXJrZXJBY3Rpb246IE1hcmtlckFjdGlvbikge1xuXHRcdGNvbnN0IFtvcGVuVGFnLCBjbG9zZVRhZ10gPSB0aGlzLmdldFRhZ3MobWFya2VyQWN0aW9uKTtcblx0XHRjb25zdCBmcm9tSW5kZXggPSBjaGFpbnNUZXh0LmluZGV4T2YoZnJvbSlcblx0XHRjb25zdCB0b0luZGV4ID0gY2hhaW5zVGV4dC5pbmRleE9mKHRvKVxuXHRcdGZvciAobGV0IGkgPSBmcm9tSW5kZXggKyAxOyBpIDwgdG9JbmRleDsgaSsrKSB7XG5cdFx0XHRpZiAoY2hhaW5zVGV4dFtpXS50eXBlID09IG9wZW5UYWcgfHwgY2hhaW5zVGV4dFtpXS50eXBlID09IGNsb3NlVGFnKSB7XG5cdFx0XHRcdGNoYWluc1RleHRbaV0uaXNEZWxldGUgPSB0cnVlXG5cdFx0XHRcdHRoaXMuc2V0RmxhZ0J5TWFya2VyQWN0aW9uKG1hcmtlckFjdGlvbiwgY2hhaW5zVGV4dFtpXSwgZmFsc2UpXG5cdFx0XHR9XG5cdFx0XHRpZiAoY2hhaW5zVGV4dFtpXS50eXBlICE9ICd0ZXh0JykgdGhpcy5zZXRGbGFnQnlNYXJrZXJBY3Rpb24obWFya2VyQWN0aW9uLCBjaGFpbnNUZXh0W2ldLCBmYWxzZSlcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGNsZWFyTWFya2VyTGVmdChjaGFpbnNUZXh0OiBUZXh0Q2hhaW5bXSwgZnJvbTogVGV4dENoYWluLCB0bzogVGV4dENoYWluLCBtYXJrZXJBY3Rpb246IE1hcmtlckFjdGlvbikge1xuXHRcdGNvbnN0IFtvcGVuVGFnLCBjbG9zZVRhZ10gPSB0aGlzLmdldFRhZ3MobWFya2VyQWN0aW9uKTtcblx0XHRjb25zdCBmcm9tSW5kZXggPSBjaGFpbnNUZXh0LmluZGV4T2YoZnJvbSlcblx0XHRjb25zdCB0b0luZGV4ID0gY2hhaW5zVGV4dC5pbmRleE9mKHRvKVxuXHRcdGZvciAobGV0IGkgPSBmcm9tSW5kZXggKyAxOyBpIDwgdG9JbmRleDsgaSsrKSB7XG5cdFx0XHRpZiAoY2hhaW5zVGV4dFtpXS50eXBlID09IG9wZW5UYWcgfHwgY2hhaW5zVGV4dFtpXS50eXBlID09IGNsb3NlVGFnKSB7XG5cdFx0XHRcdHRoaXMuc2V0RmxhZ0J5TWFya2VyQWN0aW9uKG1hcmtlckFjdGlvbiwgY2hhaW5zVGV4dFtpXSwgZmFsc2UpXG5cdFx0XHRcdGNoYWluc1RleHRbaV0uaXNEZWxldGUgPSB0cnVlXG5cdFx0XHR9XG5cdFx0XHRpZiAoY2hhaW5zVGV4dFtpXS50eXBlID09ICd0ZXh0JykgdGhpcy5zZXRGbGFnQnlNYXJrZXJBY3Rpb24obWFya2VyQWN0aW9uLCBjaGFpbnNUZXh0W2ldLCBmYWxzZSlcblx0XHR9XG5cdH1cblxuXG5cdHByaXZhdGUgY2xlYXJNYXJrZXJBY3Rpb24oY2hhaW5zVGV4dDogVGV4dENoYWluW10sIGN1cnJlbnRDaGFpbjogVGV4dENoYWluLCBtYXJrZXJBY3Rpb246IE1hcmtlckFjdGlvbikge1xuXHRcdGNvbnN0IFtvcGVuVGFnLCBjbG9zZVRhZ10gPSB0aGlzLmdldFRhZ3MobWFya2VyQWN0aW9uKTtcblxuXHRcdGNvbnN0IGZyb21JbmRleCA9IGNoYWluc1RleHQuaW5kZXhPZihjdXJyZW50Q2hhaW4pXG5cdFx0Ly8g0L3Rg9C20L3QviDQvtGCIGZyb21JbmRleCDQv9GA0L7QudGC0Lgg0LIg0LvQtdCy0L4g0Lgg0L/RgNCw0LLQviDQv9C+INC80L7RgdGB0LjQstGDINC4INC10YHQu9C4INCx0LvQvtC6IGlzYm9sZCwg0YLQviDRgdC90Y/RgtGMINC10LPQviwg0LXRgdC70Lgg0Y3RgtC+INGC0LjQvyBib2xkX29wZW4g0LjQu9C4IGJvbGRfY2xvc2UsINGC0L4gaXNEZWxldGUgPSB0cnVlLCDQutCw0Log0YLQvtC70YzQutC+INCx0LvQvtC6INC90LUgaXNib2xkLCDRgtC+INC+0YHRgtCw0L3QvtCy0LjRgtGM0YHRj1xuXHRcdGxldCBsZWZ0SW5kZXggPSBmcm9tSW5kZXhcblx0XHRsZXQgcmlnaHRJbmRleCA9IGZyb21JbmRleFxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0ZnVuY3Rpb24gY2xlYXJMZWZ0KGNoYWluc1RleHQ6IFRleHRDaGFpbltdLCBmcm9tSW5kZXg6IG51bWJlcikge1xuXHRcdFx0Zm9yIChsZXQgaSA9IGZyb21JbmRleDsgaSA+PSAwOyBpLS0pIHtcblxuXHRcdFx0XHRjb25zdCBpc0ZsYWcgPSBzZWxmLmdldElzRmxhZ0J5TWFya2VyQWN0aW9uKG1hcmtlckFjdGlvbiwgY2hhaW5zVGV4dFtpXSlcblx0XHRcdFx0aWYgKGlzRmxhZykgeyBsZWZ0SW5kZXggPSBpIH1cblx0XHRcdFx0ZWxzZSB7IGJyZWFrIH1cblx0XHRcdH1cblx0XHR9XG5cblxuXHRcdGZ1bmN0aW9uIGNsZWFyUmlnaHQoY2hhaW5zVGV4dDogVGV4dENoYWluW10sIGZyb21JbmRleDogbnVtYmVyKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gZnJvbUluZGV4OyBpIDwgY2hhaW5zVGV4dC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBpc0ZsYWcgPSBzZWxmLmdldElzRmxhZ0J5TWFya2VyQWN0aW9uKG1hcmtlckFjdGlvbiwgY2hhaW5zVGV4dFtpXSlcblx0XHRcdFx0aWYgKGlzRmxhZykgeyByaWdodEluZGV4ID0gaSB9XG5cdFx0XHRcdGVsc2UgeyBicmVhayB9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbWFya0JvbGQoY2hhaW5zVGV4dDogVGV4dENoYWluW10sIGZyb21JbmRleDogbnVtYmVyLCB0b0luZGV4OiBudW1iZXIpIHtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IGZyb21JbmRleDsgaSA8PSB0b0luZGV4OyBpKyspIHtcblx0XHRcdFx0Y29uc3QgaXNGbGFnID0gc2VsZi5nZXRJc0ZsYWdCeU1hcmtlckFjdGlvbihtYXJrZXJBY3Rpb24sIGNoYWluc1RleHRbaV0pXG5cdFx0XHRcdGlmIChpc0ZsYWcgJiYgY2hhaW5zVGV4dFtpXS50eXBlID09ICd0ZXh0Jykge1xuXHRcdFx0XHRcdHNlbGYuc2V0RmxhZ0J5TWFya2VyQWN0aW9uKG1hcmtlckFjdGlvbiwgY2hhaW5zVGV4dFtpXSwgZmFsc2UpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoaXNGbGFnICYmIChjaGFpbnNUZXh0W2ldLnR5cGUgPT0gb3BlblRhZyB8fCBjaGFpbnNUZXh0W2ldLnR5cGUgPT0gY2xvc2VUYWcpKSB7XG5cdFx0XHRcdFx0Y2hhaW5zVGV4dFtpXS5pc0RlbGV0ZSA9IHRydWVcblx0XHRcdFx0XHRzZWxmLnNldEZsYWdCeU1hcmtlckFjdGlvbihtYXJrZXJBY3Rpb24sIGNoYWluc1RleHRbaV0sIGZhbHNlKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGN1cnJlbnRDaGFpbi50eXBlID09ICd0ZXh0Jykge1xuXHRcdFx0Y2xlYXJMZWZ0KGNoYWluc1RleHQsIGZyb21JbmRleClcblx0XHRcdGNsZWFyUmlnaHQoY2hhaW5zVGV4dCwgZnJvbUluZGV4KVxuXHRcdFx0bWFya0JvbGQoY2hhaW5zVGV4dCwgbGVmdEluZGV4LCByaWdodEluZGV4KVxuXHRcdH0gZWxzZSBpZiAoY3VycmVudENoYWluLnR5cGUgPT0gb3BlblRhZykge1xuXHRcdFx0Y2xlYXJSaWdodChjaGFpbnNUZXh0LCBmcm9tSW5kZXgpXG5cdFx0XHRtYXJrQm9sZChjaGFpbnNUZXh0LCBsZWZ0SW5kZXgsIHJpZ2h0SW5kZXgpXG5cdFx0fSBlbHNlIGlmIChjdXJyZW50Q2hhaW4udHlwZSA9PSBjbG9zZVRhZykge1xuXHRcdFx0Y2xlYXJMZWZ0KGNoYWluc1RleHQsIGZyb21JbmRleClcblx0XHRcdG1hcmtCb2xkKGNoYWluc1RleHQsIGxlZnRJbmRleCwgcmlnaHRJbmRleClcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGdldExpbmVUZXh0KGNoYWluc1RleHQ6IFRleHRDaGFpbltdKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gY2hhaW5zVGV4dC5yZWR1Y2UoKGFjYywgdGV4dENoYWluKSA9PiB7XG5cdFx0XHRpZiAodGV4dENoYWluLmlzRGVsZXRlKSByZXR1cm4gYWNjXG5cdFx0XHRyZXR1cm4gYWNjICsgdGV4dENoYWluLmNvbnRlbnRcblx0XHR9LCBcIlwiKTtcblx0fVxuXHRwcml2YXRlIHJlY2FsY0Zyb21UbyhjaGFpbnNUZXh0OiBUZXh0Q2hhaW5bXSkge1xuXHRcdGxldCBmcm9tID0gMFxuXHRcdGNoYWluc1RleHQuZm9yRWFjaChjaGFpbiA9PiB7XG5cdFx0XHRpZiAoY2hhaW4uaXNEZWxldGUpIHJldHVyblxuXHRcdFx0Y2hhaW4uZnJvbSA9IGZyb21cblx0XHRcdGZyb20gPSBmcm9tICsgY2hhaW4uY29udGVudC5sZW5ndGhcblx0XHRcdGNoYWluLnRvID0gZnJvbSAtIDFcblx0XHR9KVxuXHR9XG5cblx0cHJpdmF0ZSBvcHRpbWl6ZUNoYWluKGNoYWluc1RleHQ6IFRleHRDaGFpbltdKTogc3RyaW5nIHtcblx0XHR0aGlzLnJlY2FsY0Zyb21UbyhjaGFpbnNUZXh0KVxuXHRcdGNvbnN0IG1hcmtlcnMgPSB0aGlzLmdldEFsbCgpXG5cdFx0bWFya2Vycy5mb3JFYWNoKG1hcmtlciA9PiB7XG5cdFx0XHRjb25zdCBtYXJrZXJPcGVuID0gbWFya2VyLm9wZW5Ub2tlblxuXHRcdFx0Y29uc3QgbWFya2VyQ2xvc2UgPSBtYXJrZXIuY2xvc2VUb2tlblxuXG5cdFx0XHRpZiAoY2hhaW5zVGV4dC5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hhaW5zVGV4dC5sZW5ndGggLSAxOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCBjdXJyZW50Q2hhaW4gPSBjaGFpbnNUZXh0W2ldO1xuXHRcdFx0XHRcdGNvbnN0IG5leHRDaGFpbiA9IGNoYWluc1RleHRbaSArIDFdO1xuXHRcdFx0XHRcdGlmIChjdXJyZW50Q2hhaW4udHlwZSA9PSBtYXJrZXJDbG9zZS50eXBlICYmIG5leHRDaGFpbi50eXBlID09IG1hcmtlck9wZW4udHlwZVxuXHRcdFx0XHRcdFx0fHwgY3VycmVudENoYWluLnR5cGUgPT0gbWFya2VyT3Blbi50eXBlICYmIG5leHRDaGFpbi50eXBlID09IG1hcmtlckNsb3NlLnR5cGVcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGN1cnJlbnRDaGFpbi5pc0RlbGV0ZSA9IHRydWVcblx0XHRcdFx0XHRcdG5leHRDaGFpbi5pc0RlbGV0ZSA9IHRydWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bGV0IGNvdW50ID0gMFxuXHRcdFx0Y2hhaW5zVGV4dC5mb3JFYWNoKGNoYWluID0+IHtcblx0XHRcdFx0Y29uc3QgY2hhaW5Jc09wZW5NYXJrZXIgPSBjaGFpbi50eXBlID09IG1hcmtlck9wZW4udHlwZVxuXHRcdFx0XHRpZiAoY2hhaW4udHlwZSA9PSBtYXJrZXJDbG9zZS50eXBlKSBjb3VudCA9IDBcblxuXHRcdFx0XHRpZiAoY2hhaW5Jc09wZW5NYXJrZXIgJiYgY291bnQgPT0gMSkge1xuXHRcdFx0XHRcdGNoYWluLmlzRGVsZXRlID0gdHJ1ZVxuXHRcdFx0XHR9IGVsc2UgaWYgKGNoYWluSXNPcGVuTWFya2VyICYmIGNvdW50ID09IDApIHtcblx0XHRcdFx0XHRjb3VudCA9IDFcblx0XHRcdFx0fVxuXG5cdFx0XHR9KVxuXG5cdFx0XHRjb3VudCA9IDBcblx0XHRcdGZvciAobGV0IGkgPSBjaGFpbnNUZXh0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdGNvbnN0IGNoYWluSXNDbG9zZU1hcmtlciA9IGNoYWluc1RleHRbaV0udHlwZSA9PSBtYXJrZXJDbG9zZS50eXBlXG5cblx0XHRcdFx0aWYgKGNoYWluc1RleHRbaV0udHlwZSA9PSBtYXJrZXJPcGVuLnR5cGUpIGNvdW50ID0gMFxuXG5cdFx0XHRcdGlmIChjaGFpbklzQ2xvc2VNYXJrZXIgJiYgY291bnQgPT0gMSkge1xuXHRcdFx0XHRcdGNoYWluc1RleHRbaV0uaXNEZWxldGUgPSB0cnVlXG5cdFx0XHRcdH0gZWxzZSBpZiAoY2hhaW5Jc0Nsb3NlTWFya2VyICYmIGNvdW50ID09IDApIHtcblx0XHRcdFx0XHRjb3VudCA9IDFcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBsaW5lVGV4dCA9IHRoaXMuZ2V0TGluZVRleHQoY2hhaW5zVGV4dClcblx0XHRcdGNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXJNYXJrZG93bigpO1xuXHRcdFx0Y29uc3QgY2hhaW5zVGV4dE5ldyA9IHBhcnNlci5wYXJzZUxpbmUobGluZVRleHQpO1xuXG5cdFx0XHRpZiAoY2hhaW5zVGV4dE5ldy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hhaW5zVGV4dC5sZW5ndGggLSAxOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCBjdXJyZW50Q2hhaW4gPSBjaGFpbnNUZXh0TmV3W2ldO1xuXHRcdFx0XHRcdGNvbnN0IG5leHRDaGFpbiA9IGNoYWluc1RleHROZXdbaSArIDFdO1xuXHRcdFx0XHRcdGlmIChjdXJyZW50Q2hhaW4gJiYgbmV4dENoYWluICYmIGN1cnJlbnRDaGFpbi50eXBlID09IG1hcmtlckNsb3NlLnR5cGUgJiYgbmV4dENoYWluLnR5cGUgPT0gbWFya2VyT3Blbi50eXBlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJlbW92ZUNoYWluKGNoYWluc1RleHROZXcsIGN1cnJlbnRDaGFpbilcblx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlQ2hhaW4oY2hhaW5zVGV4dE5ldywgbmV4dENoYWluKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y2hhaW5zVGV4dCA9IGNoYWluc1RleHROZXdcblx0XHR9KVxuXHRcdHJldHVybiB0aGlzLmdldExpbmVUZXh0KGNoYWluc1RleHQpXG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUNoYWluKGNoYWluc1RleHQ6IFRleHRDaGFpbltdLCB0ZXh0Q2hhaW46IFRleHRDaGFpbikge1xuXHRcdGNvbnN0IGluZGV4ID0gY2hhaW5zVGV4dC5pbmRleE9mKHRleHRDaGFpbik7XG5cdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0Y2hhaW5zVGV4dC5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdH1cblx0fVxuXG5cblx0ZmluZEJvbGRDbG9zZUFmdGVyKHRleHRDaGFpbjogVGV4dENoYWluLCBjaGFpbnNUZXh0OiBUZXh0Q2hhaW5bXSk6IFRleHRDaGFpbiB8IG51bGwge1xuXHRcdHJldHVybiB0aGlzLmZpbmRNYXJrZXJDbG9zZUFmdGVyKCdib2xkJywgdGV4dENoYWluLCBjaGFpbnNUZXh0KVxuXHR9XG5cblx0ZmluZE1hcmtlckNsb3NlQWZ0ZXIobWFya2VyQWN0aW9uOiBNYXJrZXJBY3Rpb24sIHRleHRDaGFpbjogVGV4dENoYWluLCBjaGFpbnNUZXh0OiBUZXh0Q2hhaW5bXSk6IFRleHRDaGFpbiB8IG51bGwge1xuXHRcdGNvbnN0IG1hcmtlckNsb3NlID0gdGhpcy5jcmVhdGVDbG9zZVRhZyhtYXJrZXJBY3Rpb24sIGZhbHNlKVxuXHRcdGNvbnN0IHN0YXJ0SW5kZXggPSBjaGFpbnNUZXh0LmluZGV4T2YodGV4dENoYWluKTtcblx0XHRpZiAoc3RhcnRJbmRleCA9PT0gLTEpIHJldHVybiBudWxsO1xuXG5cdFx0Zm9yIChsZXQgaSA9IHN0YXJ0SW5kZXggKyAxOyBpIDwgY2hhaW5zVGV4dC5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGNoYWluc1RleHRbaV0udHlwZSA9PT0gbWFya2VyQ2xvc2UudHlwZSkge1xuXHRcdFx0XHRyZXR1cm4gY2hhaW5zVGV4dFtpXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRmaW5kQm9sZE9wZW5CZWZvcmUodGV4dENoYWluOiBUZXh0Q2hhaW4sIGNoYWluc1RleHQ6IFRleHRDaGFpbltdKTogVGV4dENoYWluIHwgbnVsbCB7XG5cdFx0cmV0dXJuIHRoaXMuZmluZE1hcmtlck9wZW5CZWZvcmUoJ2JvbGQnLCB0ZXh0Q2hhaW4sIGNoYWluc1RleHQpXG5cdH1cblx0ZmluZE1hcmtlck9wZW5CZWZvcmUobWFya2VyQWN0aW9uOiBNYXJrZXJBY3Rpb24sIHRleHRDaGFpbjogVGV4dENoYWluLCBjaGFpbnNUZXh0OiBUZXh0Q2hhaW5bXSk6IFRleHRDaGFpbiB8IG51bGwge1xuXG5cdFx0Y29uc3QgbWFya2VyT3BlbiA9IHRoaXMuY3JlYXRlT3BlblRhZyhtYXJrZXJBY3Rpb24sIGZhbHNlKVxuXHRcdGNvbnN0IHN0YXJ0SW5kZXggPSBjaGFpbnNUZXh0LmluZGV4T2YodGV4dENoYWluKTtcblx0XHRpZiAoc3RhcnRJbmRleCA9PT0gLTEpIHJldHVybiBudWxsO1xuXG5cdFx0Zm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRpZiAoY2hhaW5zVGV4dFtpXS50eXBlID09PSBtYXJrZXJPcGVuLnR5cGUpIHtcblx0XHRcdFx0cmV0dXJuIGNoYWluc1RleHRbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG59XG5cbiJdfQ==