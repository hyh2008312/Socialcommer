import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPageComponent} from './main-page/main-page.component';
import {StoreListComponent} from './store-list/store-list.component';
import {StoreListDetailComponent} from './store-detail/store-list-detail.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';
import {AboutComponent} from "./About/about.component";
import {PrivacyComponent} from "./Privacy/privacy.component";
import {ReturnPolicyComponent} from "./Return-Policy/return-policy.component";
import {FaqComponent} from "./FAQ/faq.component";

const routes: Routes = [{
  path: '', component: MainPageComponent,
  children: [{
    path: 'detail/:id', component: StoreDetailComponent
  }]
}, {
  path: 'list', component: StoreListComponent,
  children: [{
    path: ':id', component: StoreListDetailComponent
  }]
}, {
  path: 'about', component: AboutComponent
}, {
  path: 'privacy', component: PrivacyComponent
}, {
  path: 'return', component: ReturnPolicyComponent
},{
  path:'faq',component:FaqComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreTemplateOneRoutingModule {
}
