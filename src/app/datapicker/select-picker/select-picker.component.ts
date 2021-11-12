import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { SelectPickerOptions } from '../select-picker-options.provider';
import { OverlayRef } from '@angular/cdk/overlay';
import { pickerAnimation } from './select-picker.animations';
@Component({
  selector: 'app-select-picker',
  templateUrl: './select-picker.component.html',
  styleUrls: ['./select-picker.component.less'],
  animations: [pickerAnimation]
})
export class SelectPickerComponent implements OnInit {
  
  isOpen: boolean = false;

  selectValue: any;
  
  constructor(
    public selectOptions: SelectPickerOptions,
    public overlayRef: OverlayRef
  ) { }

  ngOnInit(): void {
    this.selectOptions.data.forEach(v => v.checked = false);
  }

  ngAfterViewInit(): void{
    setTimeout(() => this.isOpen = true);
  }


  reset(): void{
    this.selectOptions.hidePicker();
    this.selectOptions.cancel();
    this.selectOptions.onReset.emit();
  }

   
  confirm(): void{
    this.selectOptions.hidePicker();
    this.selectOptions.confirm(this.selectValue);
  }


  @HostListener("touchend",["$event"])
  @HostListener("mouseup",["$event"])
  @HostListener("mouseleave",["$event"])
  penend(event){
    if(!event.target.classList.contains("optionValue")) return;
    this.selectOptions.onPickerChange.emit("选择值改变测试");
  }


  chooseOption(option: {[p: string]: any}): void{
    option.checked = !option.checked;
  }


  



}
