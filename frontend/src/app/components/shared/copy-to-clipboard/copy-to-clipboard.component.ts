import { Component, OnInit, Input } from '@angular/core';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Emitters } from '../../../emitters/emitters';

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.css']
})
export class CopyToClipboardComponent implements OnInit {
  @Input() textToCopy: string = '';

  faClipboard = faClipboard;
  faCheck = faCheck;

  copyBtnPressed = false;

  constructor() { }

  ngOnInit(): void {}

  onClickCopyToClipboard() {
    navigator.clipboard.writeText(this.textToCopy);
    this.copyBtnPressed = true;
    Emitters.toastEmitter.emit({
      title: "Copied to clipboard",
      state: "success",
      message: "Successfully copied to clipboard",
    });
  }

}
