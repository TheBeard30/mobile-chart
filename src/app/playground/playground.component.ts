import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from '@antv/g2';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.less']
})
export class PlaygroundComponent implements OnInit,AfterViewInit {


  @ViewChild("custom") customElementRef: ElementRef;

  chart: Chart;

  constructor() { }

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void{
    const element = this.customElementRef.nativeElement;

    const list = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const data = list.map(x => {
      const y = x ** 2;
      return { x , y, a: y };
    });


    this.chart = new Chart({
      container: element,
      autoFit: true
    });

    this.chart.data(data);

    this.chart.axis('x',{
      position: 'bottom'
    });

    this.chart.axis('y',{
      position: 'left',
      line: {
        style: {
        }
      }
    });

    // this.chart.axis('a',{
    //   position: 'right'
    // });

    this.chart.path().position("x*y");

    // this.chart.interval().position("x*a");

    this.chart.render();
  }

}
