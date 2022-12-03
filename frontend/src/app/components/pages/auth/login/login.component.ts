import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emiters } from '../../../../emitters/emitters';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: string = '';
  loggedIn: boolean = false;

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

    /*Emiters.authEmitter.subscribe(
      (auth: boolean) => {
        if(auth) {
          this.loggedIn = true;
          this.router.navigate(['/']);
          return;
        }
      }
    );*/
  }

  onSubmitLogin() {
    const username = this.form.getRawValue().username;
    const password = this.form.getRawValue().password;

    if(username === '' || password === '') {
      return;
    }

    this.userService.login(username, password)
    .subscribe({
      next: this.successLogin.bind(this),
      error: this.errorLogin.bind(this)
    });
  }

  successLogin(data: any) {
    this.router.navigate(['/']);
  }

  errorLogin(data: {error: {message: string}}) {
    this.error = data.error.message;
  }
}
