import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-view-url',
  templateUrl: './view-url.component.html',
  styleUrls: ['./view-url.component.css'],
  providers: [
    Title
  ],
})
export class ViewUrlComponent implements OnInit {
  shorturl: string | null = '';
  data: any = '';
  error: boolean = false;

  faArrowLeft = faArrowLeft;
  faTrash = faTrash;

  constructor(
    private urlService: UrlService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.shorturl = paramMap.get('id');

        this.urlService.getStats(this.shorturl).subscribe({
          next: this.successLoadingStats.bind(this),
          error: this.errorLoadingStats.bind(this)
        });
      }
    });
  }

  successLoadingStats() {
    this.title.setTitle(`Data of ${this.shorturl}`);
  }

  errorLoadingStats(data: any) {
    this.error = data.error.message;
    this.title.setTitle(`Error loading ${this.shorturl}`);
  }

  onDelete() {
    this.urlService.delete(`${this.shorturl}`) // send delete request to backend
    .subscribe(res => {
      this.router.navigate(['/dashboard']);
    });
  }

}
