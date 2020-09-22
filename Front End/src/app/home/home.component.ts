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
    featuredAdverts: Advert[];
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

    sortFeaturedFirst(arr: Advert[]): Advert[] {
        var arrFeatured: Advert[] = [];
        var arrOther: Advert[] = [];
        arr.forEach(element => {
            if (element.featured == true) 
                arrFeatured.push(element);
            else
                arrOther.push(element);
        });
        var tempArray: Advert[] = arrFeatured.concat(arrOther);
        return tempArray;
    }

    populateFeatured(): void {
        var tempArray: Advert[] = [];
        this.arrAdverts.forEach(element => {
            if (element.featured == true)  tempArray.push(element);
        });
        this.featuredAdverts = tempArray;
    }

    populateArray(): void {
        if (this.filtersEmpty) { //if there are no filters applied
            this.advertService.getAdverts().subscribe({
                next: advert => {
                this.arrAdverts = this.sortFeaturedFirst(advert);
                if (!this.featuredAdverts) this.populateFeatured();
                },error: err => this.errorMessage = err
            });
        }
        else {
            this.advertService.getFilteredAdverts(this.filters).subscribe({
                next: advert => {
                    this.arrAdverts = this.sortFeaturedFirst(advert);
                },error: err => this.errorMessage = err
            });
        }
    }
}

    
