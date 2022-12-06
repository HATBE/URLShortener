import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Url } from '../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiEndpoint = 'http://localhost:3000/api/urls/';
  constructor(private http: HttpClient) { }

  get(id: string | null) {
    return this.http.get<{message: string; url: Url}>(this.apiEndpoint + id);
  }

  getMyUrls() {
    return this.http.get<{message: any; urls: Url[] | any}>(this.apiEndpoint + "my", {withCredentials: true});
  }

  add(url: string) {
    return this.http.post<{message: any; url: Url | any}>(this.apiEndpoint, {url: url}, {withCredentials: true});
  }

  delete(shorturl: string) {
    return this.http.delete<{message: any;}>(this.apiEndpoint + shorturl, {withCredentials: true});
  }
}
