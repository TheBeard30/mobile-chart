import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Point } from '@antv/g-base';
import { Chart } from '@antv/g2';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { pointGeometrySetting,lineGeometrySetting } from 'src/app/util/chart.setting';
import { customChartEvents } from 'src/app/util/custom-event.util';
import { showXTooltipCrosshairsTextConfig } from '../config/tooltip.config';
import { ChartService } from '../service/chart.service';
import { chartData } from './mock.data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.less','../style/common.style.less']
})
export class LineChartComponent implements OnInit,AfterViewInit,OnDestroy {

  @ViewChild("container") container!: ElementRef;

  chart!: Chart;

  themeClass:{'dark-theme': boolean};

  constructor(
    private chartService: ChartService,
    private router: Router,
    private elementRef: ElementRef
  ) { 
    setTimeout(() => {
      const observable = this.chartService.subscribeThemeSubject(this.chart);
      observable.subscribe(theme => this.themeClass = {'dark-theme': theme == 'dark'});
    });
  }
  

  ngOnInit(): void {
    fromEvent(window,'resize').pipe(debounceTime(500)).subscribe(ev => this.chart.forceFit());
  }

  ngOnDestroy(): void{

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
    this.chart.tooltip(showXTooltipCrosshairsTextConfig);

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
    this.chart.legend(false);
    this.chart.render();
    customChartEvents(this.chart);
  }

  landscape(ev){
    const element: HTMLElement = this.elementRef.nativeElement.querySelector('.wrapper');
    element.style.transform = "rotate(90deg)";
    element.style.width = "100%";
    element.style.height = "100%";
  }

}
