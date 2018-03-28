import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { StoreCategoryComponent } from './store-category/store-category.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { StoreItemCardComponent } from './store-item-card/store-item-card.component';
import { ProductsImageCoverComponent } from './products-image-cover/products-image-cover.component';
import { StoreBlogDetailComponent } from './store-blog-detail/store-blog-detail.component';
import { StoreBlogCardComponent } from './store-blog-card/store-blog-card.component';

import { StoreNavigationComponent } from  './store-navigation/store-navigation.component';
import { StoreFooterComponent } from './store-footer/store-footer.component';

import { StoreTemplateThreeRoutingModule } from './store-template-3.routes.module';
import { StoreService } from '../store.service';

import { SharedModule } from '../../shared/shared.module';
import {StoreCartComponent} from "./store-cart/store-cart.component";
import {StoreOrderComponent} from "./store-order/store-order.component";

@NgModule({
  imports: [
    SharedModule,
    StoreTemplateThreeRoutingModule
  ],
  exports: [

  ],
  declarations: [
    MainPageComponent,
    StoreCategoryComponent,
    StoreDetailComponent,
    StoreItemCardComponent,
    StoreNavigationComponent,
    StoreFooterComponent,
    ProductsImageCoverComponent,
    StoreBlogCardComponent,
    StoreBlogDetailComponent,
    StoreCartComponent,
    StoreOrderComponent
  ],
  entryComponents: [
  ],
  providers: [
    StoreService
  ]
})
export class StoreTemplateThreeModule { }

