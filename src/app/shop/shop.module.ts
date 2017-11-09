import { NgModule } from '@angular/core';
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
import { StoreTemplateComponent } from "./store-template/store-template.component";
import { StoreEditComponent } from "./store-edit/store-edit.component";
import { StoreItemCardPreviewComponent } from "./store-item-card-preview/store-item-card-preview.component";
import { ToDoListComponent } from "./to-do-list/to-do-list.component";

import { LeftSideNavigationComponent } from "./left-side-navigation/left-side-navigation.component";
import { CatalogTimeSelectComponent } from "./catalog-time-select/catalog-time-select.component";
import { ProductItemComponent } from "./product-item/product-item.component";
import { ProductsSortComponent } from "./products-sort/products-sort.component";
import { ProductItemCardComponent } from "./product-item-card/product-item-card.component";
import { StoreShareDialogComponent } from "./store-share-dialog/store-share-dialog.component";
import { ProductAffiliateLinkDialogComponent } from "./product-affiliate-link-dialog/product-affiliate-link-dialog.component";
import { SnackBarSuccessComponent } from './snack-bar-success/snack-bar-success.component';
import { ProductTitleComponent } from './product-title/product-title.component';
import { StatisticItemComponent } from './statistic-item/statistic-item.component';

import { ShopRoutingModule } from './shop.routes.module';

import { ShopService } from './shop.service';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ShopRoutingModule
  ],
  exports: [],
  declarations: [
    ShopComponent,
    StoreComponent,
    CatalogComponent,
    DashboardComponent,
    ToDoListComponent,
    SettingsComponent,
    CatalogAddProductComponent,
    CatalogEditProductComponent,
    LeftSideNavigationComponent,
    ProductItemComponent,
    CatalogTimeSelectComponent,
    FindProductsComponent,
    ProductsSortComponent,
    ProductItemCardComponent,
    ProductTitleComponent,
    FindProductsAddProductComponent,
    FindProductsEditPreviewComponent,
    StorePreviewComponent,
    StoreTemplateComponent,
    StoreEditComponent,
    StoreItemCardPreviewComponent,
    StoreShareDialogComponent,
    ProductAffiliateLinkDialogComponent,
    SnackBarSuccessComponent,
    StatisticItemComponent
  ],
  entryComponents: [
    StoreShareDialogComponent,
    ProductAffiliateLinkDialogComponent,
    SnackBarSuccessComponent
  ],
  providers: [
    ShopService,
    AuthenticationService
  ]
})
export class ShopModule { }

