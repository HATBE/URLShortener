import { Component, OnInit } from '@angular/core';

import { faGear, faHammer } from '@fortawesome/free-solid-svg-icons';
import { Url } from 'src/app/models/url.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faGear = faGear;
  faHammer = faHammer;

  newAdd: Url | null = null;

  loggedInUserUsername: string = "";
  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();
    this.loggedInUserUsername = this.userService.getUsername();
  }

  onAddedNewUrl(input: Url) {
    this.newAdd = input;
  }
}
