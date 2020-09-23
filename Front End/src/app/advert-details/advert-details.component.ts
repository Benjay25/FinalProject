import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/_models';
import { Advert } from '@app/_models/advert';
import { Seller } from '@app/_models/seller';
import { UserService } from '@app/_services';
import { AdvertService } from '@app/_services/advert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advert-details',
  templateUrl: './advert-details.component.html',
  styleUrls: ['./advert-details.component.less']
})
export class AdvertDetailsComponent implements OnInit {
  advert: Advert;
  seller: Seller;
  adId: number;
  errorMessage: String;
  sub: Subscription;
  
  constructor(private advertService: AdvertService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.sub = this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        if (id != 0) {
          this.getAdvert(id);
        }
      });
  }

  getAdvert(id: number): void { //retrieve advert
    this.advertService.getAdvert(id).subscribe({
        next: (advert: Advert) => {
          this.advert = advert;
          this.adId = advert.id;
          this.getContactInfo();
        },
        error: err => this.errorMessage = err
      });
  }

  getContactInfo(): void {
    this.userService.getUser(this.advert.userId).subscribe({
      next: (seller: Seller) => {
        this.seller = seller;
      },
      error: err => this.errorMessage = err
    });
  } 

  ngOnDestroy() {
    this.sub.unsubscribe;
  }
}
