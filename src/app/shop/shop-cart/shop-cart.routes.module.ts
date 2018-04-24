import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { ShopCartMainComponent } from './shop-cart-main/shop-cart-main.component';
import { ShopCartPayComponent } from './shop-cart-pay/shop-cart-pay.component';
import { CanActive } from './can-active.service';

const routes: Routes = [{
  path: '', component: ShopCartMainComponent
},{
  path: 'checkout/:id', component: ShopCartPayComponent,
  canActivate: [ CanActive ]
}];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule],
  providers: [CanActive]
})
export class ShopCartRoutingModule{ }
