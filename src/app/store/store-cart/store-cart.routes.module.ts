import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { StoreCartMainComponent } from './store-cart-main/store-cart-main.component';
import { StoreCartPayComponent } from './store-cart-pay/store-cart-pay.component';

const routes: Routes = [{
  path: '', component: StoreCartMainComponent
},{
  path: 'checkout', component: StoreCartPayComponent
}];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class StoreCartRoutingModule{ }
