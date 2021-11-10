import { Component, OnInit } from '@angular/core';
import { SelectPickerService } from '../datapicker/select-picker.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  constructor(private sps: SelectPickerService) { }

  ngOnInit(): void {
  }

  showPicker(): void{
    this.sps.show([9,5,7,1]);
  }
  

}
