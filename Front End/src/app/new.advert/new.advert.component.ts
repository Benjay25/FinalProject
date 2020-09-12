import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { Subscription } from 'rxjs';
import { AdvertService } from '@app/_services/advert.service';
import { Advert } from '@app/_models/advert';

@Component({
  selector: 'app-new.advert',
  templateUrl: './new.advert.component.html',
  styleUrls: ['./new.advert.component.less']
})
export class NewAdvertComponent implements OnInit {
  title: string = "Create New Advert";
  newAdForm: FormGroup;
  sub: Subscription;
  advert: Advert;
  newAd: Advert;
  errorMessage: any;
  locations: any;
  provincesArr: String[] = [];
  citiesArr: String[] = [];

  constructor(private fb: FormBuilder, private advertService: AdvertService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void 
  {                                                                                     //All validators to be improved
    this.newAdForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      details: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+.[0-9]*')]] //Pattern isn't perfect but performs some kinda of validation, will improve
    });

    this.locations = this.advertService.getLocation().subscribe(
      value => {
        this.locations = value;
        for (const key in this.locations) {
          this.provincesArr.push(key);
        }
      }
    )

    this.sub = this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        if (id != 0) {
          this.getAdvert(id);
        }
      });
    }

  getAdvert(id: number): void { //retrieve advert
    this.title = '';
    this.advertService.getAdvert(id).subscribe({
        next: (advert: Advert) => this.displayadvert(advert),
        error: err => this.errorMessage = err
      });
  }

  displayadvert(advert:Advert): void { //fills the form with the selected ad's data
    if (this.newAdForm) {
      this.newAdForm.reset();
    }
    this.advert = advert;
    if (this.advert.id != 0) {
      this.title = `Edit Advert: ${this.advert.title}`;
    }
    this.newAdForm.patchValue({
      title: this.advert.title,
      details: this.advert.details,
      price: this.advert.price,
      city: this.advert.city,
      province: this.advert.province
    });
  }

  listAd(): void {
    const p = { ...this.advert, ...this.newAdForm.value };
    if (p.id === 0 || !p.id) {
       this.listNewAd()
    } else {
      this.updateAd(p);
    }
  }

  updateAd(ad: Advert) {
    this.advertService.updateAdvert(ad).subscribe({
              next: () => this.router.navigate(['/userAd']),
              error: err => this.errorMessage = err
            });
  }

  listNewAd():void {
    this.newAd = {
        "userId": JSON.parse(localStorage.getItem("currentUser")).id,
        "title": this.newAdForm.get('title').value.trim(),
        "province": this.newAdForm.get('province').value,
        "city": this.newAdForm.get('city').value,
        "details": this.newAdForm.get('details').value.trim(),
        "price": this.newAdForm.get('price').value,
        "status": "LIVE"
    }
    this.sub = this.advertService.createAdvert(this.newAd).subscribe({ //create new advert using service
      next: () => {
      this.router.navigate(["/userAd"]);
    }
    });
  }

  updateCities(): void {
    this.citiesArr = this.locations[this.newAdForm.get('provvince').value];
    console.log(this.citiesArr);
  }

  back(): void {
    if (confirm("Are you sure you want to go back and lose any changes")) {
        this.router.navigate(["/myAdverts"]);
      }
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }
}
