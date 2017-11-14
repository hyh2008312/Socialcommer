import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { StoreComponent } from './store/store.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SettingsComponent } from "./settings/settings.component";
import { FindProductsComponent } from "./find-products/find-products.component";
import { CatalogAddProductComponent } from "./catalog-add-product/catalog-add-product.component";
import { CatalogEditProductComponent } from "./catalog-edit-product/catalog-edit-product.component";
import { FindProductsAddProductComponent } from "./find-products-add-product/find-products-add-product.component";
import { FindProductsEditPreviewComponent } from "./find-products-edit-preview/find-products-edit-preview.component";
import { StorePreviewComponent } from "./store-preview/store-preview.component";
import { StoreEditComponent } from "./store-edit/store-edit.component";
import { ToDoListComponent } from "./to-do-list/to-do-list.component";
import { ProductCategoryComponent } from "./product-category/product-category.component";

const routes: Routes = [
  {
    path: '', component: ShopComponent,
    children: [
      {
        path: 'store', component: StoreComponent,
        children: [{
          path: 'preview', component: StorePreviewComponent,
        }, {
          path: 'edit', component: StoreEditComponent
        }]
      }, {
        path: 'dashboard', component: DashboardComponent
      }, {
        path: 'settings', component: SettingsComponent
      }, {
        path: 'listings',
        children: [{
          path: 'products', component: CatalogComponent,
          children: [ {
            path: 'create', component: CatalogAddProductComponent
          }, {
            path: ':id/edit', component: CatalogEditProductComponent
          }]
        }, {
          path: 'categories', component: ProductCategoryComponent
        }]
      }, {
        path: 'products', component: FindProductsComponent,
        children: [{
          path: ':id', component: FindProductsAddProductComponent
        }, {
          path: ':id/preview', component: FindProductsEditPreviewComponent
        }]
      }, {
        path: 'toDoList', component: ToDoListComponent
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
