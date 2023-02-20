import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  isLoading: boolean = false;
  error: string = "";
  successMessage: string = "";

  changePasswordForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
    ) {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmitChangePassword() {
    this.isLoading = true;
    const oldPassword = this.changePasswordForm.getRawValue().oldPassword;
    const newPassword = this.changePasswordForm.getRawValue().newPassword;
    const repeatNewPassword = this.changePasswordForm.getRawValue().repeatNewPassword;

    if(oldPassword === '' || newPassword === '' || repeatNewPassword === '') {
      this.isLoading = false;
      return;
    }

    if(newPassword != repeatNewPassword) {
      this.isLoading = false;
      this.error = "Your passwords don't match"
      return;
    }

    if(oldPassword === newPassword) {
      this.isLoading = false;
      this.error = "Your new password can't be the same as the old"
      return;
    }

    this.userService.changePassword(localStorage.getItem('userid'), oldPassword, newPassword)
    .subscribe({
      next: this.successPwChange.bind(this),
      error: this.errorPwChange.bind(this)
    });
  }

  successPwChange(data: any) {
    this.isLoading = false;
    this.error = "";
    this.successMessage = "Successfully changed password."
    this.clearForm();
  }

  errorPwChange(data: {error: {message: string}}) {
    this.isLoading = false;
    this.error = data.error.message;
  }

  clearForm() {
    this.changePasswordForm.reset()
  }

}
