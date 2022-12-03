import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedIn: boolean = false;
  user: User | null = null;

  constructor(
    private userService: UserService,
    private router: Router
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
    return;
  }

  successloggedIn(data: any) {
    this.user = data.user;
    this.loggedIn = true;
    return;
  }
}
