import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiEndpoint = `${environment.apiEndpoint}/users/`;
  private authHeader = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('authtoken')}`});

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  delete(id: string) {
    return this.http.delete(this.apiEndpoint + '/' + id, {headers: this.authHeader});
  }

  getUsers() {
    return this.http.get<{message: string, data: {users: [User]}}>(this.apiEndpoint, {headers: this.authHeader});
  }

  isAdmin(): boolean {
    if(!this.authService.isLoggedIn()) {
      return false;
    }
    if(localStorage.getItem('isAdmin') !== null) {
      return localStorage.getItem('isAdmin') === 'true' ? true : false;
    }
    return false;
  }

  getUser(id: string | null) {
    return this.http.get<{message: string, data: {user: User}}>(this.apiEndpoint + id, {headers: this.authHeader});
  }

  getUsername(): string {
    if(!this.authService.isLoggedIn()) {
      return "null";
    }
    if(localStorage.getItem('username') !== null) {
      return `${localStorage.getItem('username')}`;
    }
    return "null";
  }

  deleteUrls() {
    return this.http.delete(this.apiEndpoint + 'urls', {headers: this.authHeader});
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.patch(this.apiEndpoint + "password", {oldpassword: oldPassword, newpassword: newPassword}, {headers: this.authHeader});
  }
}
