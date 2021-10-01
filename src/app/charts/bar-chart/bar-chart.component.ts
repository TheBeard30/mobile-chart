import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from '@antv/g2';
import { registerTriangleShape } from 'src/app/shape/interval/triangle.shape';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less']
})
export class BarChartComponent implements OnInit,AfterViewInit {

  chart: Chart;

  @ViewChild("container")  container: ElementRef; 

  constructor() { }

  ngOnInit(): void {
    registerTriangleShape();
  }

  ngAfterViewInit(): void{
    const data = [
      { type: '未知', value: 654, percent: 0.02 },
      { type: '17 岁以下', value: 654, percent: 0.02 },
      { type: '18-24 岁', value: 4400, percent: 0.2 },
      { type: '25-29 岁', value: 5300, percent: 0.24 },
      { type: '30-39 岁', value: 6200, percent: 0.28 },
      { type: '40-49 岁', value: 3300, percent: 0.14 },
      { type: '50 岁以上', value: 1500, percent: 0.06 },
    ];

    const element = this.container.nativeElement;
    const rect = element.getBoundingClientRect();

    this.chart = new Chart({
      container: element,
      autoFit: true
    });

    this.chart.data(data);
    this.chart.interval().position('type*value').shape('triangle');
    this.chart.interaction('element-active');
    this.chart.render();
  }

}
