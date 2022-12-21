import { Component, OnInit } from '@angular/core';
import { faGauge, faRightFromBracket, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { UserService } from 'src/app/services/user.service';
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
    private userService: UserService,
  ) {
    this.userService.getLoggedInUser().subscribe((res) => {
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
    this.userService.logout().subscribe(res => {
      Emiters.authEmitter.emit(false);
    });
  }

}
