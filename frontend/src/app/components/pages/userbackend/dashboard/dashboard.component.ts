import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe({
      error: this.notLoggedIn.bind(this),
      next: this.successloggedIn.bind(this)
    });
  }

  notLoggedIn() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
    return;
  }

  successloggedIn() {
    this.loggedIn = true;
    return;
  }

}
