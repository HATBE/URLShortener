import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Url } from '../../../models/url.model'
import { User } from 'src/app/models/user.model';
import { UrlService } from 'src/app/services/url.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shortener',
  templateUrl: './shortener.component.html',
  styleUrls: ['./shortener.component.css']
})
export class ShortenerComponent implements OnInit {
  @Output() addedNewUrl = new EventEmitter<Url>();
  @Input() border: boolean = false

  error: string = "";
  info: string = "";
  url: string = ""
  shorturl: string = "";
  isLoading: boolean = false;

  loggedIn: boolean = false;
  user: User | null = null;

  faArrowLeft = faArrowLeft;

  constructor(
    private urlService: UrlService
  ) {}

  ngOnInit(): void {
  }

  onClickInput() {
    this.error = "";
  }

  onShorten() {
    this.isLoading = true;
    if(this.url === '') {
      this.isLoading = false;
      return;
    }
    if(!(this.url.toLowerCase().startsWith('http://') || this.url.toLowerCase().startsWith('https://'))) {
      // if url has no protocol (http or https), add https.
      this.url = `https://${this.url}`;
      this.info = "A protocol (https://) was added.";
    }
    if(!new RegExp(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).test(this.url)) {
        this.error = "URL format is wrong! Use http(s)://url.com(/*)";
        this.isLoading = false;
        return;
    }
    this.error = '';

    this.urlService.add(this.url)
    .subscribe({
      next: this.successAddingUrl.bind(this),
      error: this.errorAddingUrl.bind(this)
    });
  }

  successAddingUrl(data: {message: string, data: {url: Url}}) {
    this.shorturl = window.location.origin + '/' + data.data.url.shorturl;
    this.isLoading = false;
    this.addedNewUrl.emit(data.data.url);
  }

  errorAddingUrl(error: any) {
    if(error.error.message) {
      this.error = `${error.error.message}`;
    } else {
      this.error = `${error.status} ${error.statusText}`;
    }

    this.isLoading = false;
  }

  reset() {
    // this function is called on the "back" button in the html component
    this.shorturl = '';
    this.isLoading = false;
    this.url = '';
    this.error = '';
    this.info = '';
  }
}
