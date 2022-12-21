import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiEndpoint = 'http://localhost:3000/api/auth/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(this.apiEndpoint + 'login', {username: username, password: password}, {withCredentials: true});
  }

  register(username: string, password: string) {
    return this.http.post(this.apiEndpoint + 'register', {username: username, password: password}, {withCredentials: true});
  }

  logout() {
    return this.http.post(this.apiEndpoint + 'logout', {}, {withCredentials: true});
  }

  getLoggedInUser() {
    return this.http.get(this.apiEndpoint + 'user', {withCredentials: true});
  }
}
