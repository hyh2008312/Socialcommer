import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CatalogComponent} from './catalog/catalog.component';
import {CatalogAddProductComponent} from "./catalog-add-product/catalog-add-product.component";
import {CatalogEditProductComponent} from "./catalog-edit-product/catalog-edit-product.component";
import {ProductCategoryComponent} from "./product-category/product-category.component";

import {FindProductsComponent} from "./find-products/find-products.component";
import {FindSupplierProductsComponent} from "./find-supplier-products/find-supplier-products.component";
import {FindProductsAddProductComponent} from "./find-products-add-product/find-products-add-product.component";
import {FindProductsEditPreviewComponent} from "./find-products-edit-preview/find-products-edit-preview.component";

import {FindProductsShareComponent} from "./find-products-share/find-products-share.component";
import {ProductToCartComponent} from "./product-to-cart/product-to-cart.component";

const routes: Routes = [
  {
    path: 'products', component: CatalogComponent,
    children: [{
      path: 'create', component: CatalogAddProductComponent
    }, {
      path: ':id/edit', component: CatalogEditProductComponent
    }, {
      path: ':id', component: FindProductsAddProductComponent
    }]
  }, {
    path: 'categories', component: ProductCategoryComponent
  }, {
    path: 'items', component: FindProductsComponent,
    children: [{
      path: ':id', component: FindProductsAddProductComponent
    }, {
      path: ':id/preview', component: FindProductsEditPreviewComponent,
    }, {
      path: ':id/share', component: FindProductsShareComponent,
    }, {
      path: ':id/add_cart', component: ProductToCartComponent
    }]
  }, {
    path: 'items/supplier/:supplierId', component: FindSupplierProductsComponent,
    children: [{
      path: ':id', component: FindProductsAddProductComponent
    }, {
      path: ':id/preview', component: FindProductsEditPreviewComponent,
    }, {
      path: ':id/share', component: FindProductsShareComponent,
    }, {
      path: ':id/add_cart', component: ProductToCartComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingsRoutingModule {
}
