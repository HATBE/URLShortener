import { Component } from '@angular/core';

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
    this.userService.checkLogin();
    setInterval(() => {
      this.userService.checkLogin();
    }, 300_000); // every five minutes
  }
}
