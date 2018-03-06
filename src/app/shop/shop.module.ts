import { NgModule } from '@angular/core';
import { ShopComponent } from './shop/shop.component';
import { ShopErrorComponent } from './shop-error/shop-error.component';
import { StoreComponent } from './store/store.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SettingsComponent } from "./settings/settings.component";
import { FindProductsComponent } from "./find-products/find-products.component";
import { FindSupplierProductsComponent } from "./find-supplier-products/find-supplier-products.component";
import { CatalogAddProductComponent } from "./catalog-add-product/catalog-add-product.component";
import { CatalogEditProductComponent } from "./catalog-edit-product/catalog-edit-product.component";
import { FindProductsAddProductComponent } from "./find-products-add-product/find-products-add-product.component";
import { FindProductsEditPreviewComponent } from "./find-products-edit-preview/find-products-edit-preview.component";
import { StorePreviewComponent } from "./store-preview/store-preview.component";
import { StoreEditComponent } from "./store-edit/store-edit.component";
import { ToDoListComponent } from "./to-do-list/to-do-list.component";
import { ProductCategoryComponent } from "./product-category/product-category.component";
import { BlogComponent } from "./blog/blog.component";
import { StoreFrontComponent } from './store-front/store-front.component';

import { LeftSideNavigationComponent } from "./left-side-navigation/left-side-navigation.component";
import { CatalogTimeSelectComponent } from "./catalog-time-select/catalog-time-select.component";
import { ProductItemComponent } from "./product-item/product-item.component";
import { ProductsSortComponent } from "./products-sort/products-sort.component";
import { ProductItemCardComponent } from "./product-item-card/product-item-card.component";
import { ProductTitleComponent } from './product-title/product-title.component';
import { StatisticItemComponent } from './statistic-item/statistic-item.component';
import { StatisticTitleComponent } from './statistic-title/statistic-title.component';
import { CategoryItemComponent } from './category-item/category-item.component';
import { CategoryTitleComponent } from './category-title/category-title.component';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogTitleComponent } from './blog-title/blog-title.component';
import { FindProductCategoryComponent } from './find-product-category/find-product-category.component';
import { BonusTitleComponent } from "./bonus-title/bonus-title.component";
import { BonusItemComponent } from "./bonus-item/bonus-item.component";

import { SnackBarSuccessComponent } from './snack-bar-success/snack-bar-success.component';
import { StoreShareDialogComponent } from "./store-share-dialog/store-share-dialog.component";
import { ProductAffiliateLinkDialogComponent } from "./product-affiliate-link-dialog/product-affiliate-link-dialog.component";
import { CategoryCreateDialogComponent } from "./category-create-dialog/category-create-dialog.component";
import { CategoryDeleteDialogComponent } from "./category-delete-dialog/category-delete-dialog.component";
import { CategoryEditDialogComponent } from "./category-edit-dialog/category-edit-dialog.component";
import { BlogCreateDialogComponent } from "./blog-create-dialog/blog-create-dialog.component";
import { BlogEditDialogComponent } from "./blog-edit-dialog/blog-edit-dialog.component";
import { BlogDeleteDialogComponent } from "./blog-delete-dialog/blog-delete-dialog.component";
import { SettingsPasswordDialogComponent } from "./setting-password-dialog/setting-password-dialog.component";
import { BonusTipsDialogComponent } from "./bonus-tips-dialog/bonus-tips-dialog.component"

import { AccountBalanceComponent } from "./account-balance/account-balance.component";
import { AccountBalanceWithdrawMoneyDialogComponent } from "./account-balance-withdraw-money-dialog/account-balance-withdraw-money-dialog.component";
import { AccountItemComponent } from "./account-item/account-item.component";
import { AccountPaymentSettingComponent } from "./account-payment-setting/account-payment-setting.component";
import { AccountTitleComponent } from "./account-title/account-title.component";

import { AccountReportComponent } from  "./account-report/account-report.component";
import { AccountReportTitleComponent } from "./account-report-title/account-report-title.component";
import { AccountReportItemComponent } from "./account-report-item/account-report-item.component";
import { StoreAvatarComponent } from "./store-avatar/store-avatar.component";

import { ShopRoutingModule } from './shop.routes.module';

import { ShopService } from './shop.service';
import { StoreService } from './store.service';
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
    ProductCategoryComponent,
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
    StoreEditComponent,
    BlogComponent,
    StoreFrontComponent,
    StatisticItemComponent,
    StatisticTitleComponent,
    CategoryItemComponent,
    CategoryTitleComponent,
    BlogTitleComponent,
    BlogItemComponent,
    StoreShareDialogComponent,
    ProductAffiliateLinkDialogComponent,
    SnackBarSuccessComponent,
    CategoryCreateDialogComponent,
    CategoryDeleteDialogComponent,
    CategoryEditDialogComponent,
    BlogCreateDialogComponent,
    BlogEditDialogComponent,
    BlogDeleteDialogComponent,
    SettingsPasswordDialogComponent,
    ShopErrorComponent,
    FindProductCategoryComponent,
    FindSupplierProductsComponent,
    AccountBalanceComponent,
    AccountBalanceWithdrawMoneyDialogComponent,
    AccountItemComponent,
    AccountPaymentSettingComponent,
    AccountTitleComponent,
    AccountReportComponent,
    AccountReportTitleComponent,
    AccountReportItemComponent,
    BonusTitleComponent,
    BonusItemComponent,
    StoreAvatarComponent,
    BonusTipsDialogComponent
  ],
  entryComponents: [
    StoreShareDialogComponent,
    ProductAffiliateLinkDialogComponent,
    SnackBarSuccessComponent,
    CategoryCreateDialogComponent,
    CategoryDeleteDialogComponent,
    CategoryEditDialogComponent,
    BlogDeleteDialogComponent,
    SettingsPasswordDialogComponent,
    AccountBalanceWithdrawMoneyDialogComponent,
    BonusTipsDialogComponent
  ],
  providers: [
    ShopService,
    StoreService,
    AuthenticationService
  ]
})
export class ShopModule { }

