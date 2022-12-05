import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { UrlService } from 'src/app/services/url.service';

import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Url } from 'src/app/models/url.model';

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

  constructor(
    private userService: UserService,
    private urlService: UrlService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe({
      next: this.successloggedIn.bind(this),
      error: this.notLoggedIn.bind(this)
    });

    this.urlService.getMyUrls().subscribe(urls => {
      this.myUrls = urls.urls;
    });
  }

  notLoggedIn() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
    return;
  }

  successloggedIn(data: any) {
    this.user = data.user;
    this.loggedIn = true;
    return;
  }
}
