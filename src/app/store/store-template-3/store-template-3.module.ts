import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StoreListComponent } from './store-list/store-list.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { StoreCategoryComponent } from './store-category/store-category.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { StoreItemCardComponent } from './store-item-card/store-item-card.component';

import { StoreNavigationComponent } from  './store-navigation/store-navigation.component'

import { StoreTemplateThreeRoutingModule } from './store-template-3.routes.module';
import { StoreService } from '../store.service';

import { SharedModule } from '../../shared/shared.module';

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
    StoreNavigationComponent
  ],
  entryComponents: [
  ],
  providers: [
    StoreService
  ]
})
export class StoreTemplateThreeModule { }

