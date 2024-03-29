import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {StoreCategoryComponent} from './store-category/store-category.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';

import {StoreNavigationComponent} from './store-navigation/store-navigation.component'

import {StoreTemplateSixRoutingModule} from './store-template-6.routes.module';
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
import {AboutComponent} from "./about/about.component";
import {FaqComponent} from "./faq/faq.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {ReturnPolicyComponent} from "./return-policy/return-policy.component";
import {AddCartSuccessDialogComponent} from "./add-cart-success-dialog/add-cart-success-dialog.component";
import {StoreCountdownComponent} from "./store-countdown/store-countdown.component";
import {StoreFlashSaleComponent} from "./store-flash-sale/store-flash-sale.component";
import {StoreFlashSaleCardComponent} from "./store-flash-sale-card/store-flash-sale-card.component";

@NgModule({
  imports: [
    SharedModule,
    StoreTemplateSixRoutingModule
  ],
  exports: [],
  declarations: [
    MainPageComponent,
    HomePageComponent,
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
    AboutComponent,
    FaqComponent,
    PrivacyComponent,
    ReturnPolicyComponent,
    AddCartSuccessDialogComponent,
    StoreCountdownComponent,
    StoreFlashSaleComponent,
    StoreFlashSaleCardComponent
  ],
  entryComponents: [
    AddCartSuccessDialogComponent
  ],
  providers: [
  ]
})
export class StoreTemplateSixModule {
}

