import { NgModule } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule,JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';


import { AppRoutingModule } from './app.routes.module';

import { AppComponent } from './app.component';

import { BaseApi, SystemConstant, DataApi } from './config/app.api';
import { BlogCover} from './config/app.constant';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AuthenticationModule } from './shared/services/authentication/index';
import { UserModule } from './shared/services/user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    JsonpModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    UserModule,
    Angulartics2Module.forRoot([ Angulartics2GoogleTagManager ], {
      pageTracking: {
        excludedRoutes: [/\/[0-9]{4}\/[0-9]{2}\/[a-zA-Z0-9|\-]*/]
      }
    })
  ],
  providers: [BaseApi, SystemConstant, DataApi, BlogCover,HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
