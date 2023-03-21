import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

import { Pagination } from 'src/app/models/pagination.model';
import { Url } from 'src/app/models/url.model';

import { faTrash, faEye} from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import { UserService } from 'src/app/services/user.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-your-urls',
  templateUrl: './your-urls.component.html',
  styleUrls: ['./your-urls.component.css']
})
export class YourUrlsComponent implements OnInit {
  @Input() newAdd: any | null = null;

  pagination: Pagination = {page: 1, limit: 1, maxPages: 1, maxCount: 1, hasLast: false, hasNext: false};

  myUrls: Url[] | null = null;
  localUrl: string = window.location.origin + '/';

  isLoading: boolean = false;
  isReLoading: boolean = false;

  faTrash = faTrash;
  faEye = faEye;
  faArrowAltCircleRight = faArrowAltCircleRight;

  constructor(
    private urlService: UrlService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getNewUrls();
  }

  private getNewUrls() {
    this.isReLoading = true;
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US');

    this.userService.getUrls(localStorage.getItem('userid'), this.pagination.page).subscribe(data => {
      const urls = data.data.urls;
      urls.map((url: any) => {
        url.date = timeAgo.format(new Date(url.date * 1000));
      });

      this.pagination = data.data.pagination;

      this.myUrls = urls;
      this.isLoading = false;
      this.isReLoading = false;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.newAdd != null) {
      this.pagination.page = 1;
      this.getNewUrls();
    }
  }

  deleteUrl(shortUrl: string) {
    this.urlService.delete(shortUrl) // send delete request to backend
    .subscribe(res => {
      this.getNewUrls();
    });
  }

  onPageSwitch(event: any) {
    this.pagination.page = event;
    this.getNewUrls();
  }

}
