import { NgModule } from '@angular/core';

import { OrdersMainComponent } from "./orders-main/orders-main.component";
import { OrdersTitleComponent } from "./orders-title/orders-title.component";
import { OrdersItemComponent } from "./orders-item/orders-item.component";


import { OrdersRoutingModule } from './orders.routes.module';

import { OrdersService } from './orders.service';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    OrdersRoutingModule
  ],
  exports: [],
  declarations: [
    OrdersMainComponent,
    OrdersTitleComponent,
    OrdersItemComponent
  ],
  providers: [
    OrdersService
  ]
})
export class OrdersModule { }

