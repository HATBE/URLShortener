import { Component, OnInit } from '@angular/core';

import { faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faGear = faGear;

  constructor() { }

  ngOnInit(): void {}
}
