import { NgModule } from '@angular/core';
import { AccountBalancePendingComponent } from "./account-balance-pending/account-balance-pending.component";

import { AccountBalancePendingItemComponent } from "./account-balance-pending-item/account-balance-pending-item.component";
import { AccountBalancePendingTitleComponent } from "./account-balance-pending-title/account-balance-pending-title.component";

import { AccountBalanceComponent } from "./account-balance/account-balance.component";
import { AccountBalanceWithdrawMoneyDialogComponent } from "./account-balance-withdraw-money-dialog/account-balance-withdraw-money-dialog.component";
import { AccountItemComponent } from "./account-item/account-item.component";
import { AccountPaymentSettingComponent } from "./account-payment-setting/account-payment-setting.component";
import { AccountTitleComponent } from "./account-title/account-title.component";

import { AccountRoutingModule } from './account.routes.module';

import { AccountService } from './account.service';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  exports: [],
  declarations: [
    AccountBalanceComponent,
    AccountBalanceWithdrawMoneyDialogComponent,
    AccountItemComponent,
    AccountPaymentSettingComponent,
    AccountBalancePendingComponent,
    AccountBalancePendingItemComponent,
    AccountBalancePendingTitleComponent,
    AccountTitleComponent
  ],
  entryComponents: [
    AccountBalanceWithdrawMoneyDialogComponent,
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }

