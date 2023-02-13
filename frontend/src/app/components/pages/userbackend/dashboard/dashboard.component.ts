import { Component, OnInit } from '@angular/core';

import { faGear } from '@fortawesome/free-solid-svg-icons';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedIn: boolean = false;
  user: User | null = null;

  faGear = faGear;

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
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
  }
}
