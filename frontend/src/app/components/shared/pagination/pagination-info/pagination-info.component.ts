import { Component, OnInit, Input, SimpleChanges  } from '@angular/core';

import { Pagination } from 'src/app/models/pagination.model';

@Component({
  selector: 'app-pagination-info',
  templateUrl: './pagination-info.component.html',
  styleUrls: ['./pagination-info.component.css']
})
export class PaginationInfoComponent implements OnInit {
  @Input() pagination: Pagination = {page: 1, limit: 1, maxPages: 1, maxCount: 1, hasLast: false, hasNext: false};

  page: number = 1;
  limit: number = 1;
  maxPages: number = 1;
  maxCount: number = 1;
  hasLast: boolean = false;
  hasNext: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.page = this.pagination.page;
    this.hasLast = this.pagination.hasLast;
    this.hasNext = this.pagination.hasNext;

    this.limit = this.pagination.limit;
    this.maxPages = this.pagination.maxPages;
    this.maxCount = this.pagination.maxCount;
  }

}
