import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { AdvertService } from '@app/_services/advert.service';
import { Advert } from '@app/_models/advert';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];
    arrAdverts: Advert[] = [];
    errorMessage: String;

    constructor(private advertService: AdvertService) { }

    ngOnInit() {
    this.populateArray();
    }

    highToLow(): void {
        //ToBeImplemented
    }

    lowToHigh(): void {
        //ToBeImplemented
    }

    populateArray(): void {
        this.advertService.getAdverts().subscribe({
        next: advert => {
            this.arrAdverts = advert;
        },error: err => this.errorMessage = err
        });
    }
}

    
