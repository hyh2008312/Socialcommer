import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { OrderTrackingLoginComponent } from './order-tracking-login/order-tracking-login.component';
import { ViewYourOrderComponent } from './view-your-order/view-your-order.component';
import { ReturnProgressComponent } from './return-progress/return-progress.component';

import { CanActive } from './can-active.service';

const routes: Routes = [{
  path: '', component: OrderTrackingLoginComponent
}, {
  path: 'detail',
  component: ViewYourOrderComponent,
  canActivate: [ CanActive ]
}, {
  path: 'progress/:id', component: ReturnProgressComponent
}];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule],
  providers: [CanActive]
})
export class OrderTrackingRoutingModule{ }
