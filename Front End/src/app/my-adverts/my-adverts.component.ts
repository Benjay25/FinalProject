import { Component, OnInit } from '@angular/core';
import { Advert } from '@app/_models/advert';
import { AdvertService } from '@app/_services/advert.service';

@Component({
  selector: 'app-my-adverts',
  templateUrl: './my-adverts.component.html',
  styleUrls: ['./my-adverts.component.less']
})
export class MyAdvertsComponent implements OnInit {
  arrAdverts: Advert[] = [];
  errorMessage: any;

  constructor(private advertService: AdvertService) { }

  ngOnInit(): void {
    this.temp_populateArray();
  }
  temp_populateArray(): void {
    var ad: Advert = {
      email: "ben@ben",
      title: "2 Bedroom 1 Gaming Room",
      province: "Wisconsin",
      city: "Kenosha",
      details: "I mean......it's a property.....what more do you wanna know?",
      price: 25000
    };
    this.arrAdverts[0] = ad;
    for (let i = 0; i < 10; i++) {
      this.arrAdverts[i] = ad;
    }
  }
  
  populateArray(): void {
    this.advertService.getAdverts().subscribe({
      next: advert => {
        this.arrAdverts = advert;
      },error: err => this.errorMessage = err
    });
  }
}
