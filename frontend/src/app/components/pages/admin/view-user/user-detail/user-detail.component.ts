import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() id: any = null

  data: any = null
  isLoading: boolean = false;
  error: string = '';

  yourself: boolean = false;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUser(this.id).subscribe({
      next: this.successLoadingUser.bind(this),
      error: this.errorLoadingUser.bind(this)
    });
  }

  successLoadingUser(data: {data: {user: User}}) {
    this.data = data.data;
    this.isLoading = false;

    if(data.data.user.id == localStorage.getItem('userid')) {
      this.yourself = true;
    }
  }

  errorLoadingUser(data: any) {
    this.isLoading = false;
    this.error = data.error.message;
  }

}
