import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, Util } from '@antv/g2';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ChartService } from '../service/chart.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.less','../style/common.style.less']
})
export class PieChartComponent implements OnInit,AfterViewInit {

  @ViewChild("container") container!: ElementRef;

  chart!: Chart;

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
    fromEvent(window,'resize').pipe(debounceTime(500)).subscribe(ev => this.chart.forceFit());
  }

  ngAfterViewInit(): void{
    const element: HTMLElement = this.container.nativeElement;
    const domRect = element.getBoundingClientRect();
    this.chart = new Chart({
      container: element,
      width: domRect.width,
      height: domRect.height
    });
    const data = [
      { type: '一线城市', value: 0.19 },
      { type: '二线城市', value: 0.21 },
      { type: '三线城市', value: 0.27 },
      { type: '四线及以下', value: 0.33 },
    ];
    this.chart.data(data);

    this.chart.coordinate('theta', {
      radius: 0.75
    });

    this.chart.tooltip({
      showMarkers: false
    });
    
    const interval = this.chart
      .interval()
      .adjust('stack')
      .position('value')
      .color('type', ['#063d8a', '#1770d6', '#47abfc', '#38c060'])
      .style({ opacity: 0.4 })
      .state({
        active: {
          style: (element) => {
            const shape = element.shape;
            return {
              matrix: Util.zoom(shape, 1.1),
            }
          }
        }
      })
      .label('type', (val) => {
        const opacity = val === '四线及以下' ? 1 : 0.5;
        return {
          offset: -30,
          style: {
            opacity,
            fill: 'white',
            fontSize: 12,
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
          },
          content: (obj) => {
            return obj.type + '\n' + obj.value + '%';
          },
        };
      });
    
    this.chart.interaction('element-single-selected');
    
    this.chart.render();
  }

}
