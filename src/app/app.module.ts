import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule,JsonpModule } from '@angular/http';

import { AppRoutingModule } from './app.routes.module';

import { AppComponent } from './app.component';

import {BaseApi, SystemConstant, DataApi} from './config/app.api';
import {BlogCover} from './config/app.constant';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    JsonpModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    UserModule
  ],
  providers: [BaseApi, SystemConstant, DataApi, BlogCover],
  bootstrap: [AppComponent]
})
export class AppModule { }
