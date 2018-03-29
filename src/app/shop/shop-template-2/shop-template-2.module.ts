import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {StoreListComponent} from './store-list/store-list.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {StoreCategoryComponent} from './store-category/store-category.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';
import {StoreItemCardComponent} from './store-item-card/store-item-card.component';

import {StoreNavigationComponent} from './store-navigation/store-navigation.component'

import {ShopTemplateTwoRoutingModule} from './shop-template-2.routes.module';
import {StoreService} from '../store.service';

import {SharedModule} from '../../shared/shared.module';
import {StoreFootComponent} from './store-foot/store-foot.component';
import {StoreDetailPictureComponent} from './store-detail-picture/store-detail-picture.component';
import {StoreListDetailComponent} from './store-detail/store-list-detail.component';
import {StoreShareButtonComponent} from './store-share-button/store-share-button.component';
import {OrderTrackingLoginComponent} from "./order-tracking-login/order-tracking-login.component";
import {StoreCartFooterComponent} from "./store-cart-footer/store-cart-footer.component";
import {StoreCartHeaderComponent} from "./store-cart-header/store-cart-header.component";
import {StoreCartMainComponent} from "./store-cart-main/store-cart-main.component";

@NgModule({
  imports: [
    SharedModule,
    ShopTemplateTwoRoutingModule
  ],
  exports: [],
  declarations: [
    MainPageComponent,
    HomePageComponent,
    StoreListComponent,
    AboutMeComponent,
    StoreCategoryComponent,
    StoreDetailComponent,
    StoreItemCardComponent,
    StoreNavigationComponent,
    StoreFootComponent,
    StoreDetailPictureComponent,
    StoreListDetailComponent,
    StoreShareButtonComponent,
    OrderTrackingLoginComponent,
    StoreCartFooterComponent,
    StoreCartHeaderComponent,
    StoreCartMainComponent
  ],
  entryComponents: [],
  providers: [
    StoreService
  ]
})
export class ShopTemplateTwoModule {
}

