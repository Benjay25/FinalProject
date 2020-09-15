import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { Seller } from '@app/_models/seller';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.less']
})
export class AccountsPageComponent implements OnInit {
  editState: string = "";
  pwCorrect: boolean = false;
  accountForm: FormGroup;
  pwForm: FormBuilder;
  error: string = "Please enter current password if you wish to change it to a new one";
  user: Seller;
  userId: number = JSON.parse(localStorage.getItem("currentUser")).id;
  errorMessage: string;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.toggleState();
    this.accountForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.email]]
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

  commitChanges(): void {
    const p: User = { ...this.user, ...this.accountForm.value };
    console.log(p);
    this.updateDetails(p);
  }

  updateDetails(user: User) {
    this.userService.updateDetails(user).subscribe({
              next: () => this.toggleState(),
              error: err => this.errorMessage = err
            });
  }

  displayUser(): void {
    if (this.accountForm) {
      this.accountForm.reset();
    }
    this.accountForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,

    })
  }
  // displayadvert(advert:Advert): void { //fills the form with the selected ad's data
  //   if (this.newAdForm) {
  //     this.newAdForm.reset();
  //   }
  //   this.advert = advert;
  //   if (this.advert.id != 0) {
  //     this.title = `Edit Advert: ${this.advert.title}`;
  //   }
  //   this.newAdForm.patchValue({
  //     title: this.advert.title,
  //     details: this.advert.details,
  //     price: this.advert.price,
  //     city: this.advert.city,
  //     province: this.advert.province
  //   });
  // }


  toggleState(): void {
    if (this.editState == "display") {
      this.editState = "edit"
    }
    else {
      this.getUser();
      this.editState = "display";
    }
  }

}
