import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email ,Validators.minLength(6), Validators.maxLength(100)]],
    });
    this.populateArray();
  }

  populateArray(): void {
    this.arrUsers = [];
    this.userService.getAll().subscribe({
      next: users => {
      this.arrUsers = users;
      },error: err => this.errorMessage = err
  });
  }

  submit(): void {
    //logic
  }

  unlock(id: number): void {
    //logic
  }
}
