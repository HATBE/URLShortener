import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faArrowLeft, faTrash, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

import { Emitters } from '../../../../emitters/emitters';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  providers: [
    Title
  ],
})
export class ViewUserComponent implements OnInit {
  id: string | null = '';
  error: boolean = false;
  data: any = null;

  yourself: boolean = false;

  faArrowLeft = faArrowLeft;
  faTrash = faTrash;
  faUserPlus = faUserPlus;
  faUserMinus = faUserMinus;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.id = paramMap.get('id');

        this.userService.getUser(this.id).subscribe({
          next: this.successLoadingUser.bind(this),
          error: this.errorLoadingUser.bind(this)
        });
      }
    });
  }

  successLoadingUser(data: any) {
    this.data = data.data
    this.title.setTitle(`Data of ${data.data.user.username}`);

    if(data.data.user.id == localStorage.getItem('userid')) {
      this.yourself = true;
    }
  }

  errorLoadingUser(data: any) {
    this.error = data.error.message;
    this.title.setTitle(`Error loading ${this.id}`);
  }

  onDelete() {
    if(this.data.user.isAdmin) {
      return;
    };
    this.userService.delete(`${this.id}`).subscribe(data => {
      this.router.navigate(['/admin/dashboard']);
    });
  }

  onToggleAdmin(event: any) {
    this.userService.toggleAdmin(`${this.id}`).subscribe(data => {
      Emitters.toastEmitter.emit({
        title: `Successfully ${this.data.user.isAdmin ? 'demoted to user' : 'promoted to Admin'}`,
        state: "success",
        message: `Successfully ${this.data.user.isAdmin ? 'demoted ' + this.data.user.username + ' to user'  : 'promoted ' + this.data.user.username + ' to admin'}`,
      });
      this.router.navigate(['/admin/dashboard']);
    });
  }

}
