import { NgModule } from '@angular/core';
import { StoreCartMainComponent } from './store-cart-main/store-cart-main.component';
import { StoreCartPayComponent } from './store-cart-pay/store-cart-pay.component';
import { StoreCartHeaderComponent } from './store-cart-header/store-cart-header.component';
import { StoreCartFooterComponent } from './store-cart-footer/store-cart-footer.component';
import { StoreCartProductItemComponent } from './store-cart-product-item/store-cart-product-item.component';
import { StoreCartPayItemComponent } from './store-cart-pay-item/store-cart-pay-item.component';
import { StoreRequireDialogComponent } from './store-require-dialog/store-require-dialog.component';
import { StoreErrorDialogComponent } from './store-error-dialog/store-error-dialog.component';

import { StoreCartRoutingModule } from './store-cart.routes.module';

import { StoreCartService } from './store-cart.service';
import { CanActive } from './can-active.service';

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
    StoreCartProductItemComponent,
    StoreCartPayItemComponent,
    StoreRequireDialogComponent,
    StoreErrorDialogComponent
  ],
  entryComponents: [
    StoreRequireDialogComponent,
    StoreErrorDialogComponent
  ],
  providers: [
    StoreCartService,
    CanActive
  ]
})
export class StoreCartModule { }

