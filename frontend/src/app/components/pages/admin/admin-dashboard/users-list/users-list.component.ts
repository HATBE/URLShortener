import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'src/app/models/pagination.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() newAdd: any | null = null;

  pagination: Pagination = {page: 1, limit: 1, maxPages: 1, maxCount: 1, hasLast: false, hasNext: false};

  isReLoading: boolean = false;
  isLoading: boolean = false;

  userList: [User] | null = null;

  faEye = faEye;
  faTrash = faTrash;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getNewUsers();
  }

  private getNewUsers() {
    this.isReLoading = true;

    this.userService.getUsers(this.pagination.page).subscribe(data => {
      this.pagination = data.data.pagination;

      this.userList = data.data.users;
      this.isLoading = false;
      this.isReLoading = false;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.newAdd != null) {
      this.pagination.page = 1;
      this.getNewUsers();
    }
  }

  deleteUser(id: string) {
    if(this.userList![this.userList?.findIndex(o => {return o.id == id}) || 0].isAdmin) {
      // if user to delete is admin -> exit.
      return;
    };
    this.userService.delete(id).subscribe(data => {
     this.getNewUsers()
    });
  }

  onPageSwitch(event: any) {
    this.pagination.page = event;
    this.getNewUsers();
  }

}
