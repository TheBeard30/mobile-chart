import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngxSelectPicker]'
})
export class SelectPickerDirective {

  @Input() data: Array<any> = [];

  @Output() onValueChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private elementRef: ElementRef
  ) { 

  }


}
