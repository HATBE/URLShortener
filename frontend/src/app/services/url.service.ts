import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

import { Url } from '../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiEndpoint = `${environment.apiEndpoint}/urls/`;
  constructor(private http: HttpClient) { }

  get(id: string | null) {
    return this.http.get<{message: string; url: Url}>(this.apiEndpoint + id);
  }

  getMyUrls() {
    return this.http.get<{message: any; urls: Url[] | any}>(this.apiEndpoint + "my", {headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('authtoken')}`})});
  }

  add(url: string) {
    return this.http.post<{message: any; url: Url | any}>(this.apiEndpoint, {url: url}, {headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('authtoken')}`})});
  }

  delete(shorturl: string) {
    return this.http.delete<{message: any;}>(this.apiEndpoint + shorturl, {headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('authtoken') || null}`})});
  }
}
