import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ResetPasswordConfirmComponent} from "./reset-password-confirm/reset-password-confirm.component";
import { InviteCodeComponent } from "./invite-code/invite-code.component";
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
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,
    SignUpHeaderComponent,
    InviteCodeComponent
  ],
  providers: [
    LoginService,
    AuthenticationService
  ]
})
export class LoginModule { }

