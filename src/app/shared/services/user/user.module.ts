import {ModuleWithProviders, NgModule} from '@angular/core';

import { AuthenticationService } from '../authentication/authentication.service';
import { UserService } from './user.service';

import { User } from './user';
import {SharedServerModule} from '../../../shared-server/shared-server.module';

@NgModule({
  providers: [
    AuthenticationService,
    UserService,
    User
  ]
})
export class UserModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: UserModule };
  }
}
