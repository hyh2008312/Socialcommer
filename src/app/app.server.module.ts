// angular
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
// libs
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { TranslatesServerModule } from './shared-server/translates/translates-server';
// components
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

import {FlexLayoutServerModule} from '@angular/flex-layout/server';

@NgModule({
  imports: [
    AppModule,
    ServerTransferStateModule,
    ServerModule,
    ModuleMapLoaderModule,
    TranslatesServerModule,
    FlexLayoutServerModule
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppServerModule {
}
