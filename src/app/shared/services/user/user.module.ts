import { NgModule } from '@angular/core';

import { AuthenticationService } from '../authentication/authentication.service';
import { UserService } from './user.service';

@NgModule({
  providers: [
    AuthenticationService,
    UserService
  ]
})
export class UserModule {

}
