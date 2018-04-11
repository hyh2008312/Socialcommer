import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {StoreListComponent} from './store-list/store-list.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {StoreCategoryComponent} from './store-category/store-category.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';
import {StoreItemCardComponent} from './store-item-card/store-item-card.component';

import {StoreNavigationComponent} from './store-navigation/store-navigation.component'

import {StoreTemplateTwoRoutingModule} from './store-template-2.routes.module';

import {SharedModule} from '../../shared/shared.module';
import {StoreFootComponent} from './store-foot/store-foot.component';
import {StoreDetailPictureComponent} from './store-detail-picture/store-detail-picture.component';
import {StoreListDetailComponent} from './store-detail/store-list-detail.component';
import {StoreShareButtonComponent} from './store-share-button/store-share-button.component';
import {AboutComponent} from "./about/about.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {ReturnPolicyComponent} from "./return-policy/return-policy.component";
import {FaqComponent} from './faq/faq.component';
import {AddCartSuccessDialogComponent} from "./add-cart-success-dialog/add-cart-success-dialog.component";
import {StoreFlashSaleComponent} from "./store-flash-sale/store-flash-sale.component";

@NgModule({
  imports: [
    SharedModule,
    StoreTemplateTwoRoutingModule
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
    AboutComponent,
    PrivacyComponent,
    ReturnPolicyComponent,
    FaqComponent,
    AddCartSuccessDialogComponent,
    StoreFlashSaleComponent
  ],
  entryComponents: [
    AddCartSuccessDialogComponent
  ],
  providers: []
})
export class StoreTemplateTwoModule {
}

