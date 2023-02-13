import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiEndpoint = `${environment.apiEndpoint}/auth/`;
  private authHeader = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('authtoken')}`});

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string) {
    return this.http.post(this.apiEndpoint + 'login', {username: username, password: password}, {});
  }

  register(username: string, password: string) {
    return this.http.post(this.apiEndpoint + 'register', {username: username, password: password}, {});
  }

  logout() {
    // if user is logged in: logout, else, do nothing
    if(this.isLoggedIn()) {
      localStorage.removeItem('authtoken');
    }
  }

  isLoggedIn() {
    // if authtoken isset in localstorage, login == true
    // every x minutes its checked if this token exists / if this token is valid, if not, remove from localstorage...
    if(localStorage.getItem('authtoken')) {
      return true;
    }
    return false;
  }

  getLoggedInUser() {
    return this.http.get<{status: boolean, data: String}>(this.apiEndpoint + 'user', {headers: this.authHeader});
  }

  checkLogin() {
    // if user is logged in, check if login is still valid, if not, logout user
    if(this.isLoggedIn()) {
      this.getLoggedInUser().subscribe({
        next: this.loggedIn.bind(this),
        error: this.notLoggedIn.bind(this)
      });
    }
  }

  private loggedIn() {
    console.log('loggedin');
  }

  private notLoggedIn() {
    // if saved token is invalid or some other error occurred, logout (delete auth token)
    this.logout();
    alert('you have been logged out now');
    this.router.navigate(['/']);
  }
}
