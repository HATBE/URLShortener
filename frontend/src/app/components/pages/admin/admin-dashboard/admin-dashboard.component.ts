import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  newAdd: User | null = null;

  faArrowLeft = faArrowLeft;

  constructor() { }

  ngOnInit(): void {

  }

  onAddedNewUser(input: User) {
    this.newAdd = input;
  }

}
