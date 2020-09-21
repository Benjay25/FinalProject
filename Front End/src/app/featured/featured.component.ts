import { Component, Input, OnInit } from '@angular/core';
import { Advert } from '@app/_models/advert';
import { AdvertService } from '@app/_services/advert.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.less']
})
export class FeaturedComponent implements OnInit {
    @Input() adverts: Advert[];
    errorMessage: string;
    constructor(private advertService: AdvertService) { }

    ngOnInit(): void {
    //   this.advertService.getAdverts().subscribe({
    //     next: advert => {
    //     this.arrAdverts = advert;
    //     },error: err => this.errorMessage = err
    // });
    }

}
