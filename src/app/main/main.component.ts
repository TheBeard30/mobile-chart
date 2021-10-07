import { Component, OnInit } from '@angular/core';
import { ChartService } from '../charts/service/chart.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  theme = 'default';

  themeClass: {'dark-theme': boolean};

  constructor(private chartService: ChartService) {
  }

  ngOnInit(): void{
    
  }

  changeTheme(ev): void{
    this.theme = this.theme == 'default' ? 'dark' : 'default';
    this.chartService.changeThemeSubject.next(this.theme);
    this.themeClass = {'dark-theme': this.theme == 'dark' };
  }

}
