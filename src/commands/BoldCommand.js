import { __awaiter } from "tslib";
import { MarkerCommandBase } from './MarkerCommandBase';
export class BoldCommand extends MarkerCommandBase {
    constructor() {
        super(...arguments);
        this.id = 'bold-command';
        this.name = 'Smart Toggle Bold';
        this.prefix = 'bc1';
    }
    execute(app) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.executeBase(app, 'bold');
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZENvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb2xkQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsTUFBTSxPQUFPLFdBQVksU0FBUSxpQkFBaUI7SUFBbEQ7O1FBQ0MsT0FBRSxHQUFHLGNBQWMsQ0FBQztRQUNwQixTQUFJLEdBQUcsbUJBQW1CLENBQUM7UUFDM0IsV0FBTSxHQUFHLEtBQUssQ0FBQztJQU1oQixDQUFDO0lBSE0sT0FBTyxDQUFDLEdBQVE7O1lBQ3JCLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckMsQ0FBQztLQUFBO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kLCBBcHAgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBNYXJrZXJDb21tYW5kQmFzZSB9IGZyb20gJy4vTWFya2VyQ29tbWFuZEJhc2UnO1xuXG5leHBvcnQgY2xhc3MgQm9sZENvbW1hbmQgZXh0ZW5kcyBNYXJrZXJDb21tYW5kQmFzZSB7XG5cdGlkID0gJ2JvbGQtY29tbWFuZCc7XG5cdG5hbWUgPSAnU21hcnQgVG9nZ2xlIEJvbGQnO1xuXHRwcmVmaXggPSAnYmMxJztcblx0Y29tbWFuZDogQ29tbWFuZDtcblxuXHRhc3luYyBleGVjdXRlKGFwcDogQXBwKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0YXdhaXQgdGhpcy5leGVjdXRlQmFzZShhcHAsICdib2xkJyk7XG5cdH1cbn1cbiJdfQ==