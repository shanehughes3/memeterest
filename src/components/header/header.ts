import { Component, Input } from "@angular/core";

@Component({
    selector: "header-component",
    templateUrl: "./header.html",
    styleUrls: ["./header.scss"]
})
export class HeaderComponent {
	@Input() user;
    constructor() { }

}
