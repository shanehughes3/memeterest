import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
    constructor(
        private http: Http
    ) {}

    public getUserInfo() {
        return this.http.get("/auth/info")
        .map((res) => {
            if (!res.ok) {
                Observable.throw(res);
            } else {
                return res;
            }
        });
    }

    public getAllMemes() {

    }

    public getUserMemes() {

    }

    public saveMeme() {

    }

    public editMeme() {

    }

    public deleteMeme() {

    }

}
