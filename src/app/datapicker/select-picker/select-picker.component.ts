import { Component, OnInit } from '@angular/core';
import { SelectPickerOptions } from '../select-picker-options.provider';

@Component({
  selector: 'app-select-picker',
  templateUrl: './select-picker.component.html',
  styleUrls: ['./select-picker.component.less']
})
export class SelectPickerComponent implements OnInit {

  constructor(
    public selectOptions: SelectPickerOptions<any>
  ) { }

  ngOnInit(): void {
  }

}
