import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { StoreComponent } from './store/store.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SettingsComponent } from "./settings/settings.component";
import { FindProductsComponent } from "./find-products/find-products.component";

const routes: Routes = [
  {
    path: ':id', component: ShopComponent,
    children: [{
      path: 'store', component: StoreComponent
    }, {
      path: 'dashboard', component: DashboardComponent
    }, {
      path: 'settings', component: SettingsComponent
    }, {
      path: 'catalog', component: CatalogComponent
    }, {
      path: 'products', component: FindProductsComponent
    }]
  }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ShopRoutingModule{ }
