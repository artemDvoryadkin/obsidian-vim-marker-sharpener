import { __awaiter } from "tslib";
import { MarkerCommandBase } from './MarkerCommandBase';
export class ItalicCommand extends MarkerCommandBase {
    constructor() {
        super(...arguments);
        this.id = 'italic-command';
        this.name = 'Smart Toggle Italic';
        this.prefix = 'ic';
    }
    execute(app) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.executeBase(app, 'italic');
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXRhbGljQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkl0YWxpY0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhELE1BQU0sT0FBTyxhQUFjLFNBQVEsaUJBQWlCO0lBQXBEOztRQUNDLE9BQUUsR0FBRyxnQkFBZ0IsQ0FBQztRQUN0QixTQUFJLEdBQUcscUJBQXFCLENBQUM7UUFDN0IsV0FBTSxHQUFHLElBQUksQ0FBQztJQU9mLENBQUM7SUFKTSxPQUFPLENBQUMsR0FBUTs7WUFDckIsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN2QyxDQUFDO0tBQUE7Q0FFRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1hbmQsIEFwcCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IE1hcmtlckNvbW1hbmRCYXNlIH0gZnJvbSAnLi9NYXJrZXJDb21tYW5kQmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBJdGFsaWNDb21tYW5kIGV4dGVuZHMgTWFya2VyQ29tbWFuZEJhc2Uge1xuXHRpZCA9ICdpdGFsaWMtY29tbWFuZCc7XG5cdG5hbWUgPSAnU21hcnQgVG9nZ2xlIEl0YWxpYyc7XG5cdHByZWZpeCA9ICdpYyc7XG5cdGNvbW1hbmQ6IENvbW1hbmQ7XG5cblx0YXN5bmMgZXhlY3V0ZShhcHA6IEFwcCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGF3YWl0IHRoaXMuZXhlY3V0ZUJhc2UoYXBwLCAnaXRhbGljJyk7XG5cdH1cblxufVxuIl19