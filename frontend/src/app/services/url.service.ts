import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

import { Url } from '../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiEndpoint = `${environment.apiEndpoint}/urls/`;
  private authHeader = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('authtoken')}`});

  constructor(
    private http: HttpClient
  ) { }

  get(id: string | null) {
    return this.http.get<{message: string, data: {url: Url}}>(this.apiEndpoint + id);
  }

  add(url: string) {
    return this.http.post<{message: any; data: { url: Url} | any}>(this.apiEndpoint, {url: url}, {headers: this.authHeader});
  }

  getStats(shorturl: string | null) {
    return this.http.get<{message: any; data: {stats: any} | any}>(this.apiEndpoint + shorturl + "/stats", {headers: this.authHeader});
  }

  delete(shorturl: string) {
    return this.http.delete<{message: any;}>(this.apiEndpoint + shorturl, {headers: this.authHeader});
  }

  getAccessList(shorturl: string, page: number = 1) {
    return this.http.get<{message: any; data: {acessList: any, pagination: {maxPages: number}}} | any>(this.apiEndpoint + shorturl + "/accesslist?page=" + page, {headers: this.authHeader});
  }
}
