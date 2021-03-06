import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { StoreListDetailComponent } from './store-detail/store-list-detail.component';
import { StoreItemCardComponent } from './store-item-card/store-item-card.component';
import { StoreAvatarComponent } from './store-avatar/store-avatar.component';

import { ShopTemplateOneRoutingModule } from './shop-template-1.routes.module';

import { SharedModule } from '../../shared/shared.module';
import {StoreCartFooterComponent} from "./store-cart-footer/store-cart-footer.component";
import {StoreCartHeaderComponent} from "./store-cart-header/store-cart-header.component";
import {StoreCartMainComponent} from "./store-cart-main/store-cart-main.component";
import {OrderTrackingLoginComponent} from "./order-tracking-login/order-tracking-login.component";
import {StoreNavigationComponent} from "./store-navigation/store-navigation.component";
import {StoreCategoryComponent} from "./store-category/store-category.component";

@NgModule({
  imports: [
    SharedModule,
    ShopTemplateOneRoutingModule
  ],
  exports: [

  ],
  declarations: [
    MainPageComponent,
    StoreListComponent,
    StoreDetailComponent,
    StoreListDetailComponent,
    StoreItemCardComponent,
    StoreAvatarComponent,
    StoreCartFooterComponent,
    StoreCartHeaderComponent,
    StoreCartMainComponent,
    OrderTrackingLoginComponent,
    StoreNavigationComponent,
    StoreCategoryComponent
  ],
  entryComponents: [
  ],
  providers: []
})
export class ShopTemplateOneModule { }

