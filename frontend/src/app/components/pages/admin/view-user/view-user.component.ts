import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
    this.title.setTitle(`Stats of ${data.data.user.username}`);
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
}
