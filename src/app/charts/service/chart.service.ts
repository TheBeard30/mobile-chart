import { Injectable } from '@angular/core';
import { Chart,View } from '@antv/g2';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  // 改变主题的subject
  changeThemeSubject: Subject<string> = new Subject<string>();

  constructor() { }

  /**
   * 订阅主题改变subject
   * @param  {Chart}  chart  图表实例
   * @returns Subscription
   */
  subscribeThemeSubject(chart: Chart): Observable<string>{
    return new Observable<string>(observer => {
      this.changeThemeSubject.subscribe(theme => {
        this.changeTheme(chart,theme);
        observer.next(theme);
      });
    });
  }


  /**
   * 改变表格主题
   * @param {Chart}   chart  图表
   * @param {string}  theme  主题
   */
   changeTheme(chart: Chart | View,theme: string): void{
     console.log(chart.getTheme());
     chart.theme(theme);
     chart.render(true);
  }
}
