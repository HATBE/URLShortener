import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition  } from '@fortawesome/fontawesome-svg-core';
import { faIcons } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.css']
})
export class HeaderButtonComponent implements OnInit {
  @Input() name: string = "";
  @Input() link: string | null = "";
  @Input() noActive: boolean = false;
  @Input() icon: IconDefinition  = faIcons;
  @Input() color: boolean = false;

  active: string = 'active';

  constructor() {}

  ngOnInit(): void {
    if(this.noActive) {
      this.active = '';
    }
  }

}
