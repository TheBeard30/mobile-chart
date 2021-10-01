import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';
import { Chart } from '@antv/g2';
import { chartData } from '../../../charts/line-chart/mock.data';
import { lineGeometrySetting, pointGeometrySetting } from '../../../util/chart.setting';

@Directive({
  selector: '[g2-line-chart]'
})
export class G2LineChartDirective implements OnInit,AfterViewInit {

  chart: Chart;

  constructor(
    private elementRef: ElementRef
  ) { 

  }
  ngOnInit(): void {
    const host: HTMLElement = this.elementRef.nativeElement;
    const rect: DOMRect = host.getBoundingClientRect();
    this.chart = new Chart({
      container: host,
      width: rect.width,
      height: rect.height
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
    


  }
  ngAfterViewInit(): void {
    
  }

}
