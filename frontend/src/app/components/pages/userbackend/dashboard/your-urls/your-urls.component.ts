import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

import { UrlService } from 'src/app/services/url.service';

import { Url } from 'src/app/models/url.model';
import { faTrash, faEye, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'

@Component({
  selector: 'app-your-urls',
  templateUrl: './your-urls.component.html',
  styleUrls: ['./your-urls.component.css']
})
export class YourUrlsComponent implements OnInit {
  @Input() newAdd: any | null = null;

  page: number = 1;
  maxPages: number = 1;
  maxCount: number = 1;
  hasNext: boolean = false;
  hasLast: boolean = false;
  limit: number = 1;

  myUrls: Url[] | null = null;
  localUrl: string = window.location.origin + '/';

  isLoading: boolean = false;

  arrowRight = faArrowRight;
  arrowLeft = faArrowLeft;
  faTrash = faTrash;
  faEye = faEye;
  faArrowAltCircleRight = faArrowAltCircleRight;

  constructor(
    private urlService: UrlService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.getNewUrls();
  }

  private getNewUrls() {
    this.isLoading = true;
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US');

    this.urlService.getMyUrls(this.page).subscribe(data => {
      const urls = data.data.urls;
      urls.map((url: any) => {
        url.date = timeAgo.format(new Date(url.date * 1000));
      });

      this.maxPages = data.data.pagination.maxPages;
      this.hasLast = data.data.pagination.hasLast;
      this.hasNext = data.data.pagination.hasNext;
      this.maxCount = data.data.pagination.maxCount;
      this.limit = data.data.pagination.limit;

      this.myUrls = urls;
      this.isLoading = false;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.newAdd != null) {
      this.page = 1;
      this.getNewUrls();
    }
  }

  deleteUrl(shortUrl: string) {
    this.urlService.delete(shortUrl) // send delete request to backend
    .subscribe(res => {
      this.getNewUrls();
    });
  }

  pageBack() {
    if(this.page > 1) {
      this.page--;
      this.getNewUrls();
    }
  }

  pageForward() {
    if(this.hasNext) {
      this.page++;
      this.getNewUrls();
    }
  }

}
