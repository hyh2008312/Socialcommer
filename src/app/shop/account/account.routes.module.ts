import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountBalanceComponent} from "./account-balance/account-balance.component";
import { AccountBalancePendingComponent } from "./account-balance-pending/account-balance-pending.component";

const routes: Routes = [
  {
    path: '', component: AccountBalanceComponent
  }, {
    path: 'pendingbalance', component: AccountBalancePendingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
