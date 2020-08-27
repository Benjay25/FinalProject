import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './_models/user';
import { Injectable } from '@angular/core';

@Injectable ({
    providedIn: 'root'
})

export class Data implements InMemoryDbService {
    constructor() {}
    newdate:Date = new Date();
    date: string = this.newdate.toDateString();
    createDb() {
        let usersArr: User[] = [
            {
                "id": 1,
                "firstnames": "Gunther",
                "surname": "Kjelberg",
                "username": "GuntiePie",
                "email": "guntherpie@gmail.com",
                "password": "10YearOldArmy"
            },
            {
                "id": 2,
                "firstnames": "Jake",
                "surname": "Johnson",
                "username": "pepperwood420",
                "email": "nick.miller@gmail.com",
                "password": "username"
            },
            {
                "id": 3,
                "firstnames": "Winston",
                "surname": "Bishop",
                "username": "theBish",
                "email": "winniebball@latvia.com",
                "password": "courtRoomBrown"
            },
            {
                "id": 4,
                "firstnames": "Captain Jack",
                "surname": "Sparrow",
                "username": "PearlsCaptain",
                "email": "sparrow@sevenseas.com",
                "password": "RumsAlwaysGone"
            },
            {
                "id": 5,
                "firstnames": "Susan",
                "surname": "Jennings",
                "username": "cakeLover25",
                "email": "jennings.susie@gmail.com",
                "password": "flowerPower99"
            }
        ];
        return {usersArr};
    }
}
