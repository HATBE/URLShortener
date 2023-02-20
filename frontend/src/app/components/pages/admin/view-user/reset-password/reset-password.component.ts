import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @Input() id: any = null

  isLoading: boolean = false;
  error: string = "";
  successMessage: string = "";

  resetPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      password: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmitResetPassword() {
    this.isLoading = true;
    const password = this.resetPasswordForm.getRawValue().password;

    if(password.length <= 0) {
      this.isLoading = false;
      return;
    }

    this.userService.changePassword(this.id, null, password)
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
    this.resetPasswordForm.reset()
  }

}
