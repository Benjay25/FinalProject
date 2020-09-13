import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private advertService: AdvertService, private router: Router) { }

  ngOnInit(): void {
    this.populateArray();
  }

  deleteAdvert(id: number): void {
    //to be implemented
  }
  
  hideAdvert(ad: Advert): void {
    if (ad.status == "LIVE") {
      ad.status = "HIDDEN";
      this.advertService.updateAdvert(ad).subscribe({
        next: () => this.router.navigate(['/userAd']),
        error: err => this.errorMessage = err
      });
    }
    else if (ad.status == "HIDDEN") {
      ad.status = "LIVE";
      this.advertService.updateAdvert(ad).subscribe({
        next: () => this.router.navigate(['/userAd']),
        error: err => this.errorMessage = err
      });
    }
  }

  populateArray(): void {
    this.advertService.getCurrentUserAdverts().subscribe({
      next: advert => {
        this.arrAdverts = advert;
      },error: err => this.errorMessage = err
    });
  }
}
