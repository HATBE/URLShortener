import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.checkLogin();
    setInterval(() => {
      this.checkLogin();
    }, 60_000);
  }

  checkLogin() {
    this.userService.getLoggedInUser().subscribe({
      next: this.loggedIn.bind(this),
      error: this.notLoggedIn.bind(this)
    });
  }

  loggedIn() {
    console.log('loggedin');
  }

  notLoggedIn() {
    console.log('not loggedin')
  }
}
