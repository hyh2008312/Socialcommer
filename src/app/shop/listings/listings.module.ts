import { NgModule } from '@angular/core';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogAddProductComponent } from "./catalog-add-product/catalog-add-product.component";
import { CatalogEditProductComponent } from "./catalog-edit-product/catalog-edit-product.component";
import { ProductCategoryComponent } from "./product-category/product-category.component";

import { ProductItemComponent } from "./product-item/product-item.component";
import { ProductsSortComponent } from "./products-sort/products-sort.component";
import { ProductItemCardComponent } from "./product-item-card/product-item-card.component";
import { ProductTitleComponent } from './product-title/product-title.component';
import { CategoryItemComponent } from './category-item/category-item.component';
import { CategoryTitleComponent } from './category-title/category-title.component';

import { CategoryCreateDialogComponent } from "./category-create-dialog/category-create-dialog.component";
import { CategoryDeleteDialogComponent } from "./category-delete-dialog/category-delete-dialog.component";
import { CategoryEditDialogComponent } from "./category-edit-dialog/category-edit-dialog.component";
import { ProductShareDialogComponent } from "./product-share-dialog/product-share-dialog.component";

import { FindProductsComponent } from "./find-products/find-products.component";
import { FindSupplierProductsComponent } from "./find-supplier-products/find-supplier-products.component";
import { FindProductsAddProductComponent } from "./find-products-add-product/find-products-add-product.component";
import { FindProductsEditPreviewComponent } from "./find-products-edit-preview/find-products-edit-preview.component";
import { FindProductCategoryComponent } from './find-product-category/find-product-category.component';

import { SnackItemBarSuccessComponent } from './snack-item-bar-success/snack-item-bar-success.component';

import { ListingsRoutingModule } from './listings.routes.module';

import { ShopService } from './shop.service';
import { StoreService } from './store.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    ListingsRoutingModule
  ],
  exports: [],
  declarations: [
    CatalogComponent,
    CatalogAddProductComponent,
    CatalogEditProductComponent,
    ProductCategoryComponent,
    ProductItemComponent,
    FindProductsComponent,
    ProductsSortComponent,
    ProductItemCardComponent,
    ProductTitleComponent,
    FindProductsAddProductComponent,
    FindProductsEditPreviewComponent,
    CategoryItemComponent,
    CategoryTitleComponent,
    CategoryCreateDialogComponent,
    CategoryDeleteDialogComponent,
    CategoryEditDialogComponent,
    FindProductCategoryComponent,
    FindSupplierProductsComponent,
    ProductShareDialogComponent,
    SnackItemBarSuccessComponent
  ],
  entryComponents: [
    CategoryCreateDialogComponent,
    CategoryDeleteDialogComponent,
    CategoryEditDialogComponent,
    SnackItemBarSuccessComponent,
    ProductShareDialogComponent
  ],
  providers: [
    ShopService,
    StoreService,
    AuthenticationService
  ]
})
export class ListingsModule { }

