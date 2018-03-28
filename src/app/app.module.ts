import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule,JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

import { CookieService } from 'ngx-cookie-service';
import { PrebootModule } from 'preboot';
import { AppRoutes } from './app.routes.module';

import { SharedModule } from './shared/shared.module';

// shared
import { SharedServerModule } from './shared-server/shared-server.module';

import { AppComponent } from './app.component';

import { BaseApi, SystemConstant, DataApi, SupportApi } from './config/app.api';

import { AuthenticationModule } from './shared/services/authentication/index';
import { UserModule } from './shared/services/user/user.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'socialcommer-shop' }),
    PrebootModule.withConfig({ appRoot: 'app-root' }),
    BrowserModule,
    AppRoutes,
    HttpModule,
    HttpClientModule,
    JsonpModule,
    AuthenticationModule,
    UserModule.forRoot(),
    Angulartics2Module.forRoot([ Angulartics2GoogleTagManager], {
      pageTracking: {
        autoTrackVirtualPages: true
      }
    }),
    SharedServerModule.forRoot(),
    SharedModule.forRoot()
  ],
  providers: [BaseApi, SystemConstant, DataApi, SupportApi, HttpClientModule, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
