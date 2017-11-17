import { NgModule } from '@angular/core';

import { StoreMainComponent } from './store-main/store-main.component';

import { StoreRoutingModule } from './store.routes.module';
import { StoreService } from './store.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StoreRoutingModule
  ],
  exports: [

  ],
  declarations: [
    StoreMainComponent
  ],
  entryComponents: [],
  providers: [
    StoreService
  ]
})
export class StoreModule { }

