import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { StoreListDetailComponent } from './store-detail/store-list-detail.component';
import { StoreItemCardComponent } from './store-item-card/store-item-card.component';
import { StoreAvatarComponent } from './store-avatar/store-avatar.component';

import { StoreTemplateOneRoutingModule } from './store-template-1.routes.module';
import { StoreService } from '../store.service';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StoreTemplateOneRoutingModule
  ],
  exports: [

  ],
  declarations: [
    MainPageComponent,
    StoreListComponent,
    StoreDetailComponent,
    StoreListDetailComponent,
    StoreItemCardComponent,
    StoreAvatarComponent
  ],
  entryComponents: [
  ],
  providers: [
    StoreService
  ]
})
export class StoreTemplateOneModule { }

