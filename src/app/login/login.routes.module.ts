import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent} from "./reset-password/reset-password.component";
import { ResetPasswordConfirmComponent} from "./reset-password-confirm/reset-password-confirm.component";
import { InviteCodeComponent } from "./invite-code/invite-code.component";

const routes: Routes = [
  { path: '', redirectTo: '/cp/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'invitation', component: InviteCodeComponent },
  {  path: 'resetPassword/confirm/:uid/:token', component: ResetPasswordConfirmComponent  }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class LoginRoutingModule{ }
