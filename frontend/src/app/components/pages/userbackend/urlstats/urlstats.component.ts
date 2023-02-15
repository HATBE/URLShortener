import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-urlstats',
  templateUrl: './urlstats.component.html',
  styleUrls: ['./urlstats.component.css'],
  providers: [
    Title
  ],
})
export class UrlstatsComponent implements OnInit {
  shorturl: string | null = '';
  data: any = '';
  error: boolean = false;

  constructor(
    private urlService: UrlService,
    private route: ActivatedRoute,
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
    this.title.setTitle(`Stats of ${this.shorturl}`)
  }

  errorLoadingStats(data: any) {
    this.error = data.error.message;
    this.title.setTitle(`Error loading ${this.shorturl}`)
  }

}
