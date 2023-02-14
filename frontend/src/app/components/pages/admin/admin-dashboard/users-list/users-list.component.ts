import { Component, OnInit } from '@angular/core';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  isLoading: boolean = false;
  userList: [User] | null = null;

  faEye = faEye;
  faTrash = faTrash;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.userList = data.data.users;
    })
  }

}
