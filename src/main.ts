import './polyfills.ts';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

  (<any>window).console.warn = function() {};
  (<any>window).console.info = function() {};

}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
