import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { User } from './user';
import { Router } from '@angular/router';


@Injectable ({
    providedIn: 'root'
})

export class UserService {
    dataUrl: string = "api/usersArr"
    constructor(private httpClient: HttpClient, private router: Router) {} 

    public getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.dataUrl);
    }

    isLoggedIn(): boolean {
        if (localStorage.getItem("email")) {
            return true;
        } else {
            return false;
        }
    }

    logout() {
        localStorage.setItem("email","");
        localStorage.setItem("username","");
        this.router.navigate(['/welcome']);
    }
    
    createUser(User: User): Observable<User> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        User.id = null;
        return this.httpClient.post<User>(this.dataUrl, User, { headers });
      }
}