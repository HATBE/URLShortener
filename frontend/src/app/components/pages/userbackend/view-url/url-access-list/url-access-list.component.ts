import { Component, Input, OnInit } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';

import { Url } from 'src/app/models/url.model';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import { Pagination } from 'src/app/models/pagination.model';

@Component({
  selector: 'app-url-access-list',
  templateUrl: './url-access-list.component.html',
  styleUrls: ['./url-access-list.component.css']
})
export class UrlAccessListComponent implements OnInit {
  @Input() shorturl: any;

  pagination: Pagination = {page: 1, limit: 1, maxPages: 1, maxCount: 1, hasLast: false, hasNext: false};

  data: any = null;
  isLoading: boolean = false;
  error: string = '';

  faEye = faEye;
  faTrash = faTrash;

  isReLoading: boolean = false;

  constructor(
    private urlService: UrlService
  ) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.getNewAccessList();
  }

  private getNewAccessList() {
    this.urlService.getAccessList(this.shorturl, this.pagination.page).subscribe({
      next: this.successLoadingData.bind(this),
      error: this.errorLoadingData.bind(this)
    });
  }

  successLoadingData(data: {data: {accesslist: [{id: string, url: string, date: number, ip: string}], url: Url, pagination: Pagination}}) {
    TimeAgo.addDefaultLocale(en);
    const timeAgo = new TimeAgo('en-US');

    data.data.accesslist.map((url: any) => {
      url.date = timeAgo.format(new Date(url.date * 1000));
    });

    let list: any[] = [];

    data.data.accesslist.forEach(e => {
      list.push([e.date, e.ip]);
    });

    this.pagination = data.data.pagination;
    this.data = list
    this.isReLoading = false;
    this.isLoading = false;
  }

  errorLoadingData(data: any) {
    this.isLoading = false;
    this.isReLoading = false;
    this.error = data.error.message;
  }

  onPageSwitch(event: any) {
    this.pagination.page = event;
    this.getNewAccessList();
  }

}
