import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent} from "./reset-password/reset-password.component";
import { ResetPasswordConfirmComponent} from "./reset-password-confirm/reset-password-confirm.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'resetPassword/confirm/:uid/:token', component: ResetPasswordConfirmComponent  }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class LoginRoutingModule{ }
