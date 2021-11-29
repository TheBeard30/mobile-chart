import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cross-report',
  templateUrl: './cross-report.component.html',
  styleUrls: ['./cross-report.component.less']
})
export class CrossReportComponent implements OnInit {

  hostStyle = {
    width: '100%',
    height: '500px'
  };

  spread;

  constructor() { }

  ngOnInit(): void {
  }

  workbookInit($event){
    this.spread = $event.spread;
  }

}
