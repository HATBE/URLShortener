import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'src/app/models/pagination.model';

@Component({
  selector: 'app-pagination-button',
  templateUrl: './pagination-button.component.html',
  styleUrls: ['./pagination-button.component.css']
})
export class PaginationButtonComponent implements OnInit {
  @Input() pagination: Pagination = {page: 1, limit: 1, maxPages: 1, maxCount: 1, hasLast: false, hasNext: false};
  @Input() isLoading: boolean = false;

  page: number = 1;
  limit: number = 1;
  maxPages: number = 1;
  maxCount: number = 1;
  hasLast: boolean = false;
  hasNext: boolean = false;

  @Output() pageSwitchEvent = new EventEmitter<number>();

  arrowRight = faArrowRight;
  arrowLeft = faArrowLeft;

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.page = this.pagination.page;
    this.hasLast = this.pagination.hasLast;
    this.hasNext = this.pagination.hasNext;

    this.limit = this.pagination.limit;
    this.maxPages = this.pagination.maxPages;
    this.maxCount = this.pagination.maxCount;
  }

  pageBack() {
    if(this.isLoading) return;
    if(this.page > 1) {
      this.page--;
      this.pageSwitchEvent.emit(this.page);
    }
  }

  pageForward() {
    if(this.isLoading) return;
    if(this.hasNext) {
      this.page++;
      this.pageSwitchEvent.emit(this.page);
    }
  }

}
