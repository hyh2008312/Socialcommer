import { NgModule } from '@angular/core';
import { ShopCartMainComponent } from './shop-cart-main/shop-cart-main.component';
import { ShopCartPayComponent } from './shop-cart-pay/shop-cart-pay.component';
import { ShopCartProductItemComponent } from './shop-cart-product-item/shop-cart-product-item.component';
import { ShopCartPayItemComponent } from './shop-cart-pay-item/shop-cart-pay-item.component';
import { ShopRequireDialogComponent } from './shop-require-dialog/shop-require-dialog.component';
import { ShopErrorDialogComponent } from './shop-error-dialog/shop-error-dialog.component';

import { ShopCartRoutingModule } from './shop-cart.routes.module';

import { ShopCartService } from './shop-cart.service';
import { CanActive } from './can-active.service';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ShopCartRoutingModule
  ],
  exports: [

  ],
  declarations: [
    ShopCartMainComponent,
    ShopCartPayComponent,
    ShopCartProductItemComponent,
    ShopCartPayItemComponent,
    ShopRequireDialogComponent,
    ShopErrorDialogComponent
  ],
  entryComponents: [
    ShopRequireDialogComponent,
    ShopErrorDialogComponent
  ],
  providers: [
    ShopCartService,
    CanActive
  ]
})
export class ShopCartModule { }

