import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-url-chart',
  templateUrl: './url-chart.component.html',
  styleUrls: ['./url-chart.component.css']
})
export class UrlChartComponent implements OnInit {
  @Input() shorturl: any;

  constructor() { }

  ngOnInit(): void {
  }

}
