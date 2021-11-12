import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { SelectPickerOptions } from './select-picker-options.provider';
import { SelectPickerService } from './select-picker.service';

@Directive({
  selector: '[ngxSelectPicker]'
})
export class SelectPickerDirective<T extends {label: string,value: any}> {

  @Input() data: Array<T> = [];

  @Input() title: string;

  @Input() mask: boolean = true;

  @Input() disabled: boolean = false;

  @Output() onConfirm: EventEmitter<any> = new EventEmitter();

  @Output() onPickerChange: EventEmitter<any> = new EventEmitter();

  @Output() onReset: EventEmitter<any> = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private sps: SelectPickerService
  ) { 

  }


  @HostListener("click")
  clickHostElement(){
    const options = new SelectPickerOptions();
    const optionsParams = ['data','title','mask','disabled','onPickerChange','onReset'];
    optionsParams.forEach(param => options[param] = this[param]);
    options.data = this.data;
    this.sps.showPicker(options);
  }


}
