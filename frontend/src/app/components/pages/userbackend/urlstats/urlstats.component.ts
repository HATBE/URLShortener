import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { UrlService } from 'src/app/services/url.service';

import { ActivatedRoute, ParamMap } from '@angular/router';

import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Url } from 'src/app/models/url.model';

@Component({
  selector: 'app-urlstats',
  templateUrl: './urlstats.component.html',
  styleUrls: ['./urlstats.component.css']
})
export class UrlstatsComponent implements OnInit {
  loggedIn: boolean = false;
  user: User | null = null;

  id: string | null = '';
  error: string = '';
  data: string = '';

  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private urlService: UrlService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.user = data.data.user;
    this.loggedIn = true;


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.id = paramMap.get('id');

        this.urlService.getStats(this.id).subscribe(data => {
          this.data = data.data.stats.clicked;

          this.isLoading = false;
        });
      }
    });
  }


}
