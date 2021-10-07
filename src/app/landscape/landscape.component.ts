import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from '@antv/g2';
import { chartData } from '../charts/line-chart/mock.data';
import { lineGeometrySetting, pointGeometrySetting } from '../util/chart.setting';

@Component({
  selector: 'app-landscape',
  templateUrl: './landscape.component.html',
  styleUrls: ['./landscape.component.less']
})
export class LandscapeComponent implements OnInit {

  @ViewChild('container') container: ElementRef;

  chart!: Chart;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    const element: HTMLElement = this.container.nativeElement;
    const domRect = element.getBoundingClientRect();
    this.chart = new Chart({
      container: element,
      width: domRect.width,
      height: domRect.height
    });

    this.chart.data(chartData);
    this.chart.scale({
      month: {
        range: [0, 1],
      },
      temperature: {
        nice: true,
      },
    });

    this.chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    this.chart.axis('temperature', {
      label: {
        formatter: (val) => {
          return val + ' °C';
        },
      },
    });

    lineGeometrySetting(this.chart,{},'month','temperature','city','smooth');;
    pointGeometrySetting(this.chart,{},'month','temperature','city','circle');
    // this.chart.option('scrollbar', {
    //   type: 'vertical',
    // });  
    this.chart.coordinate('rect').transpose().reflect('y');
    // const canvas = this.chart['canvas'];
    // console.log("canvas>>>",canvas);
    // canvas.set('landscape',true);
    this.chart.render();
    
  }

}
