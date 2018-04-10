import { NgModule } from '@angular/core';

import { StoreEditComponent } from  './store-edit-1.component';
import { StoreItemCardPreviewComponent } from  './store-item-card-preview/store-item-card-preview.component';
import { StoreTemplateOneRoutingModule } from './store-template-1.routes.module';
import { StoreService } from '../store.service';

import { SharedModule } from '../../shared/shared.module';
import {StoreDetailComponent} from "./store-detail/store-detail.component";
import {StoreCartComponent} from "./store-cart/store-cart.component";
import {StoreOrderComponent} from "./store-order/store-order.component";
import {StoreCountdownComponent} from "./store-countdown/store-countdown.component";

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
    StoreDetailComponent,
    StoreCartComponent,
    StoreOrderComponent,
    StoreCountdownComponent
  ],
  entryComponents: [
  ],
  providers: [
    StoreService
  ]
})
export class StoreTemplateOneModule { }

