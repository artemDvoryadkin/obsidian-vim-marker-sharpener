import { __awaiter } from "tslib";
import { FileSystemAdapter, MarkdownView, TFile } from 'obsidian';
import * as path from 'path';
import * as fs from 'fs';
export class HeadingCacheExt {
    constructor(heading) {
        this.heading = heading.heading;
        this.level = heading.level;
        this.lines = [""];
        this.linesWithMarkdown = [""];
        this.linesWithMarkdownAndHeaders = [""];
        this.parentHeading = null;
        this.position = heading.position;
        this.selectedText = "";
        this.hasCildrenSelectedText = false;
        this.headingSource = heading;
    }
    getParentHeadings() {
        return this.parentHeading;
    }
    getHeadingPath() {
        // Implement logic to get the path from the parent heading to the root
        const path = [];
        let currentHeading = this.parentHeading;
        while (currentHeading) {
            currentHeading.getParentHeadings();
            path.push(currentHeading);
            currentHeading = currentHeading.parentHeading;
        }
        return path.reverse(); // Reverse to get the path from root to parent heading
    }
}
export class FileHelper {
    constructor(app) {
        this.app = app;
    }
    getActiveTFile() {
        return this.app.workspace.getActiveFile();
    }
    getActiveView() {
        console.log("app", this.app, this.app.workspace);
        return this.app.workspace.getActiveViewOfType(MarkdownView);
    }
    getHeadings(file) {
        return this.getHeadingsExt(file);
    }
    isPdfFileActive() {
        const activeFile = this.getActiveTFile();
        console.log("activeFile -", activeFile);
        return (activeFile === null || activeFile === void 0 ? void 0 : activeFile.extension) === "pdf";
    }
    isMdFileActive() {
        const activeFile = this.getActiveTFile();
        return (activeFile === null || activeFile === void 0 ? void 0 : activeFile.extension) === "md";
    }
    getAbsolutPathActiveFile() {
        const activeFile = this.getActiveTFile();
        if (!activeFile) {
            return "";
        }
        return this.getFsAbosoluteVlueDir() + "/" + activeFile.path;
    }
    getAllFileHasFrontmatterAttributeAndValue(attribute, value) {
        const files = this.app.vault.getMarkdownFiles();
        const filesWithFrontmatter = files.filter(file => {
            const frontmatter = this.getFrontmatter(file);
            if (frontmatter[attribute]) {
                return frontmatter[attribute].includes(value);
            }
            return false;
        });
        return filesWithFrontmatter;
    }
    getFsAbosoluteVlueDir() {
        const adapter = this.app.vault.adapter;
        let absoluteVaultDir = "";
        if (adapter instanceof FileSystemAdapter) {
            absoluteVaultDir = adapter.getBasePath();
        }
        return absoluteVaultDir;
    }
    generateUniqueId() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date();
            const sha256 = (data) => {
                const buffer = new TextEncoder().encode(data);
                return crypto.subtle.digest('SHA-256', buffer).then(hash => {
                    const hashArray = Array.from(new Uint8Array(hash));
                    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                    return !isNaN(parseInt(hashHex.charAt(0), 16)) ? 'a' + hashHex.substring(1, 5) : hashHex.substring(0, 5); // Get first 5 characters, replace first if it's a digit
                });
            };
            const checkIdUniqueness = (id) => __awaiter(this, void 0, void 0, function* () {
                const files = this.app.vault.getFiles();
                for (const file of files) {
                    const frontmatter = this.getFrontmatter(file);
                    if (frontmatter.file_id === id) {
                        return true; // ID already exists
                    }
                }
                return false; // ID is unique
            });
            const generateId = () => __awaiter(this, void 0, void 0, function* () {
                const id = yield sha256(currentDate.toISOString());
                const isUnique = yield checkIdUniqueness(id);
                console.log("generateId", { id, isUnique });
                return isUnique ? yield generateId() : id; // Corrected typo here
            });
            return yield generateId();
        });
    }
    removeBracketsAndText(input) {
        const regex1 = /\[([^\]]+)\]\(.*?\)/; // Регулярное выражение для поиска шаблона []()
        //console.log("input", { input });
        const match1 = input.match(regex1);
        if (match1) {
            return match1[1].trim(); // Возвращаем текст в [] если шаблон найден
        }
        // Удаляем символы [ в начале и ] в конце строки, если они есть
        while (input.startsWith('[') && input.endsWith(']')) {
            input = input.slice(1, -1);
        }
        // Находим последний символ | и удаляем текст до конца, включая его
        const lastPipeIndex = input.lastIndexOf('|');
        if (lastPipeIndex !== -1) {
            input = input.slice(0, lastPipeIndex);
        }
        const regex = /\[([^\]]+)\]\(.*?\)/; // Регулярное выражение для поиска шаблона []()
        const match = input.match(regex);
        if (match) {
            return match[1].trim(); // Возвращаем текст в [] если шаблон найден
        }
        return input.trim(); // Удаляем лишние пробелы
    }
    getFrontmatter(file) {
        var _a;
        return ((_a = this.app.metadataCache.getFileCache(file)) === null || _a === void 0 ? void 0 : _a.frontmatter) || {};
    }
    getLinkedMentions(file) {
        const metadataCache = this.app.metadataCache;
        const fileCache = metadataCache.getFileCache(file);
        if (!fileCache || !fileCache.links) {
            return [];
        }
        const linkedMentions = fileCache.links.map(link => `[[${link.link}]]`);
        console.log("linkedMentions", linkedMentions);
        return linkedMentions;
    }
    getLinkedMentions2(file) {
        const metadataCache = this.app.metadataCache;
        //const fileCache = metadataCache.resolvedLinks[file.path];
        console.log("metadataCache", metadataCache.unresolvedLinks);
        const fileCache = metadataCache.unresolvedLinks[file.path];
        console.log("linkedMentions2-", fileCache);
        if (!fileCache) {
            return [];
        }
        const linkedMentions = Object.keys(fileCache).map(link => `[[${link}]]`);
        return linkedMentions;
    }
    findHeaderLineNumbers(headerTitle, file) {
        return __awaiter(this, void 0, void 0, function* () {
            // todo: удалить работу со строками это для отладки нужно было
            const lines = (yield this.app.vault.cachedRead(file)).split('\n');
            const cache = this.app.metadataCache.getFileCache(file);
            const headings = (cache === null || cache === void 0 ? void 0 : cache.headings) || [];
            console.log("headings", headings);
            const clearHEaderTitle = headerTitle.replace(/^#{1,6}\s*/, '').trim();
            console.log("cache", cache);
            const cachedLines = (cache === null || cache === void 0 ? void 0 : cache.sections) ? Object.values(cache.sections).every(section => { console.log("section", { section }); return true; }) : [];
            if (headings.some(heading => heading.heading === clearHEaderTitle)) {
                const headerIndex = headings.findIndex(heading => heading.heading === clearHEaderTitle);
                const currentHeader = headings[headerIndex];
                const startLine = (currentHeader === null || currentHeader === void 0 ? void 0 : currentHeader.position.start.line) || -1;
                const nextHeader = headings[headerIndex + 1];
                let endLine = -1;
                if (nextHeader) {
                    endLine = (nextHeader === null || nextHeader === void 0 ? void 0 : nextHeader.position.start.line) - 1;
                }
                else {
                    endLine = lines.length - 1;
                }
                const result = { start: startLine, end: endLine };
                console.log("findHeaderLineNumbers", { result, startLine, endLine, currentHeader, lines });
                return result;
            }
            return null; // Return null if the header is not found
        });
    }
    insertLine(file, line, text) {
        return __awaiter(this, void 0, void 0, function* () {
            let lines = (yield this.app.vault.read(file)).split('\n');
            lines = [...lines.slice(0, line), text, ...lines.slice(line)];
            yield this.app.vault.modify(file, lines.join('\n'));
        });
    }
    insertSectionLine(file, startLine, endLine, text) {
        return __awaiter(this, void 0, void 0, function* () {
            let lines = (yield this.app.vault.read(file)).split('\n');
            lines = [...lines.slice(0, startLine), text, ...lines.slice(endLine, lines.length - 1)];
            yield this.app.vault.modify(file, lines.join('\n'));
        });
    }
    getLastOffset(file) {
        var _a;
        const sections = (_a = this.app.metadataCache.getFileCache(file)) === null || _a === void 0 ? void 0 : _a.sections;
        const section = sections ? sections[sections.length - 1] : null;
        return section ? section.position.end.offset : -1;
    }
    changeInsideHeaderText(headerTitle, newText, file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.vault.read(file);
            const lastOffset = this.getLastOffset(file);
            const headerLineNumbers = yield this.findHeaderLineNumbers(headerTitle, file);
            console.log("headerLineNumbers", headerLineNumbers);
            if (!headerLineNumbers) {
                console.log("changeInsideHeaderText.dont find headerLineNumbers", { headerTitle, newText, file, headerLineNumbers });
                return;
            }
            const start = headerLineNumbers.start;
            const end = headerLineNumbers.end;
            yield this.app.vault.read(file);
            const endLastOffset = this.getLastOffset(file);
            if (lastOffset === endLastOffset) {
                yield this.insertSectionLine(file, start + 1, end, newText);
            }
            else {
                yield this.changeInsideHeaderText(headerTitle, newText, file);
            }
        });
    }
    changeHeaderText(oldHeaderTitle, newHeaderTitle, newText, file) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.vault.read(file);
            const headerLineNumbers = yield this.findHeaderLineNumbers(oldHeaderTitle, file);
            console.log("headerLineNumbers", headerLineNumbers);
            if (!headerLineNumbers) {
                const sections = (_a = this.app.metadataCache.getFileCache(file)) === null || _a === void 0 ? void 0 : _a.sections;
                const maxLine = sections ? Math.max(...sections.map(section => section.position.end.line)) : -1;
                if (maxLine !== -1) {
                    yield this.insertLine(file, maxLine, `${newHeaderTitle}`);
                }
                yield this.changeInsideHeaderText(oldHeaderTitle, newHeaderTitle, file);
                return;
            }
            console.log("changeHeaderText", { oldHeaderTitle, newHeaderTitle, newText, file, headerLineNumbers });
            if (headerLineNumbers) {
                const start = headerLineNumbers.start;
                const end = headerLineNumbers.end;
                yield this.insertSectionLine(file, start + 1, end, newText);
                const metadataCache = this.app.metadataCache;
                const headings = ((_b = metadataCache.getFileCache(file)) === null || _b === void 0 ? void 0 : _b.headings) || [];
                headings.forEach(heading => {
                    if (heading.heading === oldHeaderTitle) {
                        heading.heading = newHeaderTitle; // Change the header text
                    }
                });
                this.app.metadataCache.getFileCache(file); // Update the cache after saving
            }
        });
    }
    getPathListsToRoot(file, currentPath = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const frontmatter = this.getFrontmatter(file);
            const entityParentEntity = frontmatter["entity_ParentItem"];
            console.log("entityParentEntity", entityParentEntity);
            if (!entityParentEntity) {
                return []; // Return an empty array instead of currentPath
            }
            const parentEntities = Array.isArray(entityParentEntity) ? entityParentEntity : [entityParentEntity];
            const paths = [];
            console.log("parentEntities", parentEntities);
            for (const parent of parentEntities) {
                const cleanedParent = this.removeBracketsAndText(parent);
                console.log("cleanedParent", cleanedParent);
                const parentFiles = this.app.vault.getMarkdownFiles();
                const parentFile = parentFiles.find(file => file.basename === cleanedParent && file.extension === "md");
                console.log("parentFile", parentFile);
                if (parentFile instanceof TFile) {
                    console.log("parentFile---", parentFile);
                    if (cleanedParent === file.basename) {
                        // Reached the root where the file references itself
                        paths.push([...currentPath]);
                        console.log("paths1$", paths);
                        break;
                    }
                    else {
                        // Check if the parent file is a root entity, if so, exit
                        // Recursively find paths for the parent file
                        const parentPaths = yield this.getPathListsToRoot(parentFile, [...currentPath, cleanedParent]);
                        console.log("parentPaths", parentPaths);
                        if (parentPaths.length > 0) {
                            paths.push(...parentPaths);
                        }
                        console.log("paths2$", paths);
                    }
                }
            }
            console.log("paths3$", paths);
            console.log("currentPath", currentPath);
            return paths;
        });
    }
    processFrontMatter(file, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(file instanceof TFile)) {
                console.error('Provided file is not a TFile.');
                return;
            }
            const frontmatter = this.getFrontmatter(file);
            callback(frontmatter);
            // Assuming you have a method to update the file with new frontmatter
            const content = yield this.app.vault.read(file);
            const updatedContent = this.updateFrontmatter(content, frontmatter);
            yield this.app.vault.modify(file, updatedContent);
        });
    }
    updateFrontmatter(content, frontmatter) {
        // Logic to update the frontmatter in the file content
        // This is a placeholder and should be replaced with actual logic
        return content; // Modify this to return the updated content
    }
    getHeadingsExt(file) {
        const fileCachedMetadata = this.app.metadataCache.getFileCache(file);
        if (!fileCachedMetadata)
            return [];
        const headings = (fileCachedMetadata === null || fileCachedMetadata === void 0 ? void 0 : fileCachedMetadata.headings) || [];
        const content = this.getContentFromFile(file);
        const headingsExt = headings.map(heading => {
            const lines = this.getLinesForHeading(file, heading);
            console.log("lines", lines);
            const headingExt = new HeadingCacheExt(heading);
            headingExt.lines = lines;
            headingExt.linesWithMarkdown = lines.map(line => this.addMarkdown(line));
            headingExt.linesWithMarkdownAndHeaders = lines.map(line => this.addMarkdownAndHeaders(line));
            headingExt.headingSource = heading;
            console.log("headingExt", headingExt, headingExt.lines);
            return headingExt;
        });
        headingsExt.forEach((headingExt, index) => {
            const parentHeading = this.getParentHeading(headingExt, headingsExt);
            headingExt.parentHeading = parentHeading;
            headingExt.positionContentStartLine = headingExt.position.start.line + 1;
            // Determine the end line for each heading
            if (index < headingsExt.length - 1) {
                headingExt.positionContentEndLine = headingsExt[index + 1].position.start.line - 1;
            }
            else {
                this.app.metadataCache.getFileCache;
                headingExt.positionContentEndLine = this.getLastLineOfFile(file);
            }
            headingExt.sections = this.getSectionsBetweenHeadings(fileCachedMetadata, headingExt);
        });
        return headingsExt;
    }
    getContentFromFile(file) {
        let content = "";
        const result = this.app.vault.cachedRead(file).then(fileContent => {
            content = fileContent;
        }).catch(error => {
            console.error("Error reading file:", error);
        });
        if (file.path === "test-.md") {
            content = fs.readFileSync(path.join("/Users/artemdvoryadkin/Projects/obsidian-sharpener/src/Helpers/__tests__/", 'testData.md'), 'utf8');
        }
        return content;
    }
    getContentBySection(file, section) {
        const content = this.getContentFromFile(file);
        return this.getContentBySectionAndContent(content, section);
    }
    getContentBySectionAndContent(fileContent, section) {
        const contentSection = fileContent.slice(section.position.start.offset, section.position.end.offset);
        return contentSection;
    }
    getSectionsBetweenHeadings(fileCachedMetadata, headingExt) {
        if (!fileCachedMetadata)
            return [];
        const sections = (fileCachedMetadata === null || fileCachedMetadata === void 0 ? void 0 : fileCachedMetadata.sections) || [];
        const nextHeading = this.getNextHeading(fileCachedMetadata, headingExt);
        const sectionsBetweenHeadings = sections.filter(section => section.position.start.line > headingExt.position.start.line && (nextHeading ? section.position.end.line < (nextHeading === null || nextHeading === void 0 ? void 0 : nextHeading.position.start.line) : true));
        return sectionsBetweenHeadings;
    }
    getNextHeading(fileCachedMetadata, headingExt) {
        const headings = fileCachedMetadata.headings || [];
        let finded = false;
        const findedHeading = headings.find(heading => {
            if (finded) {
                return heading;
            }
            if (heading.position.start.line == headingExt.position.start.line) {
                finded = true;
            }
        });
        return findedHeading || null;
    }
    getLastLineOfFile(file) {
        let lastLine = -1;
        this.app.vault.cachedRead(file).then(fileContent => {
            lastLine = fileContent.split('\n').length - 1;
        }).catch(error => {
            console.error("Error reading file:", error);
        });
        return lastLine;
    }
    getLinesForHeading(file, heading) {
        // Implement logic to extract lines for the given heading
        console.log("getLinesForHeading", { file, heading });
        return [];
    }
    addMarkdown(line) {
        // Implement logic to add markdown to a line
        return line;
    }
    addMarkdownAndHeaders(line) {
        // Implement logic to add markdown and headers to a line
        return line;
    }
    getParentHeading(heading, allHeadings) {
        // Iterate backwards through the list of headings to find the first heading with a lower level
        for (let i = allHeadings.indexOf(heading) - 1; i >= 0; i--) {
            if (allHeadings[i].level < heading.level) {
                return allHeadings[i]; // Return the first heading with a lower level
            }
        }
        return null; // Return null if no parent heading is found
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGaWxlSGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFPLGlCQUFpQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sVUFBVSxDQUFDO0FBRXJHLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBU3pCLE1BQU0sT0FBTyxlQUFlO0lBQzNCLFlBQVksT0FBcUI7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDakIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDN0IsSUFBSSxDQUFDLDJCQUEyQixHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUE7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFBO1FBQ3RCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUE7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUE7SUFDN0IsQ0FBQztJQWVELGlCQUFpQjtRQUNoQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDM0IsQ0FBQztJQUVELGNBQWM7UUFDYixzRUFBc0U7UUFDdEUsTUFBTSxJQUFJLEdBQXNCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLGNBQWMsR0FBMkIsSUFBSSxDQUFDLGFBQWdDLENBQUM7UUFFbkYsT0FBTyxjQUFjLEVBQUU7WUFDdEIsY0FBYyxDQUFDLGlCQUFpQixFQUFFLENBQUE7WUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMxQixjQUFjLEdBQUcsY0FBYyxDQUFDLGFBQWdDLENBQUM7U0FDakU7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLHNEQUFzRDtJQUM5RSxDQUFDO0NBQ0Q7QUFFRCxNQUFNLE9BQU8sVUFBVTtJQUd0QixZQUFZLEdBQVE7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDaEIsQ0FBQztJQUVELGNBQWM7UUFDYixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFDRCxhQUFhO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFXO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0QsZUFBZTtRQUNkLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4QyxPQUFPLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLFNBQVMsTUFBSyxLQUFLLENBQUM7SUFDeEMsQ0FBQztJQUNELGNBQWM7UUFDYixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekMsT0FBTyxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxTQUFTLE1BQUssSUFBSSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCx3QkFBd0I7UUFDdkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDaEIsT0FBTyxFQUFFLENBQUM7U0FDVjtRQUNELE9BQU8sSUFBSSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDN0QsQ0FBQztJQUVELHlDQUF5QyxDQUFDLFNBQWlCLEVBQUUsS0FBYTtRQUN6RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2hELE1BQU0sb0JBQW9CLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMzQixPQUFPLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUM7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxvQkFBb0IsQ0FBQztJQUM3QixDQUFDO0lBRUQscUJBQXFCO1FBQ3BCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN2QyxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLE9BQU8sWUFBWSxpQkFBaUIsRUFBRTtZQUN6QyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDekM7UUFDRCxPQUFPLGdCQUFnQixDQUFDO0lBQ3pCLENBQUM7SUFFSyxnQkFBZ0I7O1lBQ3JCLE1BQU0sV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDL0IsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtnQkFDL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDMUQsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM3RSxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyx3REFBd0Q7Z0JBQ25LLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDO1lBRUYsTUFBTSxpQkFBaUIsR0FBRyxDQUFPLEVBQVUsRUFBb0IsRUFBRTtnQkFDaEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3hDLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO29CQUN6QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM5QyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO3dCQUMvQixPQUFPLElBQUksQ0FBQyxDQUFDLG9CQUFvQjtxQkFDakM7aUJBQ0Q7Z0JBQ0QsT0FBTyxLQUFLLENBQUMsQ0FBQyxlQUFlO1lBQzlCLENBQUMsQ0FBQSxDQUFDO1lBRUYsTUFBTSxVQUFVLEdBQUcsR0FBMEIsRUFBRTtnQkFDOUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQ25ELE1BQU0sUUFBUSxHQUFHLE1BQU0saUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzVDLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7WUFDbEUsQ0FBQyxDQUFBLENBQUM7WUFFRixPQUFPLE1BQU0sVUFBVSxFQUFFLENBQUM7UUFDM0IsQ0FBQztLQUFBO0lBR0QscUJBQXFCLENBQUMsS0FBYTtRQUVsQyxNQUFNLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLCtDQUErQztRQUNyRixrQ0FBa0M7UUFDbEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLE1BQU0sRUFBRTtZQUNYLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsMkNBQTJDO1NBQ3BFO1FBRUQsK0RBQStEO1FBQy9ELE9BQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BELEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsbUVBQW1FO1FBQ25FLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxhQUFhLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDekIsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsTUFBTSxLQUFLLEdBQUcscUJBQXFCLENBQUMsQ0FBQywrQ0FBK0M7UUFDcEYsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxJQUFJLEtBQUssRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsMkNBQTJDO1NBQ25FO1FBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyx5QkFBeUI7SUFDL0MsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFXOztRQUN6QixPQUFPLENBQUEsTUFBQSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLDBDQUFFLFdBQVcsS0FBSSxFQUFFLENBQUM7SUFDckUsQ0FBQztJQUVELGlCQUFpQixDQUFDLElBQVc7UUFDNUIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDN0MsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtZQUNuQyxPQUFPLEVBQUUsQ0FBQztTQUNWO1FBRUQsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDOUMsT0FBTyxjQUFjLENBQUM7SUFDdkIsQ0FBQztJQUVELGtCQUFrQixDQUFDLElBQVc7UUFDN0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDN0MsMkRBQTJEO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM1RCxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZixPQUFPLEVBQUUsQ0FBQztTQUNWO1FBRUQsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUM7UUFDekUsT0FBTyxjQUFjLENBQUM7SUFDdkIsQ0FBQztJQUVLLHFCQUFxQixDQUFDLFdBQW1CLEVBQUUsSUFBVzs7WUFDM0QsOERBQThEO1lBQzlELE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hELE1BQU0sUUFBUSxHQUFHLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFFBQVEsS0FBSSxFQUFFLENBQUM7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbEMsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUV0RSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1QixNQUFNLFdBQVcsR0FBRyxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVoSixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLGdCQUFnQixDQUFDLEVBQUU7Z0JBRW5FLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3hGLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDNUMsTUFBTSxTQUFTLEdBQUcsQ0FBQSxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRTNELE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLFVBQVUsRUFBRTtvQkFDZixPQUFPLEdBQUcsQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUcsQ0FBQyxDQUFDO2lCQUM5QztxQkFBTTtvQkFDTixPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7aUJBQzFCO2dCQUVELE1BQU0sTUFBTSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUE7Z0JBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFFM0YsT0FBTyxNQUFNLENBQUM7YUFDZDtZQUNELE9BQU8sSUFBSSxDQUFDLENBQUMseUNBQXlDO1FBQ3ZELENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxJQUFXLEVBQUUsSUFBWSxFQUFFLElBQVk7O1lBQ3ZELElBQUksS0FBSyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUQsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFOUQsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDO0tBQUE7SUFFSyxpQkFBaUIsQ0FBQyxJQUFXLEVBQUUsU0FBaUIsRUFBRSxPQUFlLEVBQUUsSUFBWTs7WUFDcEYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRCxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7S0FBQTtJQUNELGFBQWEsQ0FBQyxJQUFXOztRQUN4QixNQUFNLFFBQVEsR0FBRyxNQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsMENBQUUsUUFBUSxDQUFDO1FBQ3JFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNoRSxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUssc0JBQXNCLENBQUMsV0FBbUIsRUFBRSxPQUFlLEVBQUUsSUFBVzs7WUFDN0UsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFaEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU1QyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5RSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFFcEQsSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxFQUFFLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2dCQUNySCxPQUFPO2FBQ1A7WUFFRCxNQUFNLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7WUFDdEMsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDO1lBR2xDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsSUFBSSxVQUFVLEtBQUssYUFBYSxFQUFFO2dCQUNqQyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDNUQ7aUJBQU07Z0JBQ04sTUFBTSxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM5RDtRQUNGLENBQUM7S0FBQTtJQUVLLGdCQUFnQixDQUFDLGNBQXNCLEVBQUUsY0FBc0IsRUFBRSxPQUFlLEVBQUUsSUFBVzs7O1lBQ2xHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWhDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pGLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUVwRCxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3ZCLE1BQU0sUUFBUSxHQUFHLE1BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQywwQ0FBRSxRQUFRLENBQUM7Z0JBQ3JFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEcsSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ25CLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsY0FBYyxFQUFFLENBQUMsQ0FBQztpQkFDMUQ7Z0JBRUQsTUFBTSxJQUFJLENBQUMsc0JBQXNCLENBQUMsY0FBYyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDeEUsT0FBTzthQUVQO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7WUFFdEcsSUFBSSxpQkFBaUIsRUFBRTtnQkFDdEIsTUFBTSxLQUFLLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDO2dCQUN0QyxNQUFNLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUM7Z0JBRWxDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFFNUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7Z0JBQzdDLE1BQU0sUUFBUSxHQUFHLENBQUEsTUFBQSxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQywwQ0FBRSxRQUFRLEtBQUksRUFBRSxDQUFDO2dCQUNsRSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUMxQixJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssY0FBYyxFQUFFO3dCQUN2QyxPQUFPLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxDQUFDLHlCQUF5QjtxQkFDM0Q7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZ0NBQWdDO2FBQzNFOztLQUNEO0lBRUssa0JBQWtCLENBQUMsSUFBVyxFQUFFLGNBQXdCLEVBQUU7O1lBQy9ELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsTUFBTSxrQkFBa0IsR0FBRyxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUN4QixPQUFPLEVBQUUsQ0FBQyxDQUFDLCtDQUErQzthQUMxRDtZQUVELE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNyRyxNQUFNLEtBQUssR0FBZSxFQUFFLENBQUM7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUM5QyxLQUFLLE1BQU0sTUFBTSxJQUFJLGNBQWMsRUFBRTtnQkFDcEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDNUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFFdEQsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssYUFBYSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQ3hHLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUV0QyxJQUFJLFVBQVUsWUFBWSxLQUFLLEVBQUU7b0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLGFBQWEsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNwQyxvREFBb0Q7d0JBQ3BELEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUM5QixNQUFNO3FCQUNOO3lCQUFNO3dCQUNOLHlEQUF5RDt3QkFDekQsNkNBQTZDO3dCQUM3QyxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO3dCQUMvRixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDeEMsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDO3lCQUMzQjt3QkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztxQkFDOUI7aUJBQ0Q7YUFDRDtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sS0FBSyxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUssa0JBQWtCLENBQUMsSUFBVyxFQUFFLFFBQW9DOztZQUN6RSxJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDL0MsT0FBTzthQUNQO1lBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFdEIscUVBQXFFO1lBQ3JFLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDcEUsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FBQTtJQUVPLGlCQUFpQixDQUFDLE9BQWUsRUFBRSxXQUFnQjtRQUMxRCxzREFBc0Q7UUFDdEQsaUVBQWlFO1FBQ2pFLE9BQU8sT0FBTyxDQUFDLENBQUMsNENBQTRDO0lBQzdELENBQUM7SUFFRCxjQUFjLENBQUMsSUFBVztRQUN6QixNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNwRSxJQUFJLENBQUMsa0JBQWtCO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFFbEMsTUFBTSxRQUFRLEdBQUcsQ0FBQSxrQkFBa0IsYUFBbEIsa0JBQWtCLHVCQUFsQixrQkFBa0IsQ0FBRSxRQUFRLEtBQUksRUFBRSxDQUFDO1FBQ3BELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUU3QyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUIsTUFBTSxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEQsVUFBVSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDekIsVUFBVSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekUsVUFBVSxDQUFDLDJCQUEyQixHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3RixVQUFVLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQTtZQUVsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELE9BQU8sVUFBVSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUgsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN6QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3JFLFVBQVUsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ3pDLFVBQVUsQ0FBQyx3QkFBd0IsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1lBR3hFLDBDQUEwQztZQUMxQyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkMsVUFBVSxDQUFDLHNCQUFzQixHQUFHLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2FBQ25GO2lCQUFNO2dCQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQTtnQkFDbkMsVUFBVSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUNoRTtZQUNELFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxDQUFBO1FBQ3RGLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxXQUFXLENBQUM7SUFDcEIsQ0FBQztJQUVELGtCQUFrQixDQUFDLElBQVc7UUFDN0IsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFBO1FBQ2hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDakUsT0FBTyxHQUFHLFdBQVcsQ0FBQTtRQUN0QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7WUFDN0IsT0FBTyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywyRUFBMkUsRUFBRSxhQUFhLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN6STtRQUNELE9BQU8sT0FBTyxDQUFBO0lBQ2YsQ0FBQztJQUVELG1CQUFtQixDQUFDLElBQVcsRUFBRSxPQUFxQjtRQUVyRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFN0MsT0FBTyxJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzVELENBQUM7SUFFRCw2QkFBNkIsQ0FBQyxXQUFtQixFQUFFLE9BQXFCO1FBQ3ZFLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3BHLE9BQU8sY0FBYyxDQUFBO0lBQ3RCLENBQUM7SUFHTywwQkFBMEIsQ0FBQyxrQkFBa0MsRUFBRSxVQUEyQjtRQUNqRyxJQUFJLENBQUMsa0JBQWtCO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFFbEMsTUFBTSxRQUFRLEdBQUcsQ0FBQSxrQkFBa0IsYUFBbEIsa0JBQWtCLHVCQUFsQixrQkFBa0IsQ0FBRSxRQUFRLEtBQUksRUFBRSxDQUFDO1FBRXBELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFFdkUsTUFBTSx1QkFBdUIsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQ3pELE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksSUFBRyxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUVySixPQUFPLHVCQUF1QixDQUFBO0lBQy9CLENBQUM7SUFHTyxjQUFjLENBQUMsa0JBQWtDLEVBQUUsVUFBMkI7UUFDckYsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUVuRCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFDbEIsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QyxJQUFJLE1BQU0sRUFBRTtnQkFDWCxPQUFPLE9BQU8sQ0FBQTthQUNkO1lBRUQsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNsRSxNQUFNLEdBQUcsSUFBSSxDQUFBO2FBQ2I7UUFDRixDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sYUFBYSxJQUFJLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRU8saUJBQWlCLENBQUMsSUFBVztRQUNwQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVsQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ2xELFFBQVEsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFFBQVEsQ0FBQTtJQUNoQixDQUFDO0lBQ08sa0JBQWtCLENBQUMsSUFBVyxFQUFFLE9BQXFCO1FBQzVELHlEQUF5RDtRQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDckQsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRU8sV0FBVyxDQUFDLElBQVk7UUFDL0IsNENBQTRDO1FBQzVDLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVPLHFCQUFxQixDQUFDLElBQVk7UUFDekMsd0RBQXdEO1FBQ3hELE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVPLGdCQUFnQixDQUFDLE9BQXdCLEVBQUUsV0FBOEI7UUFDaEYsOEZBQThGO1FBQzlGLEtBQUssSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzRCxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDekMsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyw4Q0FBOEM7YUFDckU7U0FDRDtRQUNELE9BQU8sSUFBSSxDQUFDLENBQUMsNENBQTRDO0lBQzFELENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcCwgRmlsZVN5c3RlbUFkYXB0ZXIsIE1hcmtkb3duVmlldywgVEZpbGUsIENhY2hlZE1ldGFkYXRhLCBIZWFkaW5nQ2FjaGUgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBTZWN0aW9uQ2FjaGUgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhlYWRpbmdDYWNoZUV4dCBleHRlbmRzIEhlYWRpbmdDYWNoZSB7XG5cdGxpbmVzOiBzdHJpbmdbXTtcblx0bGluZXNXaXRoTWFya2Rvd246IHN0cmluZ1tdO1xuXHRsaW5lc1dpdGhNYXJrZG93bkFuZEhlYWRlcnM6IHN0cmluZ1tdO1xuXHRwYXJlbnRIZWFkaW5nOiBIZWFkaW5nQ2FjaGVFeHQgfCBudWxsO1xufVxuXG5leHBvcnQgY2xhc3MgSGVhZGluZ0NhY2hlRXh0IGltcGxlbWVudHMgSGVhZGluZ0NhY2hlRXh0IHtcblx0Y29uc3RydWN0b3IoaGVhZGluZzogSGVhZGluZ0NhY2hlKSB7XG5cdFx0dGhpcy5oZWFkaW5nID0gaGVhZGluZy5oZWFkaW5nO1xuXHRcdHRoaXMubGV2ZWwgPSBoZWFkaW5nLmxldmVsO1xuXHRcdHRoaXMubGluZXMgPSBbXCJcIl1cblx0XHR0aGlzLmxpbmVzV2l0aE1hcmtkb3duID0gW1wiXCJdXG5cdFx0dGhpcy5saW5lc1dpdGhNYXJrZG93bkFuZEhlYWRlcnMgPSBbXCJcIl1cblx0XHR0aGlzLnBhcmVudEhlYWRpbmcgPSBudWxsXG5cdFx0dGhpcy5wb3NpdGlvbiA9IGhlYWRpbmcucG9zaXRpb25cblx0XHR0aGlzLnNlbGVjdGVkVGV4dCA9IFwiXCJcblx0XHR0aGlzLmhhc0NpbGRyZW5TZWxlY3RlZFRleHQgPSBmYWxzZVxuXHRcdHRoaXMuaGVhZGluZ1NvdXJjZSA9IGhlYWRpbmdcblx0fVxuXG5cdGhlYWRpbmc6IHN0cmluZztcblx0bGV2ZWw6IG51bWJlcjtcblx0bGluZXM6IHN0cmluZ1tdO1xuXHRsaW5lc1dpdGhNYXJrZG93bjogc3RyaW5nW107XG5cdGxpbmVzV2l0aE1hcmtkb3duQW5kSGVhZGVyczogc3RyaW5nW107XG5cdHBhcmVudEhlYWRpbmc6IEhlYWRpbmdDYWNoZUV4dCB8IG51bGw7XG5cdHBvc2l0aW9uQ29udGVudFN0YXJ0TGluZTogbnVtYmVyXG5cdHBvc2l0aW9uQ29udGVudEVuZExpbmU6IG51bWJlclxuXHRzZWxlY3RlZFRleHQ6IHN0cmluZ1xuXHRoYXNDaWxkcmVuU2VsZWN0ZWRUZXh0OiBib29sZWFuXG5cdHNlY3Rpb25zOiBTZWN0aW9uQ2FjaGVbXVxuXHRoZWFkaW5nU291cmNlOiBIZWFkaW5nQ2FjaGVcblxuXHRnZXRQYXJlbnRIZWFkaW5ncygpOiBIZWFkaW5nQ2FjaGVFeHQgfCBudWxsIHtcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnRIZWFkaW5nO1xuXHR9XG5cblx0Z2V0SGVhZGluZ1BhdGgoKTogSGVhZGluZ0NhY2hlRXh0W10ge1xuXHRcdC8vIEltcGxlbWVudCBsb2dpYyB0byBnZXQgdGhlIHBhdGggZnJvbSB0aGUgcGFyZW50IGhlYWRpbmcgdG8gdGhlIHJvb3Rcblx0XHRjb25zdCBwYXRoOiBIZWFkaW5nQ2FjaGVFeHRbXSA9IFtdO1xuXHRcdGxldCBjdXJyZW50SGVhZGluZzogSGVhZGluZ0NhY2hlRXh0IHwgbnVsbCA9IHRoaXMucGFyZW50SGVhZGluZyBhcyBIZWFkaW5nQ2FjaGVFeHQ7XG5cblx0XHR3aGlsZSAoY3VycmVudEhlYWRpbmcpIHtcblx0XHRcdGN1cnJlbnRIZWFkaW5nLmdldFBhcmVudEhlYWRpbmdzKClcblx0XHRcdHBhdGgucHVzaChjdXJyZW50SGVhZGluZyk7XG5cdFx0XHRjdXJyZW50SGVhZGluZyA9IGN1cnJlbnRIZWFkaW5nLnBhcmVudEhlYWRpbmcgYXMgSGVhZGluZ0NhY2hlRXh0O1xuXHRcdH1cblxuXHRcdHJldHVybiBwYXRoLnJldmVyc2UoKTsgLy8gUmV2ZXJzZSB0byBnZXQgdGhlIHBhdGggZnJvbSByb290IHRvIHBhcmVudCBoZWFkaW5nXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpbGVIZWxwZXIge1xuXHRwcml2YXRlIGFwcDogQXBwO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwKSB7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdH1cblxuXHRnZXRBY3RpdmVURmlsZSgpOiBURmlsZSB8IG51bGwge1xuXHRcdHJldHVybiB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xuXHR9XG5cdGdldEFjdGl2ZVZpZXcoKTogTWFya2Rvd25WaWV3IHwgbnVsbCB7XG5cdFx0Y29uc29sZS5sb2coXCJhcHBcIiwgdGhpcy5hcHAsIHRoaXMuYXBwLndvcmtzcGFjZSk7XG5cdFx0cmV0dXJuIHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG5cdH1cblxuXHRnZXRIZWFkaW5ncyhmaWxlOiBURmlsZSk6IEhlYWRpbmdDYWNoZUV4dFtdIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRIZWFkaW5nc0V4dChmaWxlKTtcblx0fVxuXHRpc1BkZkZpbGVBY3RpdmUoKTogYm9vbGVhbiB7XG5cdFx0Y29uc3QgYWN0aXZlRmlsZSA9IHRoaXMuZ2V0QWN0aXZlVEZpbGUoKTtcblx0XHRjb25zb2xlLmxvZyhcImFjdGl2ZUZpbGUgLVwiLCBhY3RpdmVGaWxlKTtcblx0XHRyZXR1cm4gYWN0aXZlRmlsZT8uZXh0ZW5zaW9uID09PSBcInBkZlwiO1xuXHR9XG5cdGlzTWRGaWxlQWN0aXZlKCk6IGJvb2xlYW4ge1xuXHRcdGNvbnN0IGFjdGl2ZUZpbGUgPSB0aGlzLmdldEFjdGl2ZVRGaWxlKCk7XG5cdFx0cmV0dXJuIGFjdGl2ZUZpbGU/LmV4dGVuc2lvbiA9PT0gXCJtZFwiO1xuXHR9XG5cblx0Z2V0QWJzb2x1dFBhdGhBY3RpdmVGaWxlKCk6IHN0cmluZyB7XG5cdFx0Y29uc3QgYWN0aXZlRmlsZSA9IHRoaXMuZ2V0QWN0aXZlVEZpbGUoKTtcblx0XHRpZiAoIWFjdGl2ZUZpbGUpIHtcblx0XHRcdHJldHVybiBcIlwiO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5nZXRGc0Fib3NvbHV0ZVZsdWVEaXIoKSArIFwiL1wiICsgYWN0aXZlRmlsZS5wYXRoO1xuXHR9XG5cblx0Z2V0QWxsRmlsZUhhc0Zyb250bWF0dGVyQXR0cmlidXRlQW5kVmFsdWUoYXR0cmlidXRlOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBURmlsZVtdIHtcblx0XHRjb25zdCBmaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcblx0XHRjb25zdCBmaWxlc1dpdGhGcm9udG1hdHRlciA9IGZpbGVzLmZpbHRlcihmaWxlID0+IHtcblx0XHRcdGNvbnN0IGZyb250bWF0dGVyID0gdGhpcy5nZXRGcm9udG1hdHRlcihmaWxlKTtcblx0XHRcdGlmIChmcm9udG1hdHRlclthdHRyaWJ1dGVdKSB7XG5cdFx0XHRcdHJldHVybiBmcm9udG1hdHRlclthdHRyaWJ1dGVdLmluY2x1ZGVzKHZhbHVlKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBmaWxlc1dpdGhGcm9udG1hdHRlcjtcblx0fVxuXG5cdGdldEZzQWJvc29sdXRlVmx1ZURpcigpOiBzdHJpbmcge1xuXHRcdGNvbnN0IGFkYXB0ZXIgPSB0aGlzLmFwcC52YXVsdC5hZGFwdGVyO1xuXHRcdGxldCBhYnNvbHV0ZVZhdWx0RGlyID0gXCJcIjtcblx0XHRpZiAoYWRhcHRlciBpbnN0YW5jZW9mIEZpbGVTeXN0ZW1BZGFwdGVyKSB7XG5cdFx0XHRhYnNvbHV0ZVZhdWx0RGlyID0gYWRhcHRlci5nZXRCYXNlUGF0aCgpO1xuXHRcdH1cblx0XHRyZXR1cm4gYWJzb2x1dGVWYXVsdERpcjtcblx0fVxuXG5cdGFzeW5jIGdlbmVyYXRlVW5pcXVlSWQoKTogUHJvbWlzZTxzdHJpbmc+IHtcblx0XHRjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0Y29uc3Qgc2hhMjU2ID0gKGRhdGE6IHN0cmluZykgPT4ge1xuXHRcdFx0Y29uc3QgYnVmZmVyID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKGRhdGEpO1xuXHRcdFx0cmV0dXJuIGNyeXB0by5zdWJ0bGUuZGlnZXN0KCdTSEEtMjU2JywgYnVmZmVyKS50aGVuKGhhc2ggPT4ge1xuXHRcdFx0XHRjb25zdCBoYXNoQXJyYXkgPSBBcnJheS5mcm9tKG5ldyBVaW50OEFycmF5KGhhc2gpKTtcblx0XHRcdFx0Y29uc3QgaGFzaEhleCA9IGhhc2hBcnJheS5tYXAoYiA9PiBiLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpKS5qb2luKCcnKTtcblx0XHRcdFx0cmV0dXJuICFpc05hTihwYXJzZUludChoYXNoSGV4LmNoYXJBdCgwKSwgMTYpKSA/ICdhJyArIGhhc2hIZXguc3Vic3RyaW5nKDEsIDUpIDogaGFzaEhleC5zdWJzdHJpbmcoMCwgNSk7IC8vIEdldCBmaXJzdCA1IGNoYXJhY3RlcnMsIHJlcGxhY2UgZmlyc3QgaWYgaXQncyBhIGRpZ2l0XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0Y29uc3QgY2hlY2tJZFVuaXF1ZW5lc3MgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuXHRcdFx0Y29uc3QgZmlsZXMgPSB0aGlzLmFwcC52YXVsdC5nZXRGaWxlcygpO1xuXHRcdFx0Zm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG5cdFx0XHRcdGNvbnN0IGZyb250bWF0dGVyID0gdGhpcy5nZXRGcm9udG1hdHRlcihmaWxlKTtcblx0XHRcdFx0aWYgKGZyb250bWF0dGVyLmZpbGVfaWQgPT09IGlkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7IC8vIElEIGFscmVhZHkgZXhpc3RzXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTsgLy8gSUQgaXMgdW5pcXVlXG5cdFx0fTtcblxuXHRcdGNvbnN0IGdlbmVyYXRlSWQgPSBhc3luYyAoKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcblx0XHRcdGNvbnN0IGlkID0gYXdhaXQgc2hhMjU2KGN1cnJlbnREYXRlLnRvSVNPU3RyaW5nKCkpO1xuXHRcdFx0Y29uc3QgaXNVbmlxdWUgPSBhd2FpdCBjaGVja0lkVW5pcXVlbmVzcyhpZCk7XG5cdFx0XHRjb25zb2xlLmxvZyhcImdlbmVyYXRlSWRcIiwgeyBpZCwgaXNVbmlxdWUgfSk7XG5cdFx0XHRyZXR1cm4gaXNVbmlxdWUgPyBhd2FpdCBnZW5lcmF0ZUlkKCkgOiBpZDsgLy8gQ29ycmVjdGVkIHR5cG8gaGVyZVxuXHRcdH07XG5cblx0XHRyZXR1cm4gYXdhaXQgZ2VuZXJhdGVJZCgpO1xuXHR9XG5cblxuXHRyZW1vdmVCcmFja2V0c0FuZFRleHQoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG5cblx0XHRjb25zdCByZWdleDEgPSAvXFxbKFteXFxdXSspXFxdXFwoLio/XFwpLzsgLy8g0KDQtdCz0YPQu9GP0YDQvdC+0LUg0LLRi9GA0LDQttC10L3QuNC1INC00LvRjyDQv9C+0LjRgdC60LAg0YjQsNCx0LvQvtC90LAgW10oKVxuXHRcdC8vY29uc29sZS5sb2coXCJpbnB1dFwiLCB7IGlucHV0IH0pO1xuXHRcdGNvbnN0IG1hdGNoMSA9IGlucHV0Lm1hdGNoKHJlZ2V4MSk7XG5cdFx0aWYgKG1hdGNoMSkge1xuXHRcdFx0cmV0dXJuIG1hdGNoMVsxXS50cmltKCk7IC8vINCS0L7Qt9Cy0YDQsNGJ0LDQtdC8INGC0LXQutGB0YIg0LIgW10g0LXRgdC70Lgg0YjQsNCx0LvQvtC9INC90LDQudC00LXQvVxuXHRcdH1cblxuXHRcdC8vINCj0LTQsNC70Y/QtdC8INGB0LjQvNCy0L7Qu9GLIFsg0LIg0L3QsNGH0LDQu9C1INC4IF0g0LIg0LrQvtC90YbQtSDRgdGC0YDQvtC60LgsINC10YHQu9C4INC+0L3QuCDQtdGB0YLRjFxuXHRcdHdoaWxlIChpbnB1dC5zdGFydHNXaXRoKCdbJykgJiYgaW5wdXQuZW5kc1dpdGgoJ10nKSkge1xuXHRcdFx0aW5wdXQgPSBpbnB1dC5zbGljZSgxLCAtMSk7XG5cdFx0fVxuXHRcdC8vINCd0LDRhdC+0LTQuNC8INC/0L7RgdC70LXQtNC90LjQuSDRgdC40LzQstC+0LsgfCDQuCDRg9C00LDQu9GP0LXQvCDRgtC10LrRgdGCINC00L4g0LrQvtC90YbQsCwg0LLQutC70Y7Rh9Cw0Y8g0LXQs9C+XG5cdFx0Y29uc3QgbGFzdFBpcGVJbmRleCA9IGlucHV0Lmxhc3RJbmRleE9mKCd8Jyk7XG5cdFx0aWYgKGxhc3RQaXBlSW5kZXggIT09IC0xKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnNsaWNlKDAsIGxhc3RQaXBlSW5kZXgpO1xuXHRcdH1cblx0XHRjb25zdCByZWdleCA9IC9cXFsoW15cXF1dKylcXF1cXCguKj9cXCkvOyAvLyDQoNC10LPRg9C70Y/RgNC90L7QtSDQstGL0YDQsNC20LXQvdC40LUg0LTQu9GPINC/0L7QuNGB0LrQsCDRiNCw0LHQu9C+0L3QsCBbXSgpXG5cdFx0Y29uc3QgbWF0Y2ggPSBpbnB1dC5tYXRjaChyZWdleCk7XG5cdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRyZXR1cm4gbWF0Y2hbMV0udHJpbSgpOyAvLyDQktC+0LfQstGA0LDRidCw0LXQvCDRgtC10LrRgdGCINCyIFtdINC10YHQu9C4INGI0LDQsdC70L7QvSDQvdCw0LnQtNC10L1cblx0XHR9XG5cdFx0cmV0dXJuIGlucHV0LnRyaW0oKTsgLy8g0KPQtNCw0LvRj9C10Lwg0LvQuNGI0L3QuNC1INC/0YDQvtCx0LXQu9GLXG5cdH1cblxuXHRnZXRGcm9udG1hdHRlcihmaWxlOiBURmlsZSk6IGFueSB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpPy5mcm9udG1hdHRlciB8fCB7fTtcblx0fVxuXG5cdGdldExpbmtlZE1lbnRpb25zKGZpbGU6IFRGaWxlKTogc3RyaW5nW10ge1xuXHRcdGNvbnN0IG1ldGFkYXRhQ2FjaGUgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlO1xuXHRcdGNvbnN0IGZpbGVDYWNoZSA9IG1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpO1xuXG5cdFx0aWYgKCFmaWxlQ2FjaGUgfHwgIWZpbGVDYWNoZS5saW5rcykge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH1cblxuXHRcdGNvbnN0IGxpbmtlZE1lbnRpb25zID0gZmlsZUNhY2hlLmxpbmtzLm1hcChsaW5rID0+IGBbWyR7bGluay5saW5rfV1dYCk7XG5cdFx0Y29uc29sZS5sb2coXCJsaW5rZWRNZW50aW9uc1wiLCBsaW5rZWRNZW50aW9ucyk7XG5cdFx0cmV0dXJuIGxpbmtlZE1lbnRpb25zO1xuXHR9XG5cblx0Z2V0TGlua2VkTWVudGlvbnMyKGZpbGU6IFRGaWxlKTogc3RyaW5nW10ge1xuXHRcdGNvbnN0IG1ldGFkYXRhQ2FjaGUgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlO1xuXHRcdC8vY29uc3QgZmlsZUNhY2hlID0gbWV0YWRhdGFDYWNoZS5yZXNvbHZlZExpbmtzW2ZpbGUucGF0aF07XG5cdFx0Y29uc29sZS5sb2coXCJtZXRhZGF0YUNhY2hlXCIsIG1ldGFkYXRhQ2FjaGUudW5yZXNvbHZlZExpbmtzKTtcblx0XHRjb25zdCBmaWxlQ2FjaGUgPSBtZXRhZGF0YUNhY2hlLnVucmVzb2x2ZWRMaW5rc1tmaWxlLnBhdGhdO1xuXG5cdFx0Y29uc29sZS5sb2coXCJsaW5rZWRNZW50aW9uczItXCIsIGZpbGVDYWNoZSk7XG5cdFx0aWYgKCFmaWxlQ2FjaGUpIHtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9XG5cblx0XHRjb25zdCBsaW5rZWRNZW50aW9ucyA9IE9iamVjdC5rZXlzKGZpbGVDYWNoZSkubWFwKGxpbmsgPT4gYFtbJHtsaW5rfV1dYCk7XG5cdFx0cmV0dXJuIGxpbmtlZE1lbnRpb25zO1xuXHR9XG5cblx0YXN5bmMgZmluZEhlYWRlckxpbmVOdW1iZXJzKGhlYWRlclRpdGxlOiBzdHJpbmcsIGZpbGU6IFRGaWxlKTogUHJvbWlzZTx7IHN0YXJ0OiBudW1iZXI7IGVuZDogbnVtYmVyIH0gfCBudWxsPiB7XG5cdFx0Ly8gdG9kbzog0YPQtNCw0LvQuNGC0Ywg0YDQsNCx0L7RgtGDINGB0L4g0YHRgtGA0L7QutCw0LzQuCDRjdGC0L4g0LTQu9GPINC+0YLQu9Cw0LTQutC4INC90YPQttC90L4g0LHRi9C70L5cblx0XHRjb25zdCBsaW5lcyA9IChhd2FpdCB0aGlzLmFwcC52YXVsdC5jYWNoZWRSZWFkKGZpbGUpKS5zcGxpdCgnXFxuJyk7XG5cblx0XHRjb25zdCBjYWNoZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpO1xuXHRcdGNvbnN0IGhlYWRpbmdzID0gY2FjaGU/LmhlYWRpbmdzIHx8IFtdO1xuXHRcdGNvbnNvbGUubG9nKFwiaGVhZGluZ3NcIiwgaGVhZGluZ3MpO1xuXHRcdGNvbnN0IGNsZWFySEVhZGVyVGl0bGUgPSBoZWFkZXJUaXRsZS5yZXBsYWNlKC9eI3sxLDZ9XFxzKi8sICcnKS50cmltKCk7XG5cblx0XHRjb25zb2xlLmxvZyhcImNhY2hlXCIsIGNhY2hlKTtcblx0XHRjb25zdCBjYWNoZWRMaW5lcyA9IGNhY2hlPy5zZWN0aW9ucyA/IE9iamVjdC52YWx1ZXMoY2FjaGUuc2VjdGlvbnMpLmV2ZXJ5KHNlY3Rpb24gPT4geyBjb25zb2xlLmxvZyhcInNlY3Rpb25cIiwgeyBzZWN0aW9uIH0pOyByZXR1cm4gdHJ1ZSB9KSA6IFtdO1xuXG5cdFx0aWYgKGhlYWRpbmdzLnNvbWUoaGVhZGluZyA9PiBoZWFkaW5nLmhlYWRpbmcgPT09IGNsZWFySEVhZGVyVGl0bGUpKSB7XG5cblx0XHRcdGNvbnN0IGhlYWRlckluZGV4ID0gaGVhZGluZ3MuZmluZEluZGV4KGhlYWRpbmcgPT4gaGVhZGluZy5oZWFkaW5nID09PSBjbGVhckhFYWRlclRpdGxlKTtcblx0XHRcdGNvbnN0IGN1cnJlbnRIZWFkZXIgPSBoZWFkaW5nc1toZWFkZXJJbmRleF07XG5cdFx0XHRjb25zdCBzdGFydExpbmUgPSBjdXJyZW50SGVhZGVyPy5wb3NpdGlvbi5zdGFydC5saW5lIHx8IC0xO1xuXG5cdFx0XHRjb25zdCBuZXh0SGVhZGVyID0gaGVhZGluZ3NbaGVhZGVySW5kZXggKyAxXTtcblx0XHRcdGxldCBlbmRMaW5lID0gLTE7XG5cdFx0XHRpZiAobmV4dEhlYWRlcikge1xuXHRcdFx0XHRlbmRMaW5lID0gbmV4dEhlYWRlcj8ucG9zaXRpb24uc3RhcnQubGluZSAtIDE7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbmRMaW5lID0gbGluZXMubGVuZ3RoIC0gMVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCByZXN1bHQgPSB7IHN0YXJ0OiBzdGFydExpbmUsIGVuZDogZW5kTGluZSB9XG5cdFx0XHRjb25zb2xlLmxvZyhcImZpbmRIZWFkZXJMaW5lTnVtYmVyc1wiLCB7IHJlc3VsdCwgc3RhcnRMaW5lLCBlbmRMaW5lLCBjdXJyZW50SGVhZGVyLCBsaW5lcyB9KTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7IC8vIFJldHVybiBudWxsIGlmIHRoZSBoZWFkZXIgaXMgbm90IGZvdW5kXG5cdH1cblxuXHRhc3luYyBpbnNlcnRMaW5lKGZpbGU6IFRGaWxlLCBsaW5lOiBudW1iZXIsIHRleHQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGxldCBsaW5lcyA9IChhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpKS5zcGxpdCgnXFxuJyk7XG5cdFx0bGluZXMgPSBbLi4ubGluZXMuc2xpY2UoMCwgbGluZSksIHRleHQsIC4uLmxpbmVzLnNsaWNlKGxpbmUpXTtcblxuXHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0Lm1vZGlmeShmaWxlLCBsaW5lcy5qb2luKCdcXG4nKSk7XG5cdH1cblxuXHRhc3luYyBpbnNlcnRTZWN0aW9uTGluZShmaWxlOiBURmlsZSwgc3RhcnRMaW5lOiBudW1iZXIsIGVuZExpbmU6IG51bWJlciwgdGV4dDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0bGV0IGxpbmVzID0gKGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSkpLnNwbGl0KCdcXG4nKTtcblx0XHRsaW5lcyA9IFsuLi5saW5lcy5zbGljZSgwLCBzdGFydExpbmUpLCB0ZXh0LCAuLi5saW5lcy5zbGljZShlbmRMaW5lLCBsaW5lcy5sZW5ndGggLSAxKV07XG5cdFx0YXdhaXQgdGhpcy5hcHAudmF1bHQubW9kaWZ5KGZpbGUsIGxpbmVzLmpvaW4oJ1xcbicpKTtcblx0fVxuXHRnZXRMYXN0T2Zmc2V0KGZpbGU6IFRGaWxlKTogbnVtYmVyIHtcblx0XHRjb25zdCBzZWN0aW9ucyA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpPy5zZWN0aW9ucztcblx0XHRjb25zdCBzZWN0aW9uID0gc2VjdGlvbnMgPyBzZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGggLSAxXSA6IG51bGw7XG5cdFx0cmV0dXJuIHNlY3Rpb24gPyBzZWN0aW9uLnBvc2l0aW9uLmVuZC5vZmZzZXQgOiAtMTtcblx0fVxuXG5cdGFzeW5jIGNoYW5nZUluc2lkZUhlYWRlclRleHQoaGVhZGVyVGl0bGU6IHN0cmluZywgbmV3VGV4dDogc3RyaW5nLCBmaWxlOiBURmlsZSk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSk7XG5cblx0XHRjb25zdCBsYXN0T2Zmc2V0ID0gdGhpcy5nZXRMYXN0T2Zmc2V0KGZpbGUpO1xuXG5cdFx0Y29uc3QgaGVhZGVyTGluZU51bWJlcnMgPSBhd2FpdCB0aGlzLmZpbmRIZWFkZXJMaW5lTnVtYmVycyhoZWFkZXJUaXRsZSwgZmlsZSk7XG5cdFx0Y29uc29sZS5sb2coXCJoZWFkZXJMaW5lTnVtYmVyc1wiLCBoZWFkZXJMaW5lTnVtYmVycyk7XG5cblx0XHRpZiAoIWhlYWRlckxpbmVOdW1iZXJzKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcImNoYW5nZUluc2lkZUhlYWRlclRleHQuZG9udCBmaW5kIGhlYWRlckxpbmVOdW1iZXJzXCIsIHsgaGVhZGVyVGl0bGUsIG5ld1RleHQsIGZpbGUsIGhlYWRlckxpbmVOdW1iZXJzIH0pO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHN0YXJ0ID0gaGVhZGVyTGluZU51bWJlcnMuc3RhcnQ7XG5cdFx0Y29uc3QgZW5kID0gaGVhZGVyTGluZU51bWJlcnMuZW5kO1xuXG5cblx0XHRhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpO1xuXHRcdGNvbnN0IGVuZExhc3RPZmZzZXQgPSB0aGlzLmdldExhc3RPZmZzZXQoZmlsZSk7XG5cdFx0aWYgKGxhc3RPZmZzZXQgPT09IGVuZExhc3RPZmZzZXQpIHtcblx0XHRcdGF3YWl0IHRoaXMuaW5zZXJ0U2VjdGlvbkxpbmUoZmlsZSwgc3RhcnQgKyAxLCBlbmQsIG5ld1RleHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhd2FpdCB0aGlzLmNoYW5nZUluc2lkZUhlYWRlclRleHQoaGVhZGVyVGl0bGUsIG5ld1RleHQsIGZpbGUpO1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIGNoYW5nZUhlYWRlclRleHQob2xkSGVhZGVyVGl0bGU6IHN0cmluZywgbmV3SGVhZGVyVGl0bGU6IHN0cmluZywgbmV3VGV4dDogc3RyaW5nLCBmaWxlOiBURmlsZSk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSk7XG5cblx0XHRjb25zdCBoZWFkZXJMaW5lTnVtYmVycyA9IGF3YWl0IHRoaXMuZmluZEhlYWRlckxpbmVOdW1iZXJzKG9sZEhlYWRlclRpdGxlLCBmaWxlKTtcblx0XHRjb25zb2xlLmxvZyhcImhlYWRlckxpbmVOdW1iZXJzXCIsIGhlYWRlckxpbmVOdW1iZXJzKTtcblxuXHRcdGlmICghaGVhZGVyTGluZU51bWJlcnMpIHtcblx0XHRcdGNvbnN0IHNlY3Rpb25zID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZmlsZSk/LnNlY3Rpb25zO1xuXHRcdFx0Y29uc3QgbWF4TGluZSA9IHNlY3Rpb25zID8gTWF0aC5tYXgoLi4uc2VjdGlvbnMubWFwKHNlY3Rpb24gPT4gc2VjdGlvbi5wb3NpdGlvbi5lbmQubGluZSkpIDogLTE7XG5cdFx0XHRpZiAobWF4TGluZSAhPT0gLTEpIHtcblx0XHRcdFx0YXdhaXQgdGhpcy5pbnNlcnRMaW5lKGZpbGUsIG1heExpbmUsIGAke25ld0hlYWRlclRpdGxlfWApO1xuXHRcdFx0fVxuXG5cdFx0XHRhd2FpdCB0aGlzLmNoYW5nZUluc2lkZUhlYWRlclRleHQob2xkSGVhZGVyVGl0bGUsIG5ld0hlYWRlclRpdGxlLCBmaWxlKTtcblx0XHRcdHJldHVybjtcblxuXHRcdH1cblx0XHRjb25zb2xlLmxvZyhcImNoYW5nZUhlYWRlclRleHRcIiwgeyBvbGRIZWFkZXJUaXRsZSwgbmV3SGVhZGVyVGl0bGUsIG5ld1RleHQsIGZpbGUsIGhlYWRlckxpbmVOdW1iZXJzIH0pO1xuXG5cdFx0aWYgKGhlYWRlckxpbmVOdW1iZXJzKSB7XG5cdFx0XHRjb25zdCBzdGFydCA9IGhlYWRlckxpbmVOdW1iZXJzLnN0YXJ0O1xuXHRcdFx0Y29uc3QgZW5kID0gaGVhZGVyTGluZU51bWJlcnMuZW5kO1xuXG5cdFx0XHRhd2FpdCB0aGlzLmluc2VydFNlY3Rpb25MaW5lKGZpbGUsIHN0YXJ0ICsgMSwgZW5kLCBuZXdUZXh0KTtcblxuXHRcdFx0Y29uc3QgbWV0YWRhdGFDYWNoZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGU7XG5cdFx0XHRjb25zdCBoZWFkaW5ncyA9IG1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpPy5oZWFkaW5ncyB8fCBbXTtcblx0XHRcdGhlYWRpbmdzLmZvckVhY2goaGVhZGluZyA9PiB7XG5cdFx0XHRcdGlmIChoZWFkaW5nLmhlYWRpbmcgPT09IG9sZEhlYWRlclRpdGxlKSB7XG5cdFx0XHRcdFx0aGVhZGluZy5oZWFkaW5nID0gbmV3SGVhZGVyVGl0bGU7IC8vIENoYW5nZSB0aGUgaGVhZGVyIHRleHRcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpOyAvLyBVcGRhdGUgdGhlIGNhY2hlIGFmdGVyIHNhdmluZ1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIGdldFBhdGhMaXN0c1RvUm9vdChmaWxlOiBURmlsZSwgY3VycmVudFBhdGg6IHN0cmluZ1tdID0gW10pOiBQcm9taXNlPHN0cmluZ1tdW10+IHtcblx0XHRjb25zdCBmcm9udG1hdHRlciA9IHRoaXMuZ2V0RnJvbnRtYXR0ZXIoZmlsZSk7XG5cdFx0Y29uc3QgZW50aXR5UGFyZW50RW50aXR5ID0gZnJvbnRtYXR0ZXJbXCJlbnRpdHlfUGFyZW50SXRlbVwiXTtcblx0XHRjb25zb2xlLmxvZyhcImVudGl0eVBhcmVudEVudGl0eVwiLCBlbnRpdHlQYXJlbnRFbnRpdHkpO1xuXHRcdGlmICghZW50aXR5UGFyZW50RW50aXR5KSB7XG5cdFx0XHRyZXR1cm4gW107IC8vIFJldHVybiBhbiBlbXB0eSBhcnJheSBpbnN0ZWFkIG9mIGN1cnJlbnRQYXRoXG5cdFx0fVxuXG5cdFx0Y29uc3QgcGFyZW50RW50aXRpZXMgPSBBcnJheS5pc0FycmF5KGVudGl0eVBhcmVudEVudGl0eSkgPyBlbnRpdHlQYXJlbnRFbnRpdHkgOiBbZW50aXR5UGFyZW50RW50aXR5XTtcblx0XHRjb25zdCBwYXRoczogc3RyaW5nW11bXSA9IFtdO1xuXHRcdGNvbnNvbGUubG9nKFwicGFyZW50RW50aXRpZXNcIiwgcGFyZW50RW50aXRpZXMpO1xuXHRcdGZvciAoY29uc3QgcGFyZW50IG9mIHBhcmVudEVudGl0aWVzKSB7XG5cdFx0XHRjb25zdCBjbGVhbmVkUGFyZW50ID0gdGhpcy5yZW1vdmVCcmFja2V0c0FuZFRleHQocGFyZW50KTtcblx0XHRcdGNvbnNvbGUubG9nKFwiY2xlYW5lZFBhcmVudFwiLCBjbGVhbmVkUGFyZW50KTtcblx0XHRcdGNvbnN0IHBhcmVudEZpbGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xuXG5cdFx0XHRjb25zdCBwYXJlbnRGaWxlID0gcGFyZW50RmlsZXMuZmluZChmaWxlID0+IGZpbGUuYmFzZW5hbWUgPT09IGNsZWFuZWRQYXJlbnQgJiYgZmlsZS5leHRlbnNpb24gPT09IFwibWRcIik7XG5cdFx0XHRjb25zb2xlLmxvZyhcInBhcmVudEZpbGVcIiwgcGFyZW50RmlsZSk7XG5cblx0XHRcdGlmIChwYXJlbnRGaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJwYXJlbnRGaWxlLS0tXCIsIHBhcmVudEZpbGUpO1xuXHRcdFx0XHRpZiAoY2xlYW5lZFBhcmVudCA9PT0gZmlsZS5iYXNlbmFtZSkge1xuXHRcdFx0XHRcdC8vIFJlYWNoZWQgdGhlIHJvb3Qgd2hlcmUgdGhlIGZpbGUgcmVmZXJlbmNlcyBpdHNlbGZcblx0XHRcdFx0XHRwYXRocy5wdXNoKFsuLi5jdXJyZW50UGF0aF0pO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwicGF0aHMxJFwiLCBwYXRocyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIHBhcmVudCBmaWxlIGlzIGEgcm9vdCBlbnRpdHksIGlmIHNvLCBleGl0XG5cdFx0XHRcdFx0Ly8gUmVjdXJzaXZlbHkgZmluZCBwYXRocyBmb3IgdGhlIHBhcmVudCBmaWxlXG5cdFx0XHRcdFx0Y29uc3QgcGFyZW50UGF0aHMgPSBhd2FpdCB0aGlzLmdldFBhdGhMaXN0c1RvUm9vdChwYXJlbnRGaWxlLCBbLi4uY3VycmVudFBhdGgsIGNsZWFuZWRQYXJlbnRdKTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInBhcmVudFBhdGhzXCIsIHBhcmVudFBhdGhzKTtcblx0XHRcdFx0XHRpZiAocGFyZW50UGF0aHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0cGF0aHMucHVzaCguLi5wYXJlbnRQYXRocyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwicGF0aHMyJFwiLCBwYXRocyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0Y29uc29sZS5sb2coXCJwYXRoczMkXCIsIHBhdGhzKTtcblx0XHRjb25zb2xlLmxvZyhcImN1cnJlbnRQYXRoXCIsIGN1cnJlbnRQYXRoKTtcblx0XHRyZXR1cm4gcGF0aHM7XG5cdH1cblxuXHRhc3luYyBwcm9jZXNzRnJvbnRNYXR0ZXIoZmlsZTogVEZpbGUsIGNhbGxiYWNrOiAoZnJvbnRtYXR0ZXI6IGFueSkgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICghKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ1Byb3ZpZGVkIGZpbGUgaXMgbm90IGEgVEZpbGUuJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgZnJvbnRtYXR0ZXIgPSB0aGlzLmdldEZyb250bWF0dGVyKGZpbGUpO1xuXHRcdGNhbGxiYWNrKGZyb250bWF0dGVyKTtcblxuXHRcdC8vIEFzc3VtaW5nIHlvdSBoYXZlIGEgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgZmlsZSB3aXRoIG5ldyBmcm9udG1hdHRlclxuXHRcdGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpO1xuXHRcdGNvbnN0IHVwZGF0ZWRDb250ZW50ID0gdGhpcy51cGRhdGVGcm9udG1hdHRlcihjb250ZW50LCBmcm9udG1hdHRlcik7XG5cdFx0YXdhaXQgdGhpcy5hcHAudmF1bHQubW9kaWZ5KGZpbGUsIHVwZGF0ZWRDb250ZW50KTtcblx0fVxuXG5cdHByaXZhdGUgdXBkYXRlRnJvbnRtYXR0ZXIoY29udGVudDogc3RyaW5nLCBmcm9udG1hdHRlcjogYW55KTogc3RyaW5nIHtcblx0XHQvLyBMb2dpYyB0byB1cGRhdGUgdGhlIGZyb250bWF0dGVyIGluIHRoZSBmaWxlIGNvbnRlbnRcblx0XHQvLyBUaGlzIGlzIGEgcGxhY2Vob2xkZXIgYW5kIHNob3VsZCBiZSByZXBsYWNlZCB3aXRoIGFjdHVhbCBsb2dpY1xuXHRcdHJldHVybiBjb250ZW50OyAvLyBNb2RpZnkgdGhpcyB0byByZXR1cm4gdGhlIHVwZGF0ZWQgY29udGVudFxuXHR9XG5cblx0Z2V0SGVhZGluZ3NFeHQoZmlsZTogVEZpbGUpOiBIZWFkaW5nQ2FjaGVFeHRbXSB7XG5cdFx0Y29uc3QgZmlsZUNhY2hlZE1ldGFkYXRhID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZmlsZSlcblx0XHRpZiAoIWZpbGVDYWNoZWRNZXRhZGF0YSkgcmV0dXJuIFtdXG5cblx0XHRjb25zdCBoZWFkaW5ncyA9IGZpbGVDYWNoZWRNZXRhZGF0YT8uaGVhZGluZ3MgfHwgW107XG5cdFx0Y29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudEZyb21GaWxlKGZpbGUpXG5cblx0XHRjb25zdCBoZWFkaW5nc0V4dCA9IGhlYWRpbmdzLm1hcChoZWFkaW5nID0+IHtcblx0XHRcdGNvbnN0IGxpbmVzID0gdGhpcy5nZXRMaW5lc0ZvckhlYWRpbmcoZmlsZSwgaGVhZGluZyk7XG5cdFx0XHRjb25zb2xlLmxvZyhcImxpbmVzXCIsIGxpbmVzKTtcblx0XHRcdGNvbnN0IGhlYWRpbmdFeHQgPSBuZXcgSGVhZGluZ0NhY2hlRXh0KGhlYWRpbmcpO1xuXHRcdFx0aGVhZGluZ0V4dC5saW5lcyA9IGxpbmVzO1xuXHRcdFx0aGVhZGluZ0V4dC5saW5lc1dpdGhNYXJrZG93biA9IGxpbmVzLm1hcChsaW5lID0+IHRoaXMuYWRkTWFya2Rvd24obGluZSkpO1xuXHRcdFx0aGVhZGluZ0V4dC5saW5lc1dpdGhNYXJrZG93bkFuZEhlYWRlcnMgPSBsaW5lcy5tYXAobGluZSA9PiB0aGlzLmFkZE1hcmtkb3duQW5kSGVhZGVycyhsaW5lKSk7XG5cdFx0XHRoZWFkaW5nRXh0LmhlYWRpbmdTb3VyY2UgPSBoZWFkaW5nXG5cblx0XHRcdGNvbnNvbGUubG9nKFwiaGVhZGluZ0V4dFwiLCBoZWFkaW5nRXh0LCBoZWFkaW5nRXh0LmxpbmVzKTtcblx0XHRcdHJldHVybiBoZWFkaW5nRXh0O1xuXHRcdH0pO1xuXG5cdFx0aGVhZGluZ3NFeHQuZm9yRWFjaCgoaGVhZGluZ0V4dCwgaW5kZXgpID0+IHtcblx0XHRcdGNvbnN0IHBhcmVudEhlYWRpbmcgPSB0aGlzLmdldFBhcmVudEhlYWRpbmcoaGVhZGluZ0V4dCwgaGVhZGluZ3NFeHQpO1xuXHRcdFx0aGVhZGluZ0V4dC5wYXJlbnRIZWFkaW5nID0gcGFyZW50SGVhZGluZztcblx0XHRcdGhlYWRpbmdFeHQucG9zaXRpb25Db250ZW50U3RhcnRMaW5lID0gaGVhZGluZ0V4dC5wb3NpdGlvbi5zdGFydC5saW5lICsgMVxuXG5cblx0XHRcdC8vIERldGVybWluZSB0aGUgZW5kIGxpbmUgZm9yIGVhY2ggaGVhZGluZ1xuXHRcdFx0aWYgKGluZGV4IDwgaGVhZGluZ3NFeHQubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRoZWFkaW5nRXh0LnBvc2l0aW9uQ29udGVudEVuZExpbmUgPSBoZWFkaW5nc0V4dFtpbmRleCArIDFdLnBvc2l0aW9uLnN0YXJ0LmxpbmUgLSAxO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGVcblx0XHRcdFx0aGVhZGluZ0V4dC5wb3NpdGlvbkNvbnRlbnRFbmRMaW5lID0gdGhpcy5nZXRMYXN0TGluZU9mRmlsZShmaWxlKVxuXHRcdFx0fVxuXHRcdFx0aGVhZGluZ0V4dC5zZWN0aW9ucyA9IHRoaXMuZ2V0U2VjdGlvbnNCZXR3ZWVuSGVhZGluZ3MoZmlsZUNhY2hlZE1ldGFkYXRhLCBoZWFkaW5nRXh0KVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGhlYWRpbmdzRXh0O1xuXHR9XG5cblx0Z2V0Q29udGVudEZyb21GaWxlKGZpbGU6IFRGaWxlKTogc3RyaW5nIHtcblx0XHRsZXQgY29udGVudCA9IFwiXCJcblx0XHRjb25zdCByZXN1bHQgPSB0aGlzLmFwcC52YXVsdC5jYWNoZWRSZWFkKGZpbGUpLnRoZW4oZmlsZUNvbnRlbnQgPT4ge1xuXHRcdFx0Y29udGVudCA9IGZpbGVDb250ZW50XG5cdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIHJlYWRpbmcgZmlsZTpcIiwgZXJyb3IpO1xuXHRcdH0pO1xuXHRcdGlmIChmaWxlLnBhdGggPT09IFwidGVzdC0ubWRcIikge1xuXHRcdFx0Y29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oXCIvVXNlcnMvYXJ0ZW1kdm9yeWFka2luL1Byb2plY3RzL29ic2lkaWFuLXNoYXJwZW5lci9zcmMvSGVscGVycy9fX3Rlc3RzX18vXCIsICd0ZXN0RGF0YS5tZCcpLCAndXRmOCcpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29udGVudFxuXHR9XG5cblx0Z2V0Q29udGVudEJ5U2VjdGlvbihmaWxlOiBURmlsZSwgc2VjdGlvbjogU2VjdGlvbkNhY2hlKTogc3RyaW5nIHtcblxuXHRcdGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnRGcm9tRmlsZShmaWxlKVxuXG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29udGVudEJ5U2VjdGlvbkFuZENvbnRlbnQoY29udGVudCwgc2VjdGlvbilcblx0fVxuXG5cdGdldENvbnRlbnRCeVNlY3Rpb25BbmRDb250ZW50KGZpbGVDb250ZW50OiBzdHJpbmcsIHNlY3Rpb246IFNlY3Rpb25DYWNoZSk6IHN0cmluZyB7XG5cdFx0Y29uc3QgY29udGVudFNlY3Rpb24gPSBmaWxlQ29udGVudC5zbGljZShzZWN0aW9uLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldCwgc2VjdGlvbi5wb3NpdGlvbi5lbmQub2Zmc2V0KVxuXHRcdHJldHVybiBjb250ZW50U2VjdGlvblxuXHR9XG5cblxuXHRwcml2YXRlIGdldFNlY3Rpb25zQmV0d2VlbkhlYWRpbmdzKGZpbGVDYWNoZWRNZXRhZGF0YTogQ2FjaGVkTWV0YWRhdGEsIGhlYWRpbmdFeHQ6IEhlYWRpbmdDYWNoZUV4dCk6IFNlY3Rpb25DYWNoZVtdIHtcblx0XHRpZiAoIWZpbGVDYWNoZWRNZXRhZGF0YSkgcmV0dXJuIFtdXG5cblx0XHRjb25zdCBzZWN0aW9ucyA9IGZpbGVDYWNoZWRNZXRhZGF0YT8uc2VjdGlvbnMgfHwgW107XG5cblx0XHRjb25zdCBuZXh0SGVhZGluZyA9IHRoaXMuZ2V0TmV4dEhlYWRpbmcoZmlsZUNhY2hlZE1ldGFkYXRhLCBoZWFkaW5nRXh0KVxuXG5cdFx0Y29uc3Qgc2VjdGlvbnNCZXR3ZWVuSGVhZGluZ3MgPSBzZWN0aW9ucy5maWx0ZXIoc2VjdGlvbiA9PlxuXHRcdFx0c2VjdGlvbi5wb3NpdGlvbi5zdGFydC5saW5lID4gaGVhZGluZ0V4dC5wb3NpdGlvbi5zdGFydC5saW5lICYmIChuZXh0SGVhZGluZyA/IHNlY3Rpb24ucG9zaXRpb24uZW5kLmxpbmUgPCBuZXh0SGVhZGluZz8ucG9zaXRpb24uc3RhcnQubGluZSA6IHRydWUpKVxuXG5cdFx0cmV0dXJuIHNlY3Rpb25zQmV0d2VlbkhlYWRpbmdzXG5cdH1cblxuXG5cdHByaXZhdGUgZ2V0TmV4dEhlYWRpbmcoZmlsZUNhY2hlZE1ldGFkYXRhOiBDYWNoZWRNZXRhZGF0YSwgaGVhZGluZ0V4dDogSGVhZGluZ0NhY2hlRXh0KTogSGVhZGluZ0NhY2hlIHwgbnVsbCB7XG5cdFx0Y29uc3QgaGVhZGluZ3MgPSBmaWxlQ2FjaGVkTWV0YWRhdGEuaGVhZGluZ3MgfHwgW107XG5cblx0XHRsZXQgZmluZGVkID0gZmFsc2Vcblx0XHRjb25zdCBmaW5kZWRIZWFkaW5nID0gaGVhZGluZ3MuZmluZChoZWFkaW5nID0+IHtcblx0XHRcdGlmIChmaW5kZWQpIHtcblx0XHRcdFx0cmV0dXJuIGhlYWRpbmdcblx0XHRcdH1cblxuXHRcdFx0aWYgKGhlYWRpbmcucG9zaXRpb24uc3RhcnQubGluZSA9PSBoZWFkaW5nRXh0LnBvc2l0aW9uLnN0YXJ0LmxpbmUpIHtcblx0XHRcdFx0ZmluZGVkID0gdHJ1ZVxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHRyZXR1cm4gZmluZGVkSGVhZGluZyB8fCBudWxsO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRMYXN0TGluZU9mRmlsZShmaWxlOiBURmlsZSk6IG51bWJlciB7XG5cdFx0bGV0IGxhc3RMaW5lID0gLTE7XG5cblx0XHR0aGlzLmFwcC52YXVsdC5jYWNoZWRSZWFkKGZpbGUpLnRoZW4oZmlsZUNvbnRlbnQgPT4ge1xuXHRcdFx0bGFzdExpbmUgPSBmaWxlQ29udGVudC5zcGxpdCgnXFxuJykubGVuZ3RoIC0gMTtcblx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiRXJyb3IgcmVhZGluZyBmaWxlOlwiLCBlcnJvcik7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gbGFzdExpbmVcblx0fVxuXHRwcml2YXRlIGdldExpbmVzRm9ySGVhZGluZyhmaWxlOiBURmlsZSwgaGVhZGluZzogSGVhZGluZ0NhY2hlKTogc3RyaW5nW10ge1xuXHRcdC8vIEltcGxlbWVudCBsb2dpYyB0byBleHRyYWN0IGxpbmVzIGZvciB0aGUgZ2l2ZW4gaGVhZGluZ1xuXHRcdGNvbnNvbGUubG9nKFwiZ2V0TGluZXNGb3JIZWFkaW5nXCIsIHsgZmlsZSwgaGVhZGluZyB9KTtcblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHRwcml2YXRlIGFkZE1hcmtkb3duKGxpbmU6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gSW1wbGVtZW50IGxvZ2ljIHRvIGFkZCBtYXJrZG93biB0byBhIGxpbmVcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdHByaXZhdGUgYWRkTWFya2Rvd25BbmRIZWFkZXJzKGxpbmU6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Ly8gSW1wbGVtZW50IGxvZ2ljIHRvIGFkZCBtYXJrZG93biBhbmQgaGVhZGVycyB0byBhIGxpbmVcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdHByaXZhdGUgZ2V0UGFyZW50SGVhZGluZyhoZWFkaW5nOiBIZWFkaW5nQ2FjaGVFeHQsIGFsbEhlYWRpbmdzOiBIZWFkaW5nQ2FjaGVFeHRbXSk6IEhlYWRpbmdDYWNoZUV4dCB8IG51bGwge1xuXHRcdC8vIEl0ZXJhdGUgYmFja3dhcmRzIHRocm91Z2ggdGhlIGxpc3Qgb2YgaGVhZGluZ3MgdG8gZmluZCB0aGUgZmlyc3QgaGVhZGluZyB3aXRoIGEgbG93ZXIgbGV2ZWxcblx0XHRmb3IgKGxldCBpID0gYWxsSGVhZGluZ3MuaW5kZXhPZihoZWFkaW5nKSAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRpZiAoYWxsSGVhZGluZ3NbaV0ubGV2ZWwgPCBoZWFkaW5nLmxldmVsKSB7XG5cdFx0XHRcdHJldHVybiBhbGxIZWFkaW5nc1tpXTsgLy8gUmV0dXJuIHRoZSBmaXJzdCBoZWFkaW5nIHdpdGggYSBsb3dlciBsZXZlbFxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDsgLy8gUmV0dXJuIG51bGwgaWYgbm8gcGFyZW50IGhlYWRpbmcgaXMgZm91bmRcblx0fVxufSJdfQ==