import { __awaiter } from "tslib";
import { MarkerCommandBase } from './MarkerCommandBase';
export class StrikethroughCommand extends MarkerCommandBase {
    constructor() {
        super(...arguments);
        this.id = 'strikethrough-command';
        this.name = 'Smart Toggle Strikethrough';
        this.prefix = 'st';
    }
    execute(app) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.executeBase(app, 'strikethrough');
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaWtldGhyb3VnaENvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTdHJpa2V0aHJvdWdoQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGlCQUFpQjtJQUEzRDs7UUFDQyxPQUFFLEdBQUcsdUJBQXVCLENBQUM7UUFDN0IsU0FBSSxHQUFHLDRCQUE0QixDQUFDO1FBQ3BDLFdBQU0sR0FBRyxJQUFJLENBQUM7SUFPZixDQUFDO0lBSk0sT0FBTyxDQUFDLEdBQVE7O1lBQ3JCLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDOUMsQ0FBQztLQUFBO0NBRUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kLCBBcHAgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBNYXJrZXJDb21tYW5kQmFzZSB9IGZyb20gJy4vTWFya2VyQ29tbWFuZEJhc2UnO1xuXG5leHBvcnQgY2xhc3MgU3RyaWtldGhyb3VnaENvbW1hbmQgZXh0ZW5kcyBNYXJrZXJDb21tYW5kQmFzZSB7XG5cdGlkID0gJ3N0cmlrZXRocm91Z2gtY29tbWFuZCc7XG5cdG5hbWUgPSAnU21hcnQgVG9nZ2xlIFN0cmlrZXRocm91Z2gnO1xuXHRwcmVmaXggPSAnc3QnO1xuXHRjb21tYW5kOiBDb21tYW5kO1xuXG5cdGFzeW5jIGV4ZWN1dGUoYXBwOiBBcHApOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRhd2FpdCB0aGlzLmV4ZWN1dGVCYXNlKGFwcCwgJ3N0cmlrZXRocm91Z2gnKTtcblx0fVxuXG59XG4iXX0=