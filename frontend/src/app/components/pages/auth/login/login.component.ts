import { Component, OnInit, Renderer2 } from '@angular/core';
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
  isLoading: boolean = false;
  freshLoggedInName: string | null = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private renderer: Renderer2
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

  if(window.location.search) {
    const param = new URLSearchParams(window.location.search);

    if(param.has('freshregisteras')) {
      this.form.patchValue({username: param.get("freshregisteras")});
      this.freshLoggedInName = param.get("freshregisteras");

      this.renderer.selectRootElement('#passwordInput').focus(); // select password field if user freshly registred
    }
  }
}

  onSubmitLogin() {
    this.isLoading = true;
    const username = this.form.getRawValue().username;
    const password = this.form.getRawValue().password;

    if(username === '' || password === '') {
      this.isLoading = false;
      return;
    }

    this.userService.login(username, password)
    .subscribe({
      next: this.successLogin.bind(this),
      error: this.errorLogin.bind(this)
    });
  }

  successLogin(data: any) {
    localStorage.setItem('authtoken', data.data.token); // save token in localstorage
    Emiters.authEmitter.emit(true);
    this.isLoading = false;
    this.router.navigate(['/dashboard']);
  }

  errorLogin(data: {error: {message: string}}) {
    this.isLoading = false;
    this.error = data.error.message;
  }
}
