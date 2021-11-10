import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SelectPickerOptions } from '../select-picker-options.provider';
import { OverlayRef } from '@angular/cdk/overlay';
@Component({
  selector: 'app-select-picker',
  templateUrl: './select-picker.component.html',
  styleUrls: ['./select-picker.component.less'],
  animations: [
    trigger("open-close",[
      state("open",style({
        opacity: 1,
        height: "300px"
      })),
      state("close",style({
        opacity: 0,
        height: 0
      })),
      transition('open=>close', [
        animate("1s")
      ]),
      transition('close=>open', [
        animate("1s")
      ]),
    ])
  ]
})
export class SelectPickerComponent implements OnInit {
  
  isOpen: boolean = false;
  
  constructor(
    public selectOptions: SelectPickerOptions<any>,
    public overlayRef: OverlayRef
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void{
    setTimeout(() => this.isOpen = true);
  }

}
