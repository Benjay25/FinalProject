import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Seller } from '@app/_models/seller';
import { AdvertService } from '@app/_services/advert.service';

@Component({
  selector: 'app-contact-seller',
  templateUrl: './contact-seller.component.html',
  styleUrls: ['./contact-seller.component.less']
})
export class ContactSellerComponent implements OnInit {
  @Input() sellerInfo: Seller;
  @Input() advertId: number;
  hide: boolean = true;
  favCheck: boolean;
  contactForm: FormGroup;
  message: string;
  errorMessage: any;
  constructor(private fb: FormBuilder, private advertService: AdvertService) {
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email ,Validators.minLength(6), Validators.maxLength(100)]],
      number: ['', [Validators.minLength(0), Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]]
    });
    if (this.sellerInfo.id && this.advertId) {
      this.checkFavourite();
    }
  }

  clear(): void {
    this.contactForm.patchValue({
      name: "",
      email: "",
      number: "",
      message: ""
    });
  }

  submit(): void {
    this.hide = true;
    this.clear();
    this.message = "Message sent!" 
  }

  checkFavourite(): void {
    this.advertService.checkfavourite(this.sellerInfo.id, this.advertId).subscribe({
      next: (check) => {
        this.favCheck = check;
      },
      error: err => this.errorMessage = err
    });
  }

  unfavourite(id: number): void {
    this.advertService.unfavourite(id, this.advertId).subscribe({
      next: () => {
        this.checkFavourite();
      },
      error: err => this.errorMessage = err
    });
  }

  favourite(id: number): void {
    this.advertService.favourite(id, this.advertId).subscribe({
      next: () => {    
        this.checkFavourite();
      },
      error: err => this.errorMessage = err
    });
  }
}
