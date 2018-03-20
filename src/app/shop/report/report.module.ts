import { NgModule } from '@angular/core';

import { AccountReportComponent } from  "./account-report/account-report.component";
import { AccountReportTitleComponent } from "./account-report-title/account-report-title.component";
import { AccountReportItemComponent } from "./account-report-item/account-report-item.component";


import { ReportRoutingModule } from './report.routes.module';

import { ReportService } from './report.service';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    ReportRoutingModule
  ],
  exports: [],
  declarations: [
    AccountReportComponent,
    AccountReportTitleComponent,
    AccountReportItemComponent
  ],
  providers: [
    ReportService
  ]
})
export class ReportModule { }

