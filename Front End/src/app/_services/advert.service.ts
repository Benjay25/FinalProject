import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { Advert } from '@app/_models/advert';

@Injectable ({
    providedIn: 'root'
})

export class AdvertService {
    dataUrl: string = ""
    constructor(private httpClient: HttpClient) {} 

    public getAdverts(): Observable<Advert[]> {
        return this.httpClient.get<Advert[]>(this.dataUrl)
    }
}