import { NgModule } from '@angular/core';
import { ShopComponent } from './shop/shop.component';
import { StoreComponent } from './store/store.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SettingsComponent } from "./settings/settings.component";
import { FindProductsComponent, FindProductsDialog } from "./find-products/find-products.component";
import { CatalogAddProductComponent } from "./catalog-add-product/catalog-add-product.component";

import { LeftSideNavigationComponent } from "./left-side-navigation/left-side-navigation.component";
import { CatalogTimeSelectComponent } from "./catalog-time-select/catalog-time-select.component";
import { ProductItemComponent } from "./product-item/product-item.component";
import { ProductsSortComponent } from "./products-sort/products-sort.component";
import { ProductItemCardComponent } from "./product-item-card/product-item-card.component";

import { ShopRoutingModule } from './shop.routes.module';
import { ShopService } from './shop.service';

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
    SettingsComponent,
    CatalogAddProductComponent,
    LeftSideNavigationComponent,
    ProductItemComponent,
    CatalogTimeSelectComponent,
    FindProductsComponent,
    ProductsSortComponent,
    ProductItemCardComponent,
    FindProductsDialog
  ],
  entryComponents: [
    FindProductsDialog
  ],
  providers: [
    ShopService
  ]
})
export class ShopModule { }

