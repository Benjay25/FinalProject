import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { User } from '../shared/user';
import { UserService } from '../shared/user.service';
import { ValidationMessages } from '../shared/validation.messages';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})

export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  regUser: User;
  userList: User[] = [];
  subs: Subscription[] = [];
  errorMessage: string = '';
  validationMessages: ValidationMessages = new ValidationMessages;
  message: { [key: string]: string} = {};

  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) { }

  register(): void { //registers the user, validates info and then saves user if valid
    this.regUser = {
      "firstnames": this.regForm.get('firstnames').value.trim(),
      "surname": this.regForm.get('surname').value.trim(),
      "email": this.regForm.get('email').value.trim(),
      "password": this.regForm.get('password').value.trim()
    }
    if (!this.emailUnique()) {
      this.errorMessage = "This email is already in use";
      return;
    }
    if (!this.passwordConfirmed()) {
      this.userService.createUser(this.regUser).subscribe({ //create new user using service
        next: () => {
        console.log("account created successfully.");
        console.log(this.regUser);
        this.router.navigate(["/login"]);
        }
      });
    } else {
    this.errorMessage = "Passwords do not match";
  }      
}

  ngOnInit(): void {
    let controls: string[] = ["firstnames", "surname", "email","password", "cpassword"];
    this.subs = [];
    this.userService.getUsers().subscribe({
      next: users => {
        this.userList = users;
      },error: err => console.log(err)
    });
    this.regForm = this.fb.group({
      firstnames: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      cpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]]
    });

    for (let i = 0; i < controls.length; i++) {
      const element = controls[i];
      const control = this.regForm.get(element);
      this.subs[i] = control.valueChanges.subscribe(
        value => this.setMessage(control, element)
      )
    }
  }

  setMessage(c: AbstractControl, controlName: string): void {
    this.message[controlName] = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.message[controlName] = Object.keys(c.errors).map(
        key => this.validationMessages[controlName][key]).join(' ');
    }
  }

  //functions for validating information
  passwordConfirmed(): boolean {
    if (this.regUser.password !== this.regForm.get('cpassword').value) {
      return true;
    } else 
    return false;
  }

  emailUnique(): boolean {
    for (let i = 0; i < this.userList.length; i++) {
      const user = this.userList[i];
      if (user.email === this.regUser.email) {
        return false;
      } 
    }
    return true; 
  }


  ngOnDestroy() {
    for (let i = 0; i < this.subs.length; i++) {
      this.subs[i].unsubscribe();
    }
  }
}
