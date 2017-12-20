import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StoreMainComponent} from './store-main/store-main.component';
import {StoreCartMainComponent} from './store-cart/store-cart-main/store-cart-main.component';

const routes: Routes = [{
  path: ':name', component: StoreMainComponent,
  children: [
    {
      path: 'cart',
      loadChildren: 'app/store/store-cart/store-cart.module#StoreCartModule'
    },
    {
      path: '1',
      loadChildren: 'app/store/store-template-1/store-template-1.module#StoreTemplateOneModule'
    },
    {
      path: '2',
      loadChildren: 'app/store/store-template-2/store-template-2.module#StoreTemplateTwoModule'
    },
    {
      path: '3',
      loadChildren: 'app/store/store-template-3/store-template-3.module#StoreTemplateThreeModule'
    },
    {
      path: '4',
      loadChildren: 'app/store/store-template-4/store-template-4.module#StoreTemplateFourModule'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {
}
