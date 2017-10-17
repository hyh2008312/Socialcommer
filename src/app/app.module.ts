import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routes.module';

import { AppComponent } from './app.component';

import {BaseApi} from './config/app.api';
import {SystemConstant, BlogCover} from './config/app.constant';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AuthenticationModule } from './shared/services/authentication/index';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    AuthenticationModule
  ],
  providers: [BaseApi,SystemConstant, BlogCover],
  bootstrap: [AppComponent]
})
export class AppModule { }
