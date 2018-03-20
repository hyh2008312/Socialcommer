import { NgModule } from '@angular/core';

import { ReportMainComponent } from "./report-main/report-main.component";
import { ReportTitleComponent } from "./report-title/report-title.component";
import { ReportItemComponent } from "./report-item/report-item.component";


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
    ReportMainComponent,
    ReportTitleComponent,
    ReportItemComponent
  ],
  providers: [
    ReportService
  ]
})
export class ReportModule { }

