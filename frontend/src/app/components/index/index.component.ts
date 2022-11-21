import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../models/url.model'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  error: string = "";
  url: string = ""
  shorturl: string = "";

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  onClick() {
    if(!/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.url)) {
        this.error = "URL format is wrong! http(s)://url.com";
        return;
    }
    this.error = '';

    this.http.post<{message: any; url: Url | any}>("http://localhost:3000/api/urls", {url: this.url}).subscribe(data => {
      this.shorturl = data.url.fullshorturl;
    });

    //this.url = ""
  }
}
