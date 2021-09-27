import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from '@antv/g2';
import { pointGeometrySetting,lineGeometrySetting } from 'src/app/util/chart.setting';
import { customChartEvents } from 'src/app/util/custom-event.util';
import { chartData } from './mock.data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.less']
})
export class LineChartComponent implements OnInit,AfterViewInit {

  @ViewChild("container") container!: ElementRef;

  chart!: Chart;

  constructor() { }
  

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
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
    this.chart.option('scrollbar', {
      type: 'horizontal',
    });  

    this.chart.render();
    customChartEvents(this.chart);
  }

}
