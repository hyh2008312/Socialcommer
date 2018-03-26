import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule,JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

import { CookieService } from 'ngx-cookie-service';
import { PrebootModule } from 'preboot';
import { AppRoutes } from './app.routes.module';

import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule }    from '@angular/flex-layout';

// shared
import { SharedServerModule } from './shared-server/shared-server.module';

import { AppComponent } from './app.component';

import { BaseApi, SystemConstant, DataApi, SupportApi } from './config/app.api';
import { BlogCover} from './config/app.constant';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    BrowserAnimationsModule,
    AuthenticationModule,
    UserModule,
    Angulartics2Module.forRoot([ Angulartics2GoogleTagManager], {
      pageTracking: {
        autoTrackVirtualPages: true
      }
    }),
    SharedServerModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule
  ],
  providers: [BaseApi, SystemConstant, DataApi, SupportApi, BlogCover, HttpClientModule, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
