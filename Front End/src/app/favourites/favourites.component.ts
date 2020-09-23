import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { Advert } from '@app/_models/advert';
import { Filters } from '@app/_models/filters';
import { AdvertService } from '@app/_services/advert.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.less']
})
export class FavouritesComponent implements OnInit {
  loading = false;
  userId = JSON.parse(localStorage.getItem('currentUser')).id
  users: User[];
  arrAdverts: Advert[] = [];
  featuredAdverts: Advert[];
  errorMessage: String;
  filters: Filters;
  filtersEmpty: boolean = true;

  constructor(private advertService: AdvertService) {}

  ngOnInit() {
      this.populateArray();
  }

  populateArray(): void { 
    this.arrAdverts = [];
    this.advertService.getFavourites(this.userId).subscribe({
        next: advert => {
        this.arrAdverts = advert;
        },error: err => this.errorMessage = "You have no favourited adverts"
    });
  }

  unfavourite(id: number,): void {
      this.advertService.unfavourite(this.userId, id).subscribe({
        next: () => {
          this.populateArray();
        },
        error: err => this.errorMessage = err
      });
  }
}