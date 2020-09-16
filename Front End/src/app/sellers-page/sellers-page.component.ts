import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/_models';
import { Seller } from '@app/_models/seller';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-sellers-page',
  templateUrl: './sellers-page.component.html',
  styleUrls: ['./sellers-page.component.less']
})
export class SellersPageComponent implements OnInit {
  sellersForm: FormGroup;
  user: Seller;
  userId: number = JSON.parse(localStorage.getItem("currentUser")).id;
  errorMessage: String;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
    this.sellersForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+.[0-9]*')]] //Validators will be updated
    });
  }

  getUser(): void {
    this.userService.getUser(this.userId).subscribe({
      next: (user: any) => {
        this.user = user;
        this.displayUser();
      },
      error: err => this.errorMessage = err
    });
  }

  displayUser(): void {
    if (this.sellersForm) {
      this.sellersForm.reset();
    }
    this.sellersForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber
    })
  }

  commitChanges(): void {
    const p: User = { ...this.user, ...this.sellersForm.value };
    this.updateSeller(p);
  }

  updateSeller(user: User) {
    this.userService.updateSeller(user).subscribe({
      next: () => {this.getUser()},
      error: err => this.errorMessage = err
    });
  }

  cancel(): void {
    if (confirm("Are you sure you want to go back and lose any changes"))
      this.getUser()
  }
}
