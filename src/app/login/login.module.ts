import { NgModule } from '@angular/core';

import { SignUpHeaderComponent } from "./sign-up-header/sign-up-header.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ResetPasswordSuccessDialogComponent } from "./rest-password-success-dialog/rest-password-success-dialog.component";

import { LoginRoutingModule } from './login.routes.module';
import { LoginService } from './login.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  exports: [],
  declarations: [
    SignUpHeaderComponent,
    LoginComponent,
    SignUpComponent,
    ResetPasswordSuccessDialogComponent
  ],
  providers: [
    LoginService
  ],
  entryComponents: [
    ResetPasswordSuccessDialogComponent
  ]
})
export class LoginModule { }

