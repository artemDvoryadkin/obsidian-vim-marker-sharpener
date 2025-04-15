import { __awaiter } from "tslib";
import { MarkerCommandBase } from './MarkerCommandBase';
export class CodeCommand extends MarkerCommandBase {
    constructor() {
        super(...arguments);
        this.id = 'code-command';
        this.name = 'Smart Toggle Code';
        this.prefix = 'cd';
    }
    execute(app) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.executeBase(app, 'code');
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDb2RlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsTUFBTSxPQUFPLFdBQVksU0FBUSxpQkFBaUI7SUFBbEQ7O1FBQ0MsT0FBRSxHQUFHLGNBQWMsQ0FBQztRQUNwQixTQUFJLEdBQUcsbUJBQW1CLENBQUM7UUFDM0IsV0FBTSxHQUFHLElBQUksQ0FBQztJQU1mLENBQUM7SUFITSxPQUFPLENBQUMsR0FBUTs7WUFDckIsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQUE7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1hbmQsIEFwcCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IE1hcmtlckNvbW1hbmRCYXNlIH0gZnJvbSAnLi9NYXJrZXJDb21tYW5kQmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBDb2RlQ29tbWFuZCBleHRlbmRzIE1hcmtlckNvbW1hbmRCYXNlIHtcblx0aWQgPSAnY29kZS1jb21tYW5kJztcblx0bmFtZSA9ICdTbWFydCBUb2dnbGUgQ29kZSc7XG5cdHByZWZpeCA9ICdjZCc7XG5cdGNvbW1hbmQ6IENvbW1hbmQ7XG5cblx0YXN5bmMgZXhlY3V0ZShhcHA6IEFwcCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGF3YWl0IHRoaXMuZXhlY3V0ZUJhc2UoYXBwLCAnY29kZScpO1xuXHR9XG59XG4iXX0=