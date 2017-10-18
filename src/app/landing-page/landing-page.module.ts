import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';

import { LandingPageRoutingModule } from './landing-page.routes.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    LandingPageRoutingModule
  ],
  exports: [

  ],
  declarations: [
    LandingPageComponent
  ],
  entryComponents: [],
  providers: []
})
export class LandingPageModule { }

