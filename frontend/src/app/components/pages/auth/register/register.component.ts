import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emiters } from '../../../../emitters/emitters';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loggedIn: boolean = false;
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
    // check if user is already loggedin
    this.userService.getLoggedInUser().subscribe(() => {
      this.loggedIn = true;
      this.router.navigate(['/dashboard']);
      return;
    });
  }

  onSubmitRegister() {
    this.isLoading = true;
    const username = this.form.getRawValue().username;
    const password = this.form.getRawValue().password;

    if(username === '' || password === '') {
      this.isLoading = false;
      return;
    }

    this.userService.register(username, password)
    .subscribe({
      next: this.successRegister.bind(this),
      error: this.errorRegister.bind(this)
    });
  }

  successRegister(data: any) {
    this.isLoading = false;
    this.router.navigate(['/login'], { queryParams: {
        freshregisteras: this.form.getRawValue().username
      }
    });
  }

  errorRegister(data: {error: {message: string}}) {
    this.isLoading = false;
    this.error = data.error.message;
  }
}
