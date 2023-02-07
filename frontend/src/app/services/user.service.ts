import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiEndpoint = `${environment.apiEndpoint}/auth/`;

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
