import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component.ts';
import { StoreListComponent } from './store-list/store-list.component.ts';
import { StoreDetailComponent } from './store-detail/store-detail.component.ts';
import { StoreListDetailComponent } from './store-detail/store-list-detail.component.ts';
import { StoreItemCardComponent } from './store-item-card/store-item-card.component.ts';

import { StoreNavigationComponent } from  './store-navigation/store-navigation.component'

import { StoreTemplateThreeRoutingModule } from './store-template-3.routes.module.ts';
import { StoreService } from '../store.service.ts';

import { SharedModule } from '../../shared/shared.module.ts';

@NgModule({
  imports: [
    SharedModule,
    StoreTemplateThreeRoutingModule
  ],
  exports: [

  ],
  declarations: [
    MainPageComponent,
    StoreListComponent,
    StoreDetailComponent,
    StoreListDetailComponent,
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

