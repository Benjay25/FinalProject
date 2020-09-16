import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { Seller } from '@app/_models/seller';
import { AuthenticationService, UserService } from '@app/_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.less']
})
export class AccountsPageComponent implements OnInit {
  editState: string = "";
  pwCorrect: boolean = false;
  accountForm: FormGroup;
  pwForm: FormGroup;
  error: string = "Please enter current password if you wish to change it to a new one";
  user: Seller;
  userId: number = JSON.parse(localStorage.getItem("currentUser")).id;
  errorMessage: string;
  sub: Subscription;

  constructor(private userService: UserService, private fb: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.toggleState();
    this.accountForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.email]]
    });
    
    this.pwForm = this.fb.group({
      currPw: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      newPw: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      confirmPw: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]]
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
    this.updateDetails(p);
  }

  updateDetails(user: User) {
    this.userService.updateDetails(user).subscribe({
      next: () => {this.toggleState(); JSON.stringify(localStorage.setItem("email", this.user.email))},
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

  checkPassword(): void {
    //this.pwCorrect = true
    this.authenticationService.authenticatePassword(this.pwForm.get("currPw").value, this.userId).subscribe({
      next: () => {this.pwCorrect = true; this.error = ""},
      error: err => this.error = err
    });
  }
  
  updatePassword(): void {
    console.log("trigger");
    if (this.passwordsMatch()) {
      const pass: String = this.pwForm.get("newPw").value;      
      this.userService.updatePassword(pass).subscribe({
        next: () => this.pwCorrect = false ,
        error: err => this.errorMessage = err
      });
    } else {
      this.error = "Passwords do not match."
    }
  }

  passwordsMatch(): boolean {
    const pw1: String = this.pwForm.get("newPw").value;
    const pw2: String = this.pwForm.get("confirmPw").value;
    
    if (pw1 == pw2)
      return true;
    else
      return false;
  }

  toggleState(): void {
    if (this.editState == "display") {
      this.editState = "edit"
    }
    else {
      this.getUser();
      this.pwCorrect = false;
      this.editState = "display";
    }
  }

  cancel(): void {
    if (confirm("Are you sure you want to go back and lose any changes"))
      this.toggleState()
  }
}