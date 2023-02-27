import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() headers: any;
  @Input() dataset: any;
  @Input() noDataMessage: any = "No Data!";

  error: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log(this.dataset)
  }

}
