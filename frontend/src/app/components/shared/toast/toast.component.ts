import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toasts: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.toasts = [
      /*{
        title: "Test titel",
        state: "success",
        message: "this is a cool success message",
      }*/
    ]
  }

  onClose() {

  }

}
