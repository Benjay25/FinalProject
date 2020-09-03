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

  constructor(private fb: FormBuilder, private advertService: AdvertService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.newAdForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      details: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
      province: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+.[0-9]*')]]

    });

    this.sub = this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        if (id != 0) {
          this.getAdvert(id);
        }
      });
      console.log(this.advert);
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
    if (this.advert.id !== 0) {
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

  updateAd(p) {
    this.advertService.updateAdvert(p).subscribe({
              next: () => this.router.navigate(['/userAd']),
              error: err => this.errorMessage = err
            });
  }

  listNewAd():void {
    this.newAd = {
        "title": this.newAdForm.get('title').value.trim(),
        "details": this.newAdForm.get('description').value.trim(),
        "price": this.newAdForm.get('price').value.trim(),
        "city": this.newAdForm.get('city').value.trim(),
        "province": this.newAdForm.get('province').value.trim(),
        "date": new Date().toDateString(),
        "email": localStorage.getItem("username"),
        "hidden": false
    }
    this.sub = this.advertService.createAdvert(this.newAd).subscribe({ //create new advert using service
      next: () => {
      this.router.navigate(["/userAd"]);
    }
  });
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
