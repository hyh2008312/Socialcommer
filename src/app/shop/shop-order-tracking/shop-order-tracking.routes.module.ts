import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {OrderTrackingLoginComponent} from './order-tracking-login/order-tracking-login.component';
import {ViewYourOrderComponent} from './view-your-order/view-your-order.component';
import {ReturnProgressComponent} from './return-progress/return-progress.component';

import {CanActive} from './can-active.service';
import {StoreMessageMainComponent} from './store-message-main/store-message-main.component';

const routes: Routes = [{
  path: '', component: OrderTrackingLoginComponent
}, {
  path: 'detail/:id',
  component: ViewYourOrderComponent
}, {
  path: 'detail/:id/progress/:returnId',
  component: ReturnProgressComponent
},
  {
    path: 'detail/:id/message/:lineId',
    component: StoreMessageMainComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActive]
})
export class ShopOrderTrackingRoutingModule {
}
