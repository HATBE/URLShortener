import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../../emitters/emitters';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  maxToasts: number = 3;
  toasts: any[] = [];

  constructor() { }

  ngOnInit(): void {
    Emitters.toastEmitter.subscribe(res => {
      this.toasts.push(res);
      if(this.toasts.length > this.maxToasts) {
        this.toasts.pop();
      }
    });
  }

  onClose(index: number) {
    this.toasts.splice(index, 1);
  }

}
