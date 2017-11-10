import { NgModule } from '@angular/core';

import { SignUpHeaderComponent } from "./sign-up-header/sign-up-header.component";

import { LoginRoutingModule } from './login.routes.module';
import { LoginService } from './login.service';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  exports: [],
  declarations: [
    SignUpHeaderComponent
  ],
  providers: [
    LoginService,
    AuthenticationService
  ]
})
export class LoginModule { }

