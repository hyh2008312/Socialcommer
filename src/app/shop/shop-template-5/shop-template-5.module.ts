import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {StoreCategoryComponent} from './store-category/store-category.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';

import {StoreNavigationComponent} from './store-navigation/store-navigation.component'

import {ShopTemplateFiveRoutingModule} from './shop-template-5.routes.module';
import {StoreService} from '../store.service';

import {SharedModule} from '../../shared/shared.module';
import {StoreFootComponent} from './store-foot/store-foot.component';
import {StoreDetailPictureComponent} from './store-detail-picture/store-detail-picture.component';
import {StoreShareButtonComponent} from './store-share-button/store-share-button.component';
import {StoreBlogComponent} from './store-blog/store-blog.component';
import {StoreItemProductCardComponent} from './store-item-products-card/store-item-product-card.component';
import {StoreItemBlogCardComponent} from './store-item-blog-card/store-item-blog-card.component';
import {ShareTemplate5ButtonComponent} from './share-temlpate-5-button/share-template-5-button.component';
import {StoreBlogDetailComponent} from './store-blog-detail/store-blog-detail.component';
import {StoreCategoryCardComponent} from './store-category-card/store-category-card.component';
import {StoreListComponent} from './store-list/store-list.component';
import {StoreItemBlogCardTwoComponent} from './store-item-blog-card-two/store-item-blog-card-two.component';
import {OrderTrackingLoginComponent} from "./order-tracking-login/order-tracking-login.component";
import {StoreCartFooterComponent} from "./store-cart-footer/store-cart-footer.component";
import {StoreCartHeaderComponent} from "./store-cart-header/store-cart-header.component";
import {StoreCartMainComponent} from "./store-cart-main/store-cart-main.component";

@NgModule({
  imports: [
    SharedModule,
    ShopTemplateFiveRoutingModule
  ],
  exports: [],
  declarations: [
    MainPageComponent,
    HomePageComponent,
    AboutMeComponent,
    StoreCategoryCardComponent,
    StoreCategoryComponent,
    StoreDetailComponent,
    StoreNavigationComponent,
    StoreFootComponent,
    StoreDetailPictureComponent,
    StoreShareButtonComponent,
    StoreBlogComponent,
    StoreItemProductCardComponent,
    StoreItemBlogCardComponent,
    ShareTemplate5ButtonComponent,
    StoreBlogDetailComponent,
    StoreListComponent,
    StoreItemBlogCardTwoComponent,
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
export class ShopTemplateFiveModule {
}

