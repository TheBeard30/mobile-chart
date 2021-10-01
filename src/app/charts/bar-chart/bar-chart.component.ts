import { Component, OnInit } from '@angular/core';
import { Chart } from '@antv/g2';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less']
})
export class BarChartComponent implements OnInit {

  chart: Chart;

  constructor() { }

  ngOnInit(): void {
  }

}
