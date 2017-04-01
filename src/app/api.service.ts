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
		return this.http.get("/api/all");
    }

    public getUserMemes(userId) {
		return this.http.get(`/api/${userId}`)
    }

    public saveMeme(userId, meme) {
		return this.http.post(`/api/${userId}`, meme);
    }

    public editMeme(userId, memeId, edits) {
		return this.http.put(`/api/${userId}/${memeId}`,
			edits);
    }

    public deleteMeme(userId, memeId) {
		return this.http.delete(`/api/${userId}/${memeId}`);
    }

}
