import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StoreListComponent } from './store-list/store-list.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { StoreCategoryComponent } from './store-category/store-category.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { StoreItemCardComponent } from './store-item-card/store-item-card.component';
import { ProductsImageCoverComponent } from './products-image-cover/products-image-cover.component';
import { StoreBlogComponent } from './store-blog/store-blog.component';
import { StoreBlogDetailComponent } from './store-blog-detail/store-blog-detail.component';
import { StoreBlogCardComponent } from './store-blog-card/store-blog-card.component';

import { StoreNavigationComponent } from  './store-navigation/store-navigation.component';
import { StoreFooterComponent } from './store-footer/store-footer.component';

import { StoreTemplateThreeRoutingModule } from './store-template-3.routes.module';
import { StoreService } from '../store.service';

import { SharedModule } from '../../shared/shared.module';
import {OrderTrackingLoginComponent} from "./order-tracking-login/order-tracking-login.component";
import {StoreCartFooterComponent} from "./store-cart-footer/store-cart-footer.component";
import {StoreCartHeaderComponent} from "./store-cart-header/store-cart-header.component";
import {StoreCartMainComponent} from "./store-cart-main/store-cart-main.component";

@NgModule({
  imports: [
    SharedModule,
    StoreTemplateThreeRoutingModule
  ],
  exports: [

  ],
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
    OrderTrackingLoginComponent,
    StoreCartFooterComponent,
    StoreCartHeaderComponent,
    StoreCartMainComponent
  ],
  entryComponents: [
  ],
  providers: [
    StoreService
  ]
})
export class StoreTemplateThreeModule { }

