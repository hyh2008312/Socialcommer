import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StoreMainComponent} from './store-main/store-main.component';

const routes: Routes = [{
  path: ':name', component: StoreMainComponent,
  children: [
    {
      path: 'cart',
      loadChildren: './store-cart/store-cart.module#StoreCartModule'
    },
    {
      path: 'order',
      loadChildren: './order-tracking/order-tracking.module#OrderTrackingModule'
    },
    {
      path: '1',
      loadChildren: './store-template-1/store-template-1.module#StoreTemplateOneModule'
    },
    {
      path: '2',
      loadChildren: './store-template-2/store-template-2.module#StoreTemplateTwoModule'
    },
    {
      path: '3',
      loadChildren: './store-template-3/store-template-3.module#StoreTemplateThreeModule'
    },
    {
      path: '4',
      loadChildren: './store-template-4/store-template-4.module#StoreTemplateFourModule'
    },
    {
      path: '5',
      loadChildren: './store-template-5/store-template-5.module#StoreTemplateFiveModule'
    },
    {
      path: '6',
      loadChildren: './store-template-6/store-template-6.module#StoreTemplateSixModule'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {
}
