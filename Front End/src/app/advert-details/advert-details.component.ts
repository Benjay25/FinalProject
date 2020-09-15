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
  test: String = "nananannannana";
  errorMessage: String;
  sub: Subscription;
  loremIpsum: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod elementum nisi quis. Purus sit amet volutpat consequat mauris nunc congue. Nisl nunc mi ipsum faucibus. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc. Velit aliquet sagittis id consectetur. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Quis risus sed vulputate odio ut enim blandit.";
  
  constructor(private advertService: AdvertService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.sub = this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        if (id != 0) {
          this.getAdvert(id);
          if (!this.advert) {
            this.fakeAd(); //Temp data while calls are blocked
          }
        }
      });
  }

  fakeAd(): void {
    this.advert = {   
      title: "2 Bedroom Apartment",
      province: "Free State",
      city: "Bloemfontein",
      details: this.loremIpsum,
      price: 69,
      status: "string",
      userId: 12
    }
    this.getContactInfo();
  }

  getAdvert(id: number): void { //retrieve advert
    this.advertService.getAdvert(id).subscribe({
        next: (advert: Advert) => {
          this.advert = advert;
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
