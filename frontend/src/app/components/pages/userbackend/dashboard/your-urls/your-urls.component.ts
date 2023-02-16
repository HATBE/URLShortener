import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

import { UrlService } from 'src/app/services/url.service';

import { Url } from 'src/app/models/url.model';
import { faTrash, faEye, faGear } from '@fortawesome/free-solid-svg-icons';
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

  myUrls: Url[] | null = null;
  localUrl: string = window.location.origin + '/';

  isLoading: boolean = false;

  faTrash = faTrash;
  faEye = faEye;
  faArrowAltCircleRight = faArrowAltCircleRight;

  constructor(
    private urlService: UrlService,
  ) { }

  ngOnInit(): void {
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US');

    this.isLoading = true;

    this.urlService.getMyUrls().subscribe(data => {
      const urls = data.data.urls;
      urls.map((url: any) => {
        url.date = timeAgo.format(new Date(url.date * 1000));
      });
      this.myUrls = urls;
      this.isLoading = false;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US');

    if(this.newAdd != null) {
      this.newAdd.date = timeAgo.format(new Date(this.newAdd.date * 1000));
      this.myUrls?.unshift(this.newAdd)

      this.myUrls?.sort()
    }
  }

  deleteUrl(shortUrl: string) {
    this.urlService.delete(shortUrl) // send delete request to backend
    .subscribe(res => {
      this.myUrls?.splice(this.myUrls?.findIndex(o => {return o.shorturl == shortUrl}) || 0, 1) // remove entry from gui
    });
  }

}
