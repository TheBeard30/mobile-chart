import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {OverlayModule} from '@angular/cdk/overlay';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { G2LineChartDirective } from './directives/chart/linechart/g2-line-chart.directive';
import { G2BarChartDirective } from './directives/chart/barchart/g2-bar-chart.directive';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { LandscapeComponent } from './landscape/landscape.component';
import { MainComponent } from './main/main.component';
import { PlaygroundModule } from './playground/playground.module';
import { AreaChartComponent } from './charts/area-chart/area-chart.component';
import { SearchComponent } from './search/search.component';
import { SelectPickerComponent } from './datapicker/select-picker/select-picker.component';


const COMPONENTS = [
  LineChartComponent,
  BarChartComponent
];

const DIRECTIVES = [
  G2LineChartDirective,
  G2BarChartDirective
];

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
    ...DIRECTIVES,
    PieChartComponent,
    LandscapeComponent,
    MainComponent,
    AreaChartComponent,
    SearchComponent,
    SelectPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    OverlayModule,
    NgZorroAntdMobileModule,
    PlaygroundModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
