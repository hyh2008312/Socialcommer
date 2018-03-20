import { NgModule } from '@angular/core';
import { ShopComponent } from './shop/shop.component';
import { ShopErrorComponent } from './shop-error/shop-error.component';
import { StoreComponent } from './store/store.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SettingsComponent } from "./settings/settings.component";
import { StorePreviewComponent } from "./store-preview/store-preview.component";
import { StoreEditComponent } from "./store-edit/store-edit.component";
import { ToDoListComponent } from "./to-do-list/to-do-list.component";
import { StoreFrontComponent } from "./store-front/store-front.component";
import { AccountBalancePendingComponent } from "./account-balance-pending/account-balance-pending.component";

import { LeftSideNavigationComponent } from "./left-side-navigation/left-side-navigation.component";
import { CatalogTimeSelectComponent } from "./catalog-time-select/catalog-time-select.component";
import { StatisticItemComponent } from './statistic-item/statistic-item.component';
import { StatisticTitleComponent } from './statistic-title/statistic-title.component';
import { BonusTitleComponent } from "./bonus-title/bonus-title.component";
import { BonusItemComponent } from "./bonus-item/bonus-item.component";
import { AccountBalancePendingItemComponent } from "./account-balance-pending-item/account-balance-pending-item.component";
import { AccountBalancePendingTitleComponent } from "./account-balance-pending-title/account-balance-pending-title.component";

import { SnackBarSuccessComponent } from './snack-bar-success/snack-bar-success.component';
import { StoreShareDialogComponent } from "./store-share-dialog/store-share-dialog.component";
import { SettingsPasswordDialogComponent } from "./setting-password-dialog/setting-password-dialog.component";
import { BonusTipsDialogComponent } from "./bonus-tips-dialog/bonus-tips-dialog.component";
import { StoreStatusChangeDialogComponent } from "./store-status-change-dialog/store-status-change-dialog.component";

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
    DashboardComponent,
    ToDoListComponent,
    SettingsComponent,
    LeftSideNavigationComponent,
    CatalogTimeSelectComponent,
    StorePreviewComponent,
    StoreEditComponent,
    StoreFrontComponent,
    StatisticItemComponent,
    StatisticTitleComponent,
    StoreShareDialogComponent,
    SnackBarSuccessComponent,
    SettingsPasswordDialogComponent,
    ShopErrorComponent,
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
    BonusTipsDialogComponent,
    StoreStatusChangeDialogComponent,
    AccountBalancePendingComponent,
    AccountBalancePendingItemComponent,
    AccountBalancePendingTitleComponent
  ],
  entryComponents: [
    StoreShareDialogComponent,
    SnackBarSuccessComponent,
    SettingsPasswordDialogComponent,
    AccountBalanceWithdrawMoneyDialogComponent,
    BonusTipsDialogComponent,
    StoreStatusChangeDialogComponent
  ],
  providers: [
    ShopService,
    StoreService,
    AuthenticationService
  ]
})
export class ShopModule { }

