import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from '../../../../emitters/emitters';

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
    private authService: AuthService,
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
    if(this.authService.isLoggedIn()) {
      this.loggedIn = true;
      this.router.navigate(['/dashboard']);
      return;
    };

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

    this.authService.login(username, password)
    .subscribe({
      next: this.successLogin.bind(this),
      error: this.errorLogin.bind(this)
    });
  }

  successLogin(data: any) {
    localStorage.setItem('authtoken', data.data.token); // save token in localstorage
    localStorage.setItem('isAdmin', data.data.user.isAdmin); // save if user is admin (no worries, this will not affect security (will not be sent to server for authorization, just for frontend))
    localStorage.setItem('username', data.data.user.username);
    localStorage.setItem('userid', data.data.user.id);

    setTimeout(() => {
      Emitters.authEmitter.emit(true);
      this.isLoading = false;
      if(data.data.isAdmin) {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    }, 500); // 0.5 sec timeout (until browser saved token)
  }

  errorLogin(data: {error: {message: string}}) {
    this.isLoading = false;
    this.error = data.error.message;
  }
}
