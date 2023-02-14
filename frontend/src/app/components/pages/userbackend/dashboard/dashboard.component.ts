import { Component, OnInit } from '@angular/core';

import { faGear } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faGear = faGear;
  loggedInUserUsername: string = "";

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loggedInUserUsername = this.userService.getUsername();
  }
}
