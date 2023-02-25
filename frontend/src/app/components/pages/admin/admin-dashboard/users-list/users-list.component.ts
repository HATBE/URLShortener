import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() newAdd: any | null = null;

  isLoading: boolean = false;
  userList: [User] | null = null;

  faEye = faEye;
  faTrash = faTrash;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe(data => {
      this.isLoading = false;
      this.userList = data.data.users;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.newAdd != null) {
      this.userList?.push(this.newAdd);
    }
  }

  deleteUser(id: string) {
    if(this.userList![this.userList?.findIndex(o => {return o.id == id}) || 0].isAdmin) {
      // if user to delete is admin -> exit.
      return;
    };
    this.userService.delete(id).subscribe(data => {
      this.userList?.splice(this.userList?.findIndex(o => {return o.id == id}) || 0, 1); // remove entry from gui
    });
  }

}
