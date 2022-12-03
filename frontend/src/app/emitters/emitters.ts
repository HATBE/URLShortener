import { EventEmitter } from "@angular/core";

export class Emiters {
  static authEmitter = new EventEmitter<boolean>(false);
}
