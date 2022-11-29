import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.css']
})
export class HeaderButtonComponent implements OnInit {
  @Input() name = "";
  @Input() link = "";

  constructor() { }

  ngOnInit(): void {
  }

}
