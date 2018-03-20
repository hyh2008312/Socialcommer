import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountReportComponent} from  "./account-report/account-report.component";

const routes: Routes = [
  {
    path: '', component: AccountReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}
