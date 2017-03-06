import { Component } from '@angular/core';
import { ApiService } from "./api.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';

    constructor (
        private api: ApiService
    ) {}

    ngOnInit() {
        this.api.getUserInfo()
        .subscribe(
            (data) => {
                console.log(data);
            },
            (err) => {
                console.warn(err);
            }
        );
    }
}
