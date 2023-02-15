import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-url-access-list',
  templateUrl: './url-access-list.component.html',
  styleUrls: ['./url-access-list.component.css']
})
export class UrlAccessListComponent implements OnInit {
  @Input() shorturl: any;

  constructor() { }

  ngOnInit(): void {
  }

}
