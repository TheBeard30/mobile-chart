import { Component, OnInit } from '@angular/core';
import { SelectPickerService } from '../datapicker/select-picker.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  data1 = [
    {label: "普通门诊挂号费",value: "普通门诊挂号费"},
    {label: "主任医师",value: "主任医师"},
    {label: "急诊诊查费",value: "急诊诊查费"},
  ]

  data2 = [
    {label: "普通门诊挂号费",value: "普通门诊挂号费"},
    {label: "主任医师",value: "主任医师"},
    {label: "急诊诊查费",value: "急诊诊查费"},
  ]

  constructor(private sps: SelectPickerService) { }

  ngOnInit(): void {
  }


  reset(): void{
    console.log('取消触发');
  }

  pickerChange($event){
    console.log("pickerChange触发",$event);
  }

}
