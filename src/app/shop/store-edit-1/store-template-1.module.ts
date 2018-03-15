import { NgModule } from '@angular/core';

import { StoreEditComponent } from  './store-edit-1.component';
import { StoreItemCardPreviewComponent } from  './store-item-card-preview/store-item-card-preview.component';
import { StoreTemplateOneRoutingModule } from './store-template-1.routes.module';
import { StoreService } from '../store.service';

import { SharedModule } from '../../shared/shared.module';
import {StoreDetailComponent} from "./store-detail/store-detail.component";

@NgModule({
  imports: [
    SharedModule,
    StoreTemplateOneRoutingModule
  ],
  exports: [

  ],
  declarations: [
    StoreEditComponent,
    StoreItemCardPreviewComponent,
    StoreDetailComponent
  ],
  entryComponents: [
  ],
  providers: [
    StoreService
  ]
})
export class StoreTemplateOneModule { }

