import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { AdvertService } from '@app/_services/advert.service';
import { Advert } from '@app/_models/advert';
import { Filters } from '@app/_models/filters';

@Component({ templateUrl: 'home.component.html', styleUrls: ['./home.component.less'] })
export class HomeComponent {
    loading = false;
    users: User[];
    arrAdverts: Advert[] = [];
    errorMessage: String;
    filters: Filters;
    filtersEmpty: boolean = true;

    constructor(private advertService: AdvertService) {}

    emptyFilters(): void {
        this.filters = {
            "province": "",
            "city"    : "",
            "maxPrice": 0,
            "minPrice": 0,
            "keywords": "",
            "order"   : ""
        };
        this.filtersEmpty = true;
    }

    ngOnInit() {
        this.emptyFilters();
        this.populateArray();
    }

    receiveFilters($event) {
        this.filters = $event;
        this.filtersEmpty = false;
        this.populateArray()
    }

    populateArray(): void {
        if (this.filtersEmpty) { //if there are no filters applied
            this.advertService.getAdverts().subscribe({
                next: advert => {
                this.arrAdverts = advert;
                },error: err => this.errorMessage = err
            });
        }
        else {
            this.advertService.getFilteredAdverts(this.filters).subscribe({
                next: advert => {
                this.arrAdverts = advert;
                },error: err => this.errorMessage = err
            });
        }
    }
}

    
