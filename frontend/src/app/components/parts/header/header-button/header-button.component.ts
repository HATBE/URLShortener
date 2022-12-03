import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.css']
})
export class HeaderButtonComponent implements OnInit {
  @Input() name: string = "";
  @Input() link: string | null = "";
  @Input() noActive: boolean = false;

  active: string = 'active';

  constructor() {}

  ngOnInit(): void {
    if(this.noActive) {
      this.active = '';
    }
  }

}
