import { Component, ViewEncapsulation } from '@angular/core';
import { ApiService } from "./api.service";

@Component({
    selector: 'app-root',
	// encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app works!';
    loggedIn: boolean = false;
    loading: boolean = true;
    user: any;
	currentPage: string = "all";

    constructor (
        private api: ApiService
    ) {}

    ngOnInit() {
        this.api.getUserInfo()
        .subscribe(
            (data) => {
                this.loggedIn = true;
                this.loading = false;
                this.user = data.json().user;
                console.log(data, this.user);
            },
            (err) => {
                this.loggedIn = false;
                this.loading = false;
                console.warn(err);
            }
        );
    }

	selectPage(page) {
		this.currentPage = page;
	}
}
