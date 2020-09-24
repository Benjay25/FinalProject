import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { Advert } from '@app/_models/advert';
import { environment } from '@environments/environment';
import { Filters } from '@app/_models/filters';

@Injectable ({
    providedIn: 'root'
})

export class AdvertService {
    dataUrl: string = `${environment.apiUrl}/adverts`;
    constructor(private httpClient: HttpClient) {} 

    public getAdverts(): Observable<Advert[]> {
        return this.httpClient.get<Advert[]>(this.dataUrl);
    }
    public getAllAdverts(): Observable<Advert[]> {
      return this.httpClient.get<Advert[]>(`${this.dataUrl}/all`);
    }

    public getFavourites(id: number): Observable<Advert[]> {
      return this.httpClient.get<Advert[]>(`${this.dataUrl}/favourites/${id}`);
    }

    getFilteredAdverts(filters: Filters): Observable<Advert[]> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
      const url = `${this.dataUrl}/filters`;
      console.log(filters);
      return this.httpClient.post<Advert[]>(url , filters, {headers});
    }

    removeHiddenAdvertsFromDisplay(arrAdverts: Advert[]): Advert[] {
        var display: Advert[] = [];
        for (let i = 0; i < arrAdverts.length; i++) {
          const element = arrAdverts[i];
          if (element.status == "LIVE") {
            display.push(element);
          }
        }
        return display;
    }
    
    getLocation(): Observable<any> {
      return this.httpClient.get<any>(`${this.dataUrl}/locations`); 
    } 

    getAdvert(id: number): Observable<Advert> {
        const url = `${this.dataUrl}/${id}`;
            return this.httpClient.get<Advert>(url);
    }

    getCurrentUserAdverts(): Observable<Advert[]> {
      return this.httpClient.get<Advert[]>(`${this.dataUrl}/myadverts/${JSON.parse(localStorage.getItem('currentUser')).id}`);
    }

    updateAdvert(advert: Advert): Observable<Advert> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.dataUrl}/${advert.id}`;
      return this.httpClient.put<Advert>(url, advert, { headers })
    }

    toggleFeatured(id: number): Observable<Advert> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.dataUrl}/togglefeatured/${id}`;
      return this.httpClient.put<Advert>(url, { headers })
    }

    unfavourite(userId: number, advertId: number) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.dataUrl}/unfavourite/${advertId}/${userId}`;
      return this.httpClient.delete<Advert>(url, { headers })
    }
    favourite(userId: number, advertId: number) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.dataUrl}/favourite/${advertId}/${userId}`;
      return this.httpClient.post<Advert>(url, { headers })
    }

    checkfavourite(userId: number, advertId: number): Observable<boolean> {
      return this.httpClient.get<boolean>(`${this.dataUrl}/favourite/${advertId}/${userId}`)
    }

    deleteAdvert(id: number): Observable<number> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.dataUrl}/delete/${id}`;
      return this.httpClient.put<number>(url, { headers })
    }

    createAdvert(advert: Advert): Observable<Advert> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.post<Advert>(this.dataUrl, advert, { headers })
    }

    deleteProduct(id: number): Observable<{}> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.dataUrl}/${id}`;
      return this.httpClient.delete<Advert>(url, { headers })
    }
}