import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { StoreComponent } from './store/store.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SettingsComponent } from "./settings/settings.component";
import { FindProductsComponent } from "./find-products/find-products.component";
import { CatalogAddProductComponent } from "./catalog-add-product/catalog-add-product.component";
import { FindProductsAddProductComponent } from "./find-products-add-product/find-products-add-product.component";

const routes: Routes = [
  {
    path: '', component: ShopComponent,
    children: [
      {
        path: 'store', component: StoreComponent
      }, {
        path: 'dashboard', component: DashboardComponent
      }, {
        path: 'settings', component: SettingsComponent
      }, {
        path: 'listings', component: CatalogComponent,
        children: [{
            path: 'create', component: CatalogAddProductComponent
        }]
      }, {
        path: 'products', component: FindProductsComponent,
        children: [{
          path: ':id', component: FindProductsAddProductComponent
        }]
      }, {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }, {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ShopRoutingModule{ }
