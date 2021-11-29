import { style } from '@angular/animations';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Point } from '@antv/g-base';
import { Chart, View } from '@antv/g2';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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

  constructor(private elementRef: ElementRef,
              private renderer2: Renderer2) {

  }

  ngOnInit(): void {

    fromEvent(window,'resize').pipe(debounceTime(500)).subscribe(ev => this.chart.forceFit());
  }

  ngAfterViewInit(): void{
    const element: HTMLElement = this.container.nativeElement;
    const {width,height} = element.getBoundingClientRect();
    const container = this.renderer2.createElement("div");
    container.style.width = height + "px";
    container.style.height = width + "px";
    this.chart = new Chart({
      container: container,
      width: height,
      height: width
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
    // this.chart.coordinate('rect').transpose().reflect('y');
    this.chart.render();
    container.style.position = "absolute"
    container.style.transform = "rotate(90deg)";
    container.style.transformOrigin = "top left";
    container.style.top = "0";
    container.style.left = width + "px";
    element.appendChild(container);

    this.fixTooltipDisplay(this.chart);
  }

  /**
   * 处理横屏tooltip展示
   * @param {Chart}  chart  图表实例
   */
  fixTooltipDisplay(chart: Chart): void{
    const showTooltip: (point: Point) => View = View.prototype.showTooltip.bind(chart);
    const _showTooltip = (point) => {
      // 默认顺时针旋转90度
      const height = chart.canvas.get('height');
      const x = point.y;
      const y = height - point.x;
      return showTooltip({x,y});
    }
    View.prototype.showTooltip = _showTooltip;
    View.prototype.isPointInPlot = () => true;
  }

}
