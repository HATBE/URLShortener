import { Component, OnInit } from '@angular/core';
import { Url } from '../../models/url.model'
import { UrlService } from 'src/app/services/url.service';
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

  constructor(private urlService: UrlService) {}

  ngOnInit(): void {
  }

  onClickInput() {
    this.error = "";
  }

  onShorten() {
    this.isLoading = true;
    if(!/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.url)) {
        this.error = "URL format is wrong! http(s)://url.com(/*)";
        this.isLoading = false;
        return;
    }
    this.error = '';

    this.urlService.addUrl(this.url).subscribe({
      next: this.successAddingUrl.bind(this),
      error: this.errorAddingUrl.bind(this)
    });
    this.url = "";
  }

  successAddingUrl(data: {message: string, url: Url}) {
    this.shorturl = window.location.href + data.url.shorturl;
    this.isLoading = false;
  }

  errorAddingUrl(error: {status: string, statusText: string}) {
    this.error = `${error.status} ${error.statusText}`;
    this.isLoading = false;
  }

  onClickCopyToClipboard() {
    navigator.clipboard.writeText(this.shorturl);
  }
}
