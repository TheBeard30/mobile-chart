import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { registerComponentController } from '@antv/g2';
import Gestrue from '@antv/g2/lib/chart/controller/gesture';

if (environment.production) {
  enableProdMode();
}



registerComponentController('gesture', Gestrue);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
