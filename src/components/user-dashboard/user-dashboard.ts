import { Component, Input } from "@angular/core";

@Component({
    selector: "user-dashboard-component",
    templateUrl: "./user-dashboard.html",
    styleUrls: ["./user-dashboard.scss"]
})
export class UserDashboardComponent {
	@Input() user: any;
    constructor() { }

}
