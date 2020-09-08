import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService {
    constructor(private httpClient: HttpClient, private router: Router) { }
    dataUrl: string = `${environment.apiUrl}/users`;

    createUser(User: User): Observable<User> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<User>(this.dataUrl, User, { headers });
      }

    getAll() {
        return this.httpClient.get<User[]>(this.dataUrl);
    }
}