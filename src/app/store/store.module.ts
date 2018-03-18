import { NgModule } from '@angular/core';

import { StoreMainComponent } from './store-main/store-main.component';

import { StoreRoutingModule } from './store.routes.module';
import { StoreService } from './store.service';
import { StoreResolverService } from './store-resolve.service';

import { SharedModule } from '../shared/shared.module';
import { StoreTemplateRouter } from '../config/app.constant';
import {StoreClosedDialogComponent} from "./store-closed/store-closed-dialog.component";

@NgModule({
  imports: [
    SharedModule,
    StoreRoutingModule
  ],
  exports: [

  ],
  declarations: [
    StoreMainComponent,
    StoreClosedDialogComponent
  ],
  entryComponents: [
    StoreClosedDialogComponent
  ],
  providers: [
    StoreService,
    StoreTemplateRouter,
    StoreResolverService
  ]
})
export class StoreModule { }

