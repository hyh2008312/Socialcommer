import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPageComponent} from './main-page/main-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {StoreListComponent} from './store-list/store-list.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';
import {StoreListDetailComponent} from './store-detail/store-list-detail.component';
import {AboutComponent} from "./about/about.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {ReturnPolicyComponent} from "./return-policy/return-policy.component";
import {FaqComponent} from './faq/faq.component';
import {StoreFlashSaleComponent} from "./store-flash-sale/store-flash-sale.component";

const routes: Routes = [{
  path: '', component: MainPageComponent,
  children: [{
    path: '', component: HomePageComponent,
    children: [{
      path: 'detail/:id', component: StoreDetailComponent
    }]
  }, {
    path: 'list', component: StoreListComponent,
    children: [{
      path: ':id', component: StoreListDetailComponent
    }]
  }, {
    path: 'about_me', component: AboutMeComponent
  }, {
    path: 'about', component: AboutComponent
  }, {
    path: 'privacy', component: PrivacyComponent
  }, {
    path: 'return', component: ReturnPolicyComponent
  }, {
    path: 'faq', component: FaqComponent
  }, {
    path: 'flashsale', component: StoreFlashSaleComponent
  }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreTemplateTwoRoutingModule {
}
