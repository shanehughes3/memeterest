import { Component, Input } from "@angular/core";
import { ApiService } from "../../app/api.service";

@Component({
    selector: "meme-display",
    templateUrl: "./meme-display.html",
    styleUrls: ["./meme-display.scss"]
})
export class MemeDisplayComponent {
	@Input() user: any;
	@Input() pageType: string;
	memes: any;

    constructor(
		private api: ApiService
	) { }

	ngOnInit() {
		if (this.pageType == "all") {
			this.api.getAllMemes()
				.subscribe(
					(res) => {
						console.log(res);
						this.memes = res.json().memes;
					},
					(err) => { console.error(err); }
				);
		} else if (this.pageType == "mine") {
			this.api.getUserMemes(this.user._id)
				.subscribe(
					(res) => {
						console.log(res);
						this.memes = res.json().memes;
					},
					(err) => { console.error(err); }
				);
		}
	}
}
