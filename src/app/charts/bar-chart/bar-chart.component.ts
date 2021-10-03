import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, View } from '@antv/g2';
import { registerTriangleShape } from 'src/app/shape/interval/triangle.shape';
import { ChartService } from '../service/chart.service';
import DataSet from '@antv/data-set';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less','../style/common.style.less']
})
export class BarChartComponent implements OnInit,AfterViewInit {

  chart: Chart;

  @ViewChild("container")  container: ElementRef; 

  themeClass:{'dark-theme': boolean};

  constructor(
    private chartService: ChartService
  ) { 
    setTimeout(() => {
      const observable = this.chartService.subscribeThemeSubject(this.chart);
      observable.subscribe(theme => this.themeClass = {'dark-theme': theme == 'dark'});
    });
  }

  ngOnInit(): void {
    registerTriangleShape();
  }

  ngAfterViewInit(): void{
    const data = [
      { id: 1,type: '未知', value: 654, percent: 0.02 },
      { id: 2,type: '17 岁以下', value: 654, percent: 0.02 },
      { id: 3,type: '18-24 岁', value: 4400, percent: 0.2 },
      { id: 4,type: '25-29 岁', value: 5300, percent: 0.24 },
      { id: 5,type: '30-39 岁', value: 6200, percent: 0.28 },
      { id: 6,type: '40-49 岁', value: 3300, percent: 0.14 },
      { id: 7,type: '50 岁以上', value: 1500, percent: 0.06 },
    ];

    const element = this.container.nativeElement;
    const rect = element.getBoundingClientRect();

    this.chart = new Chart({
      container: element,
      autoFit: true
    });
    const view = this.chart.createView();
    view.data(data);
    view.interval().position('type*value').shape('triangle');
    view.interaction('element-active');
    this.createTrendLine(this.chart,data);
    this.chart.render();
  }

  createTrendLine(chart: Chart,data: Array<any>): void{
    const dataset = new DataSet();
    const dataView = dataset.createView().source(data);
    console.log(dataView);
    dataView.transform({
      type: 'regression',
      method: 'polynomial',
      fields: ['id', 'value'],
      bandwidth: 0.1,
      as: ['id', 'value']
    });
    console.log(dataView);
    const view = chart.createView();
    view.axis(false);
    view.data(dataView.rows);
    view.line().position('id*value').style({
      stroke: '#969696',
      lineDash: [3, 3],
      offsetX: 123
    }).tooltip(false);
  }

}
