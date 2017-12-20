import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {StoreTemplateTwoRoutingModule} from './store-template-4.routes.module';
import {StoreService} from '../store.service';

import {SharedModule} from '../../shared/shared.module';
import {StoreNavigationEditFourComponent} from './store-navigation/store-navigation.component';
import {StoreItemBlogCardEditFourComponent} from './store-item-blog-card/store-item-blog-card.component';
import {StoreItemProductCardEditFourComponent} from './store-item-products-card/store-item-product-card.component';
import {StoreFootEditFourComponent} from './store-foot/store-foot.component';
import {StoreCategoryEditFourComponent} from './store-category/store-category.component';
import {ShareTemplate4ButtonComponent} from './share-temlpate-4-button/share-template-4-button.component';

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
    StoreItemProductCardEditFourComponent,
    StoreFootEditFourComponent,
    StoreCategoryEditFourComponent,
    ShareTemplate4ButtonComponent
  ],
  entryComponents: [],
  providers: [
    StoreService
  ]
})
export class StoreTemplateFourModule {
}

