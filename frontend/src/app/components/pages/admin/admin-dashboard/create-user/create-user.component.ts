import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @Output() addedNewUser = new EventEmitter<User>();

  error: string = "";
  successMessage: string = "";
  isLoading: boolean = false;

  createUserForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.createUserForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmitCreateUser() {
    this.isLoading = true;

    const username = this.createUserForm.getRawValue().username;
    const password = this.createUserForm.getRawValue().password;

    if(username == '' || password === '') {
      this.isLoading = false;
      return;
    }

    this.authService.register(username, password)
    .subscribe({
      next: this.successCreateUser.bind(this),
      error: this.errorCreateUser.bind(this)
    });
  }

  successCreateUser(data: any) {
    this.isLoading = false;
    this.error = "";
    this.successMessage = "Successfully created user";
    this.clearForm();
    this.addedNewUser.emit(data.data.user);
  }

  errorCreateUser(data: {error: {message: string}}) {
    this.isLoading = false;
    this.error = data.error.message;
  }

  clearForm() {
    this.createUserForm.reset();
  }

}
