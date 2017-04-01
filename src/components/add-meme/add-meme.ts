import { Component, Input } from "@angular/core";

@Component({
    selector: "add-meme",
    templateUrl: "./add-meme.html",
    styleUrls: ["./add-meme.scss"]
})
export class AddMemeComponent {
	@Input() user: any;
	memeURL: string;
	memeDescription: string;

    constructor() { }

}
