import { NgModule } from '@angular/core';
import { StoreCartMainComponent } from './store-cart-main/store-cart-main.component';
import { StoreCartPayComponent } from './store-cart-pay/store-cart-pay.component';
import { StoreCartHeaderComponent } from './store-cart-header/store-cart-header.component';
import { StoreCartFooterComponent } from './store-cart-footer/store-cart-footer.component';
import { StoreCartProductItemComponent } from './store-cart-product-item/store-cart-product-item.component';

import { StoreCartRoutingModule } from './store-cart.routes.module';

import { StoreCartService } from './store-cart.service';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StoreCartRoutingModule
  ],
  exports: [

  ],
  declarations: [
    StoreCartMainComponent,
    StoreCartPayComponent,
    StoreCartHeaderComponent,
    StoreCartFooterComponent,
    StoreCartProductItemComponent
  ],
  entryComponents: [
  ],
  providers: [
    StoreCartService
  ]
})
export class StoreCartModule { }

