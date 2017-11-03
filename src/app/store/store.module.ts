import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { StoreListDetailComponent } from './store-detail/store-list-detail.component';
import { StoreItemCardComponent } from './store-item-card/store-item-card.component';

import { StoreRoutingModule } from './store.routes.module';
import { StoreService } from './store.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StoreRoutingModule
  ],
  exports: [

  ],
  declarations: [
    MainPageComponent,
    StoreListComponent,
    StoreDetailComponent,
    StoreListDetailComponent,
    StoreItemCardComponent
  ],
  entryComponents: [
  ],
  providers: [
    StoreService
  ]
})
export class StoreModule { }

