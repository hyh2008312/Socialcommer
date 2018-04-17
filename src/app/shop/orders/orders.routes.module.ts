import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {OrdersMainComponent} from './orders-main/orders-main.component';

const routes: Routes = [
  {
    path: '', component: OrdersMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
