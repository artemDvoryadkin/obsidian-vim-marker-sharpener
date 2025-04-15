import { __awaiter } from "tslib";
import { MarkerCommandBase } from './MarkerCommandBase';
export class HighlightCommand extends MarkerCommandBase {
    constructor() {
        super(...arguments);
        this.id = 'highlight-command';
        this.name = 'Smart Toggle Highlight';
        this.prefix = 'hc';
    }
    execute(app) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.executeBase(app, 'highlight');
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGlnaGxpZ2h0Q29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkhpZ2hsaWdodENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3hELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxpQkFBaUI7SUFBdkQ7O1FBQ0MsT0FBRSxHQUFHLG1CQUFtQixDQUFDO1FBQ3pCLFNBQUksR0FBRyx3QkFBd0IsQ0FBQztRQUNoQyxXQUFNLEdBQUcsSUFBSSxDQUFDO0lBTWYsQ0FBQztJQUhNLE9BQU8sQ0FBQyxHQUFROztZQUNyQixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTtDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZCwgQXBwIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgTWFya2VyQ29tbWFuZEJhc2UgfSBmcm9tICcuL01hcmtlckNvbW1hbmRCYXNlJztcblxuXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0Q29tbWFuZCBleHRlbmRzIE1hcmtlckNvbW1hbmRCYXNlIHtcblx0aWQgPSAnaGlnaGxpZ2h0LWNvbW1hbmQnO1xuXHRuYW1lID0gJ1NtYXJ0IFRvZ2dsZSBIaWdobGlnaHQnO1xuXHRwcmVmaXggPSAnaGMnO1xuXHRjb21tYW5kOiBDb21tYW5kO1xuXG5cdGFzeW5jIGV4ZWN1dGUoYXBwOiBBcHApOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRhd2FpdCB0aGlzLmV4ZWN1dGVCYXNlKGFwcCwgJ2hpZ2hsaWdodCcpO1xuXHR9XG59XG4iXX0=