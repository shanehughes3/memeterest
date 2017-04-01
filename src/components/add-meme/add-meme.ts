import { Component, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "../../app/api.service";

@Component({
    selector: "add-meme",
    templateUrl: "./add-meme.html",
    styleUrls: ["./add-meme.scss"]
})
export class AddMemeComponent {
	@Input() user: any;
	URLTest = /^(https?:\/\/)?[A-Za-z0-9-]+\.[A-Za-z0-9-]+/;
	inputs = new FormGroup({
		memeURL: new FormControl("", Validators.pattern(this.URLTest)),
		memeDescription: new FormControl("")
	});
	isImageLoading: boolean = false;
	imageURLForPreloading: string;
	wasThereAnImageError: boolean = false;

    constructor(
		private api: ApiService
	) { }

	public tryToLoadImage() {
		if (this.inputs.controls.memeURL.valid) {
			this.imageURLForPreloading = this.inputs.controls.memeURL.value;
		}
	}

	public submit() {
		this.api.saveMeme(this.user._id, {
			imageURL: this.inputs.controls.memeURL.value,
			text: this.inputs.controls.memeDescription.value
		})
			.subscribe(
				(res) => { console.log(res); },
				(err) => { console.error(err); }
			);
	}
}
