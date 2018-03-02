import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {StoreListComponent} from './store-list/store-list.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';
import {StoreListDetailComponent} from './store-detail/store-list-detail.component';
import {StoreItemCardComponent} from './store-item-card/store-item-card.component';
import {StoreAvatarComponent} from './store-avatar/store-avatar.component';

import {StoreTemplateOneRoutingModule} from './store-template-1.routes.module';

import {SharedModule} from '../../shared/shared.module';
import {AboutComponent} from "./About/about.component";
import {PrivacyComponent} from "./Privacy/privacy.component";
import {ReturnPolicyComponent} from "./Return-Policy/return-policy.component";
import {FaqComponent} from "./FAQ/faq.component";
import {StoreNavigationComponent} from "./store-navigation/store-navigation.component";

@NgModule({
  imports: [
    SharedModule,
    StoreTemplateOneRoutingModule
  ],
  exports: [],
  declarations: [
    MainPageComponent,
    StoreListComponent,
    StoreDetailComponent,
    StoreListDetailComponent,
    StoreItemCardComponent,
    StoreAvatarComponent,
    AboutComponent,
    PrivacyComponent,
    ReturnPolicyComponent,
    FaqComponent,
    StoreNavigationComponent
  ],
  entryComponents: [],
  providers: []
})
export class StoreTemplateOneModule {
}

