import { Component, OnInit } from '@angular/core';

import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  usersCount: number = 0;
  urlsCount: number = 0;
  urlsClicked: number = 0;

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.statsService.get().subscribe({
      next: this.successLoading.bind(this),
      error: this.errorLoading.bind(this)
    });
  }

  successLoading(data: any) {
    this.usersCount = data.usersCount;
    this.urlsCount = data.urlsCount;
    this.urlsClicked = data.urlsClicked;
  }

  errorLoading() {
    this.usersCount = 0;
    this.urlsCount = 0;
    this.urlsClicked = 0;
  }

}
