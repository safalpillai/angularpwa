import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IItem {
    name: string;
    description: string;
    url: string;
    html: string;
    markdown: string;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseURL: string = "https://www.techiediaries.com/api/data.json";

    constructor(
        private httpClient: HttpClient,
    ) { }

    fetch(): Observable<IItem[]> {
        return <Observable<IItem[]>>this.httpClient.get(this.baseURL);
    }
}
