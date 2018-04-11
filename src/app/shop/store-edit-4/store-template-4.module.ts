import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {StoreTemplateTwoRoutingModule} from './store-template-4.routes.module';
import {StoreService} from '../store.service';

import {SharedModule} from '../../shared/shared.module';
import {StoreNavigationEditFourComponent} from './store-navigation/store-navigation.component';
import {StoreItemBlogCardEditFourComponent} from './store-item-blog-card/store-item-blog-card.component';
import {StoreFootEditFourComponent} from './store-foot/store-foot.component';
import {StoreCategoryEditFourComponent} from './store-category/store-category.component';
import {ShareTemplate4ButtonComponent} from './share-temlpate-4-button/share-template-4-button.component';
import {StoreDetailComponent} from "./store-detail/store-detail.component";
import {StoreDetailPictureComponent} from "./store-detail-picture/store-detail-picture.component";
import {StoreItemProductCardComponent} from "./store-item-products-card/store-item-product-card.component";
import {StoreCartComponent} from "./store-cart/store-cart.component";
import {StoreOrderComponent} from "./store-order/store-order.component";
import {StoreFlashSaleCardComponent} from "./store-flash-sale-card/store-flash-sale-card.component";
import {StoreCountdownComponent} from "./store-countdown/store-countdown.component";

@NgModule({
  imports: [
    SharedModule,
    StoreTemplateTwoRoutingModule
  ],
  exports: [],
  declarations: [
    MainPageComponent,
    StoreNavigationEditFourComponent,
    StoreItemBlogCardEditFourComponent,
    StoreFootEditFourComponent,
    StoreCategoryEditFourComponent,
    ShareTemplate4ButtonComponent,
    StoreDetailComponent,
    StoreDetailPictureComponent,
    StoreItemProductCardComponent,
    StoreCartComponent,
    StoreOrderComponent,
    StoreFlashSaleCardComponent,
    StoreCountdownComponent


  ],
  entryComponents: [],
  providers: [
    StoreService
  ]
})
export class StoreTemplateFourModule {
}

