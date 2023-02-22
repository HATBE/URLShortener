import { Component, Input, OnInit } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';

import { Url } from 'src/app/models/url.model';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'

@Component({
  selector: 'app-url-access-list',
  templateUrl: './url-access-list.component.html',
  styleUrls: ['./url-access-list.component.css']
})
export class UrlAccessListComponent implements OnInit {
  @Input() shorturl: any;

  data: any = null;
  isLoading: boolean = false;
  error: string = '';

  faEye = faEye;
  faTrash = faTrash;

  constructor(
    private urlService: UrlService
  ) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.urlService.getAccessList(this.shorturl).subscribe({
      next: this.successLoadingData.bind(this),
      error: this.errorLoadingData.bind(this)
    });
  }

  successLoadingData(data: {data: {accesslist: [{id: string, url: string, date: number, ip:string}], url: Url}}) {
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US');

    data.data.accesslist.map((url: any) => {
      url.date = timeAgo.format(new Date(url.date * 1000));
    });

    let list: any[] = [];

    data.data.accesslist.forEach(e => {
      list.push([e.date, e.ip]);
    });

    this.data = list
    this.isLoading = false;
  }

  errorLoadingData(data: any) {
    this.isLoading = false;
    this.error = data.error.message;
  }

}
