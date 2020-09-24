import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Seller } from '@app/_models/seller';

@Injectable({ providedIn: 'root' })

export class UserService {
    dataUrl: string = `${environment.apiUrl}/users`;
    id = JSON.parse(localStorage.getItem("currentUser")).id;
    constructor(private httpClient: HttpClient, private router: Router) { }

    createUser(User: User): Observable<User> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<User>(this.dataUrl, User, { headers });
    }

    getUser(id: Number) {
        return this.httpClient.get<Seller>(`${this.dataUrl}/${id}`);
    }

    updateDetails(user: User): Observable<User> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.dataUrl}/details/${user.id}`;
        return this.httpClient.put<User>(url, user, { headers });
    }

    unlock(id: number): Observable<User> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.dataUrl}/unlock/${id}`;
        return this.httpClient.put<User>(url, { headers });
    }

    lock(id: number): Observable<User> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.dataUrl}/lock/${id}`;
        return this.httpClient.put<User>(url, { headers });
    }

    updateSeller(user: User): Observable<User> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.dataUrl}/seller/${user.id}`;
        return this.httpClient.put<User>(url, user, { headers });
    }

    updatePassword(pass: String): Observable<User> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.dataUrl}/password/${this.id}`;
        var pw = { id: this.id, pw: pass };
        return this.httpClient.put<User>(url, pw, { headers });
    }

    getAll(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.dataUrl);
    }
}