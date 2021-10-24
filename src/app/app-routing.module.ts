import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandscapeComponent } from './landscape/landscape.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  {path: 'main', component: MainComponent},
  {path: 'landscape', component: LandscapeComponent},
  {path: 'playground', loadChildren: () => import('./playground/playground.module').then(m => m.PlaygroundModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
