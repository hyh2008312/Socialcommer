import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule,JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';


import { AppRoutingModule } from './app.routes.module';

import { AppComponent } from './app.component';

import { BaseApi, SystemConstant, DataApi, SupportApi } from './config/app.api';
import { BlogCover} from './config/app.constant';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AuthenticationModule } from './shared/services/authentication/index';
import { UserModule } from './shared/services/user/user.module';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'socialcommer-shop' }),
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    JsonpModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    UserModule,
    Angulartics2Module.forRoot([ Angulartics2GoogleTagManager], {
      pageTracking: {
        autoTrackVirtualPages: true
      }
    })
  ],
  providers: [BaseApi, SystemConstant, DataApi, SupportApi, BlogCover, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
