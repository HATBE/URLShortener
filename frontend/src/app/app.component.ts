import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.checkLogin();
    setInterval(() => {
      this.authService.checkLogin();
    }, 300_000); // every five minutes
  }
}
