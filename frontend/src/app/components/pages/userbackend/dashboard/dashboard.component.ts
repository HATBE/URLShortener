import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { UrlService } from 'src/app/services/url.service';

import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Url } from 'src/app/models/url.model';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedIn: boolean = false;
  user: User | null = null;

  myUrls: Url[] | null = null;
  localUrl: string = window.location.origin + '/';

  isLoading: boolean = false;

  faTrash = faTrash;
  faEye = faEye;
  faArrowAltCircleRight = faArrowAltCircleRight;

  constructor(
    private userService: UserService,
    private urlService: UrlService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getLoggedInUser().subscribe({
      next: this.successloggedIn.bind(this),
      error: this.notLoggedIn.bind(this)
    });
  }

  notLoggedIn() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  successloggedIn(data: any) {
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US');

    this.user = data.data.user;
    this.loggedIn = true;

    this.urlService.getMyUrls().subscribe(data => {
      const urls = data.data.urls;
      urls.map((url: any) => {
        url.date = timeAgo.format(new Date(url.date * 1000));
      });
      this.myUrls = urls;
      this.isLoading = false;
    });
  }

  deleteUrl(shortUrl: string) {
    this.urlService.delete(shortUrl) // send delete request to backend
    .subscribe(res => {
      this.myUrls?.splice(this.myUrls?.findIndex(o => {return o.shorturl == shortUrl}) || 0, 1) // remove entry from gui
    });
  }
}
