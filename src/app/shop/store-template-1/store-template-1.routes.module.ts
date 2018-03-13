import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPageComponent} from './main-page/main-page.component';
import {StoreListComponent} from './store-list/store-list.component';
import {StoreListDetailComponent} from './store-detail/store-list-detail.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';
import {StoreCartMainComponent} from "./store-cart-main/store-cart-main.component";
import {OrderTrackingLoginComponent} from "./order-tracking-login/order-tracking-login.component";

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
  path: 'cart',
  component: StoreCartMainComponent
},{
  path:'order',
  component:OrderTrackingLoginComponent
}, {
    path: '',
    redirectTo: ''
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreTemplateOneRoutingModule {
}
