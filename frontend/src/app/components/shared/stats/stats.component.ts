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

  isLoading: boolean = false;

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.statsService.get().subscribe({
      next: this.successLoading.bind(this),
      error: this.errorLoading.bind(this)
    });

  }

  successLoading(data: any) {
    this.usersCount = data.data.usersCount;
    this.urlsCount = data.data.urlsCount;
    this.urlsClicked = data.data.urlsClicked;
    this.isLoading = false;
  }

  errorLoading() {
    this.usersCount = 0;
    this.urlsCount = 0;
    this.urlsClicked = 0;
  }

}
