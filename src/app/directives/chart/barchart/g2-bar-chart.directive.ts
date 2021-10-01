import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[g2-bar-chart]'
})
export class G2BarChartDirective {

  @Input("g2-bar-chart") g2_bar_chart;

  constructor(
    private elementRef: ElementRef
  ) { }

}
