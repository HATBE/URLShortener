import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../models/url.model'
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  error: string = "";
  url: string = ""
  shorturl: string = "";
  isLoading: boolean = false;

  faClipboard = faClipboard;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  onClickInput() {
    this.error = "";
  }

  onShorten() {
    this.isLoading = true;
    if(!/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.url)) {
        this.error = "URL format is wrong! http(s)://url.com";
        this.isLoading = false;
        return;
    }
    this.error = '';

    this.http.post<{message: any; url: Url | any}>("http://localhost:3000/api/urls", {url: this.url}).subscribe(data => {
      this.shorturl = data.url.fullshorturl;
      this.isLoading = false;
    }, error => {
      this.error = `${error.status} ${error.statusText}`;
      this.isLoading = false;
    });
    this.url = "";
  }

  onClickCopyToClipboard() {
    navigator.clipboard.writeText(this.shorturl);
  }
}
