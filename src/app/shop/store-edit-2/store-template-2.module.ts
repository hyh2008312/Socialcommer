import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {StoreListComponent} from './store-list/store-list.component';
import {StoreCategoryComponent} from './store-category/store-category.component';
import {StoreItemCardComponent} from './store-item-card/store-item-card.component';

import {StoreNavigationComponent} from './store-navigation/store-navigation.component'

import {StoreTemplateTwoRoutingModule} from './store-template-2.routes.module';
import {StoreService} from '../store.service';

import {SharedModule} from '../../shared/shared.module';
import {StoreFootComponent} from './store-foot/store-foot.component';
import {StoreDetailPictureComponent} from './store-detail-picture/store-detail-picture.component';
import {StoreShareButtonComponent} from './store-share-button/store-share-button.component';
import {StoreDetailComponent} from "./store-detail/store-detail.component";

@NgModule({
  imports: [
    SharedModule,
    StoreTemplateTwoRoutingModule
  ],
  exports: [],
  declarations: [
    MainPageComponent,
    StoreListComponent,
    StoreCategoryComponent,
    StoreItemCardComponent,
    StoreNavigationComponent,
    StoreFootComponent,
    StoreShareButtonComponent,
    StoreDetailComponent,
    StoreDetailPictureComponent
  ],
  entryComponents: [],
  providers: [
    StoreService
  ]
})
export class StoreTemplateTwoModule {
}

