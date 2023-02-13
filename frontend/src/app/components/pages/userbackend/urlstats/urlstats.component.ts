import { Component, OnInit } from '@angular/core';

import { UrlService } from 'src/app/services/url.service';

import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-urlstats',
  templateUrl: './urlstats.component.html',
  styleUrls: ['./urlstats.component.css']
})
export class UrlstatsComponent implements OnInit {
  loggedIn: boolean = false;

  id: string | null = '';
  error: string = '';
  data: string = '';

  isLoading: boolean = false;

  constructor(
    private urlService: UrlService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.id = paramMap.get('id');

        this.urlService.getStats(this.id).subscribe(data => {
          this.data = data.data.stats.clicked;
          this.isLoading = false;
        });
      }
    });
  }
}
