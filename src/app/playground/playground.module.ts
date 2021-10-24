import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from './playground.component';


@NgModule({
  declarations: [
    PlaygroundComponent
  ],
  imports: [
    CommonModule,
    PlaygroundRoutingModule
  ],
  exports: [
    PlaygroundComponent
  ]
})
export class PlaygroundModule { }
