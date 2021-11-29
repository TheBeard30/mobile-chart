import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, Element, Geometry, IGroup, View } from '@antv/g2';
import { registerTriangleShape } from 'src/app/shape/interval/triangle.shape';
import { ChartService } from '../service/chart.service';
import DataSet from '@antv/data-set';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import "../../shape/interval/conversion.shape";

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
    fromEvent(window,'resize').pipe(debounceTime(500)).subscribe(ev => {
      this.chart.forceFit();

    });
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
      width: rect.width,
      height: rect.height
    });
    const view = this.chart.createView();
    view.data(data);
    const geometry = view.interval().position('type*value').color('type').shape('conversion');
    // view.interaction('element-active');
    // this.createTrendLine(this.chart,data);

    this.chart.render();
    // setTimeout(() => {
    //   this.createPath(view);
    // },1000);
  }

  /**
   * 添加路径
   * @param {View}  view  视图
   */
  createPath(view: View): void{
    console.log(view);
    const geometry = view.geometries.find(geom => geom.type == 'interval');
    if(geometry){
      const elements = geometry.getElements();
      const linkGroup = view.foregroundGroup.addGroup({capture: false});
      const group = linkGroup.addGroup();
      const count = elements.length;
      elements.forEach((element,index) => {
        if (index < count - 1) {
          const nextElement = elements[index + 1];
          this.addLinkShape(group, element, nextElement);
        }
      });
    }
  }

  /**
   * 添加连接的图形
   * @param group
   * @param element
   * @param nextElement
   */
  private addLinkShape(group: IGroup, element: Element, nextElement: Element) {
    group.addShape({
      type: 'path',
      attrs: {
        opacity: 0.3,
        fill: '#0b53b0',
        path: this.getLinkPath(element, nextElement),
      },
    });
  }

  /**
   * 获取连接的路径
   * @param {Element}   element        当前的节点
   * @param {Element}   nextElement    下一个节点
   * @returns
   */
  private getLinkPath(element: Element, nextElement: Element) {
    const bbox = element.shape.getCanvasBBox();
    const nextBBox = nextElement.shape.getCanvasBBox();
    const path = [
      ['M', bbox.maxX, bbox.minY],
      ['L', nextBBox.minX, nextBBox.minY],
      ['L', nextBBox.minX, nextBBox.maxY],
      ['L', bbox.maxX, bbox.maxY],
      ['Z'],
    ];
    return path;
  }


  /**
   * 添加趋势线
   * @param {Chart}  chart  图表实例
   * @param {Array}  data   图表数据
   */
  createTrendLine(chart: Chart,data: Array<any>): void{
    const dataset = new DataSet();
    const dataView = dataset.createView().source(data);
    dataView.transform({
      type: 'regression',
      method: 'polynomial',
      fields: ['id', 'value'],
      bandwidth: 0.1,
      as: ['id', 'value']
    });
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
