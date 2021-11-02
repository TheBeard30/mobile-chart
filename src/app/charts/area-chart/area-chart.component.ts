import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from '@antv/g2';
import { ChartService } from '../service/chart.service';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { areaData } from './mock.data';
import { areaGeometrySetting, lineGeometrySetting } from 'src/app/util/chart.setting';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.less','../style/common.style.less']
})
export class AreaChartComponent implements OnInit,AfterViewInit {

  chart: Chart;

  @ViewChild("container")  container: ElementRef; 

  themeClass:{'dark-theme': boolean};

  constructor(private chartService: ChartService) {
    setTimeout(() => {
      const observable = this.chartService.subscribeThemeSubject(this.chart);
      observable.subscribe(theme => this.themeClass = {'dark-theme': theme == 'dark'});
    });
  }

  ngOnInit(): void {
    fromEvent(window,'resize').pipe(debounceTime(500)).subscribe(ev => this.chart.forceFit());

  }

  ngAfterViewInit(): void {
    const element = this.container.nativeElement;
    const rect = element.getBoundingClientRect();

    this.chart = new Chart({
      container: element,
      width: rect.width,
      height: rect.height
    });
    this.chart.data(areaData);
  
    areaGeometrySetting(this.chart,null,'month','value','white','',{fillOpacity: 0.3});
    lineGeometrySetting(this.chart,null,'month','value','white','');
    
    this.chart.annotation().regionFilter({
      top: true,
      start: ['min', 'max'],
      end: ['max', 0],
      color: '#f5222d'
    });
    
    this.chart.annotation().regionFilter({
      top: true,
      start: ['min', 0],
      end: ['max', 'min'],
      color: '#2fc25b'
    });
    this.chart.render();
  }

}


