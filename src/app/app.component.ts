import { Component } from '@angular/core';
import {ChartService} from "./charts/service/chart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  theme = 'default';

  themeClass: {'dark-theme': boolean};

  constructor(private chartService: ChartService) {
  }

  changeTheme(ev): void{
    this.theme = this.theme == 'default' ? 'dark' : 'default';
    this.chartService.changeThemeSubject.next(this.theme);
    this.themeClass = {'dark-theme': this.theme == 'dark' };
  }

}
