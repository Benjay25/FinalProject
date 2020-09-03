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

    removeHiddenAdvertsFromDisplay(arrAdverts: Advert[]): Advert[] {
        var display: Advert[] = [];
        for (let i = 0; i < arrAdverts.length; i++) {
          const element = arrAdverts[i];
          if (element.hidden == false) {
            display.push(element);
          }
        }
        return display;
    }
    
    getAdvert(id: number): Observable<Advert> {
        const url = `${this.dataUrl}/${id}`;
            return this.httpClient.get<Advert>(url);
    }

    updateAdvert(advert: Advert): Observable<Advert> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.dataUrl}/${advert.id}`;
        return this.httpClient.put<Advert>(url, advert, { headers })
          .pipe(
            // Return the product on an update
            map(() => advert)
          );
      }

      createAdvert(advert: Advert): Observable<Advert> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        advert.id = null;
        return this.httpClient.post<Advert>(this.dataUrl, advert, { headers })
    }

      deleteProduct(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.dataUrl}/${id}`;
        return this.httpClient.delete<Advert>(url, { headers })
      }
}