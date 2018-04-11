import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {StoreListComponent} from './store-list/store-list.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {StoreCategoryComponent} from './store-category/store-category.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';
import {StoreItemCardComponent} from './store-item-card/store-item-card.component';
import {ProductsImageCoverComponent} from './products-image-cover/products-image-cover.component';
import {StoreBlogComponent} from './store-blog/store-blog.component';
import {StoreBlogDetailComponent} from './store-blog-detail/store-blog-detail.component';
import {StoreBlogCardComponent} from './store-blog-card/store-blog-card.component';

import {StoreNavigationComponent} from './store-navigation/store-navigation.component';
import {StoreFooterComponent} from './store-footer/store-footer.component';

import {StoreTemplateThreeRoutingModule} from './store-template-3.routes.module';

import {SharedModule} from '../../shared/shared.module';
import {AboutComponent} from "./about/about.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {FaqComponent} from "./faq/faq.component";
import {ReturnPolicyComponent} from "./return-policy/return-policy.component";
import {AddCartSuccessDialogComponent} from "./add-cart-success-dialog/add-cart-success-dialog.component";
import {StoreCountdownComponent} from "./store-countdown/store-countdown.component";
import {StoreFlashSaleComponent} from "./store-flash-sale/store-flash-sale.component";
import {StoreFlashSaleCardComponent} from "./store-flash-sale-card/store-flash-sale-card.component";

@NgModule({
  imports: [
    SharedModule,
    StoreTemplateThreeRoutingModule
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
    StoreFooterComponent,
    ProductsImageCoverComponent,
    StoreBlogCardComponent,
    StoreBlogComponent,
    StoreBlogDetailComponent,
    AboutComponent,
    PrivacyComponent,
    FaqComponent,
    ReturnPolicyComponent,
    AddCartSuccessDialogComponent,
    StoreCountdownComponent,
    StoreFlashSaleComponent,
    StoreFlashSaleCardComponent
  ],
  entryComponents: [
    AddCartSuccessDialogComponent
  ],
  providers: []
})
export class StoreTemplateThreeModule {
}

