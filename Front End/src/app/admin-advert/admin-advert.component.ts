import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/_models';
import { Advert } from '@app/_models/advert';
import { AdvertService } from '@app/_services/advert.service';

@Component({
  selector: 'app-admin-advert',
  templateUrl: './admin-advert.component.html',
  styleUrls: ['./admin-advert.component.less']
})
export class AdminAdvertComponent implements OnInit {
  errorMessage: string;
  arrAdverts: Advert[];
  statusForm: FormGroup;
  c: number = 0;
  constructor(private fb: FormBuilder, private advertService: AdvertService, private router: Router) { }

  get adstatus(): FormArray{
    return <FormArray>this.statusForm.get('adstatus');
  }

  ngOnInit(): void {
    this.statusForm = this.fb.group({
      adstatus: this.fb.array([])
    });
    this.init();
  }

  statInit(): void {
    this.countAds();
    for (var i=0; i<this.c; i++) {
      this.adstatus.push(this.fb.group({
        selector: ''
      }))
    }
  }

  countAds(): void {
    this.c = 0;
    this.arrAdverts.forEach(()=> {
      this.c++;
    })
  }

  submit(advert: Advert, i: number): void {
    var arrStatus = this.statusForm.get('adstatus') as FormArray;
    var status = arrStatus.at(i).get("selector").value;
    if (status != '') {
      if (status == "LIVE" || status == "HIDDEN") {
        this.hideAdvert(advert, status)
      } else if (status == "DELETED") {
          this.deleteAdvert(advert.id);
        }
    }
  }

  deleteAdvert(id: number): void {
    if (confirm("Are you sure you want to delete this advert?")) {
      this.advertService.deleteAdvert(id).subscribe({
        next: () => this.init(),
        error: err => this.errorMessage = err
      });
    }
  }
  
  hideAdvert(ad: Advert, status: string): void {
    ad.status = status;
    this.advertService.updateAdvert(ad).subscribe({
      next: () => this.init(),
      error: err => this.errorMessage = err
    });
  }

  init(): void {
    this.advertService.getAllAdverts().subscribe({
      next: advert => {
        this.arrAdverts = advert;
        this.statInit();
        console.log(this.statusForm)
      },error: err => this.errorMessage = err
    });
  }
}
