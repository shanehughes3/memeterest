import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "header-component",
    templateUrl: "./header.html",
    styleUrls: ["./header.scss"]
})
export class HeaderComponent {
	@Input() user;
	@Input() currentPage: string;
	@Output() selectPage = new EventEmitter();
    constructor() { }

}
