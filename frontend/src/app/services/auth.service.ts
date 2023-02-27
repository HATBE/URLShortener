import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiEndpoint = `${environment.apiEndpoint}/auth/`;

  private authHeader = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('authtoken')}`});

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  isLoggedIn() {
    // if authtoken isset in localstorage, login == true
    // every x minutes its checked if this token exists / if this token is valid, if not, remove from localstorage...
    if(localStorage.getItem('authtoken') !== null) {
      return true;
    }
    return false;
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

  getLoggedInUser() {
    return this.http.get<{status: boolean, data: String}>(this.apiEndpoint + "loggedin", {headers: this.authHeader});
  }

  login(username: string, password: string) {
    return this.http.post(this.apiEndpoint + 'login', {username: username, password: password}, {});
  }

  register(username: string, password: string) {
    return this.http.post<{data: {message: any, data: {user: User}} | any}>(this.apiEndpoint + 'register', {username: username, password: password}, {});
  }

  logout(navigate: boolean = true) {
    // if user is logged in: logout, else, do nothing
    if(this.isLoggedIn()) {
      Emitters.authEmitter.emit(false);
      localStorage.removeItem('authtoken');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('username');
      localStorage.removeItem('userid');

      if(navigate) {
        this.router.navigate(['/login']);
      }
    }
  }

  private loggedIn() {
    console.log('loggedin');
  }

  private notLoggedIn() {
    // if saved token is invalid or some other error occurred, logout (delete auth token)
    this.logout();
    alert('you have been logged out now');
  }
}
