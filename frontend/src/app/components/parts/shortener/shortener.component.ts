import { Component, OnInit } from '@angular/core';
import { Url } from '../../../models/url.model'
import { User } from 'src/app/models/user.model';
import { UrlService } from 'src/app/services/url.service';
import { UserService } from 'src/app/services/user.service';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-shortener',
  templateUrl: './shortener.component.html',
  styleUrls: ['./shortener.component.css']
})
export class ShortenerComponent implements OnInit {
  error: string = "";
  url: string = ""
  shorturl: string = "";
  isLoading: boolean = false;

  copyBtnPressed = false;

  faClipboard = faClipboard;

  loggedIn: boolean = false;
  user: User | null = null;

  constructor(
    private userService: UserService,
    private urlService: UrlService
  ) {}

  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe({
      next: this.successloggedIn.bind(this),
      error: this.notLoggedIn.bind(this)
    });
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
    if(!/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.url)) {
        this.error = "URL format is wrong! Use http(s)://url.com(/*)";
        this.isLoading = false;
        return;
    }
    this.error = '';

    this.urlService.add(this.url).subscribe({
      next: this.successAddingUrl.bind(this),
      error: this.errorAddingUrl.bind(this)
    });
  }

  successAddingUrl(data: {message: string, url: Url}) {
    this.shorturl = window.location.origin + '/' + data.url.shorturl;
    this.isLoading = false;
  }

  errorAddingUrl(error: {status: string, statusText: string}) {
    this.error = `${error.status} ${error.statusText}`;
    this.isLoading = false;
  }

  onClickCopyToClipboard() {
    navigator.clipboard.writeText(this.shorturl);
    this.copyBtnPressed = true;
  }

  notLoggedIn() {
    this.loggedIn = false;
    return;
  }

  successloggedIn(data: any) {
    this.user = data.user;
    this.loggedIn = true;
    return;
  }

  reset() {
    this.shorturl = '';
    this.isLoading = false;
    this.url = '';
    this.error = '';
    this.copyBtnPressed = false;
  }
}
