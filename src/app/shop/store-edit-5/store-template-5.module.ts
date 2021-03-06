import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {StoreCategoryComponent} from './store-category/store-category.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';

import {StoreNavigationComponent} from './store-navigation/store-navigation.component'

import {StoreTemplateFiveRoutingModule} from './store-template-5.routes.module';
import {StoreService} from '../store.service';

import {SharedModule} from '../../shared/shared.module';
import {StoreDetailPictureComponent} from './store-detail-picture/store-detail-picture.component';
import {StoreShareButtonComponent} from './store-share-button/store-share-button.component';
import {StoreBlogComponent} from './store-blog/store-blog.component';
import {StoreItemProductCardComponent} from './store-item-products-card/store-item-product-card.component';
import {StoreItemBlogCardComponent} from './store-item-blog-card/store-item-blog-card.component';
import {ShareTemplate5ButtonComponent} from './share-temlpate-5-button/share-template-5-button.component';
import {StoreCategoryCardComponent} from './store-category-card/store-category-card.component';
import {StoreListComponent} from './store-list/store-list.component';
import {StoreItemBlogCardTwoComponent} from './store-item-blog-card-two/store-item-blog-card-two.component';
import {StoreCartComponent} from "./store-cart/store-cart.component";
import {StoreOrderComponent} from "./store-order/store-order.component";
import {StoreFlashSaleCardComponent} from "./store-flash-sale-card/store-flash-sale-card.component";
import {StoreCountdownComponent} from "./store-countdown/store-countdown.component";

@NgModule({
  imports: [
    SharedModule,
    StoreTemplateFiveRoutingModule
  ],
  exports: [],
  declarations: [
    MainPageComponent,
    StoreCategoryCardComponent,
    StoreCategoryComponent,
    StoreDetailComponent,
    StoreNavigationComponent,
    StoreDetailPictureComponent,
    StoreShareButtonComponent,
    StoreBlogComponent,
    StoreItemProductCardComponent,
    StoreItemBlogCardComponent,
    ShareTemplate5ButtonComponent,
    StoreListComponent,
    StoreItemBlogCardTwoComponent,
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
export class StoreTemplateFiveModule {
}

