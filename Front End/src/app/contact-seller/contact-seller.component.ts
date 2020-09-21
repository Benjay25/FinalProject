import { Component, Input, OnInit } from '@angular/core';
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
  hide: boolean = true;
  contactForm: FormGroup;
  message: string;
  constructor(private fb: FormBuilder, private advertService: AdvertService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email ,Validators.minLength(6), Validators.maxLength(100)]],
      number: ['', [Validators.minLength(0), Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]]
    });
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
}
