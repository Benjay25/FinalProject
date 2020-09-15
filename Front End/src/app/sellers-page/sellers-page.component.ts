import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertService } from '@app/_services/advert.service';

@Component({
  selector: 'app-sellers-page',
  templateUrl: './sellers-page.component.html',
  styleUrls: ['./sellers-page.component.less']
})
export class SellersPageComponent implements OnInit {
  sellersForm: FormGroup;
  constructor(private fb: FormBuilder, private advertService: AdvertService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sellersForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.email]],
      cell: ['', [Validators.required, Validators.pattern('^[0-9]+.[0-9]*')]] //Validators will be updated
    });
  }

  commitChanges(): void {
    //logic
  }
}
