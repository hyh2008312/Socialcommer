import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { StoreCartMainComponent } from './store-cart-main/store-cart-main.component';

const routes: Routes = [{
  path: '', component: StoreCartMainComponent
}];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class StoreCartRoutingModule{ }
