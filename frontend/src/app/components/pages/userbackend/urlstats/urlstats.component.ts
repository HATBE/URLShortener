import { Component, OnInit } from '@angular/core';

import { UrlService } from 'src/app/services/url.service';
import { Title } from '@angular/platform-browser';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Url } from 'src/app/models/url.model';

@Component({
  selector: 'app-urlstats',
  templateUrl: './urlstats.component.html',
  styleUrls: ['./urlstats.component.css'],
  providers: [
    Title
  ],
})
export class UrlstatsComponent implements OnInit {
  loggedIn: boolean = false;

  urlTitle: string = "";
  id: string | null = '';
  error: string = '';
  data: any = '';

  isLoading: boolean = false;

  constructor(
    private urlService: UrlService,
    private route: ActivatedRoute,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.id = paramMap.get('id');

        this.urlService.getStats(this.id).subscribe({
          next: this.successLoadingStats.bind(this),
          error: this.errorLoadingStats.bind(this)
        });
      }
    });
  }

  successLoadingStats(data: {data: {stats: {clicked: number}, url: Url}}) {
    this.data = data.data;
    this.urlTitle = `Stats of "${data.data.url.shorturl}"`;
    this.title.setTitle(this.urlTitle)
    this.isLoading = false;
  }

  errorLoadingStats(data: any) {
    this.isLoading = false;
    this.error = data.error.message;
    this.title.setTitle("Error, failed to load");
  }
}
