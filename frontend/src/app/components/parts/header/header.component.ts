import { Component, OnInit } from '@angular/core';
import { faGauge, faRightFromBracket, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from 'src/app/services/auth.service';
import { Emiters } from '../../../emitters/emitters';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faRightFromBracket = faRightFromBracket;
  faRightToBracket = faRightToBracket;
  faUserPlus = faUserPlus;
  faGauge = faGauge;

  loggedIn: boolean = false;

  constructor(
    private authService: AuthService,
  ) {
    this.authService.getLoggedInUser().subscribe((res) => {
      this.loggedIn = true;
    });
    Emiters.authEmitter.subscribe(
      (auth: boolean) => {
        this.loggedIn = auth;
      }
    );
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

}
