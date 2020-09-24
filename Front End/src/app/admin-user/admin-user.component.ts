import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.less']
})
export class AdminUserComponent implements OnInit {
  arrUsers: User[] = [];
  errorMessage: string;
  emailForm: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder) { }
  c: number = 0;

  get emails(): FormArray{
    return <FormArray>this.emailForm.get('emails');
  }
  
  ngOnInit(): void {
    this.emailForm = this.fb.group({
      emails: this.fb.array([])
    });
    this.populateArray();
  }

  countAds(): void {
    this.c = 0;
    this.arrUsers.forEach(()=> {
      this.c++;
    })
  }

  emailsInit(): void {
    this.countAds();
    for (var i=0; i<this.c; i++) {
      this.emails.push(this.fb.group({
        email: ['', [ Validators.email]]
      }))
    }
  }

  populateArray(): void {
    this.arrUsers = [];
    this.userService.getAll().subscribe({
      next: users => {
      this.arrUsers = users;
      this.emailsInit();
      },error: err => this.errorMessage = err
  });
  }

  submit(user: User, i: number): void {
    var arrEmails = this.emailForm.get('emails') as FormArray;
    var email = arrEmails.at(i).get("email").value;
    if (email != "") {
      if (user.email = JSON.parse(localStorage.getItem("currentUser")).email) {
        JSON.stringify(localStorage.setItem("email", email))
      }
      user.email = email;
      this.userService.updateDetails(user).subscribe({
        next: () => {
          this.populateArray();
        },
        error: err => this.errorMessage = err
      });
    }
  }

  unlock(id: number): void {
    this.userService.unlock(id).subscribe({
      next: () => {
        this.populateArray();
      },
      error: err => this.errorMessage = err
    });
  }

  lock(id: number): void {
    this.userService.lock(id).subscribe({
      next: () => {
        this.populateArray();
      },
      error: err => this.errorMessage = err
    });
  }
}
