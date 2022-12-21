import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiEndpoint = 'http://localhost:3000/api/stats/';
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(this.apiEndpoint);
  }
}
