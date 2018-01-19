import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { StoreCartMainComponent } from './store-cart-main/store-cart-main.component';
import { StoreCartPayComponent } from './store-cart-pay/store-cart-pay.component';
import { CanActive } from './can-active.service';

const routes: Routes = [{
  path: '', component: StoreCartMainComponent
},{
  path: 'checkout', component: StoreCartPayComponent,
  canActivate: [ CanActive ]
}];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule],
  providers: [CanActive]
})
export class StoreCartRoutingModule{ }
