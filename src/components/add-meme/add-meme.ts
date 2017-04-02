import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "../../app/api.service";

@Component({
    selector: "add-meme",
    templateUrl: "./add-meme.html",
    styleUrls: ["./add-meme.scss"]
})
export class AddMemeComponent {
	@Input() user: any;
	@Output() memeSubmitted: EventEmitter<any> = new EventEmitter();
	URLTest = /^(https?:\/\/)?[A-Za-z0-9-]+\.[A-Za-z0-9-]+/;
	inputs = new FormGroup({
		memeURL: new FormControl("", Validators.pattern(this.URLTest)),
		memeDescription: new FormControl("")
	});
	isImageLoading: boolean = false;
	imageURLForPreloading: string;
	wasThereAnImageError: boolean = false;
	wasThereASubmissionError: boolean = false;

    constructor(
		private api: ApiService
	) { }

	public tryToLoadImage() {
		if (this.inputs.controls.memeURL.valid) {
			this.imageURLForPreloading = "";
			setTimeout(() => {
				this.imageURLForPreloading = this.inputs.controls.memeURL.value;
			}, 10);
		}
	}

	public submit() {
		this.wasThereAnImageError = false;
		this.api.saveMeme(this.user._id, {
			meme: {
				imageURL: this.inputs.controls.memeURL.value,
				text: this.inputs.controls.memeDescription.value
			}
		})
			.subscribe(
				(res) => {
					this.memeSubmitted.emit();
				},
				(err) => {
					this.wasThereASubmissionError = true;
					console.error(err);
				}
			);
	}
}
