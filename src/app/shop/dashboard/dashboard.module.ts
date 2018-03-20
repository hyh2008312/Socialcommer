import { NgModule } from '@angular/core';
import {DashboardMainComponent} from './dashboard-main/dashboard-main.component';

import { CatalogTimeSelectComponent } from "./catalog-time-select/catalog-time-select.component";
import { BonusTitleComponent } from "./bonus-title/bonus-title.component";
import { BonusItemComponent } from "./bonus-item/bonus-item.component";
import { BonusTipsDialogComponent } from './bonus-tips-dialog/bonus-tips-dialog.component';

import { DashboardRoutingModule } from './dashboard.routes.module';

import { DashboardService } from './dashboard.service';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  exports: [],
  declarations: [
    DashboardMainComponent,
    CatalogTimeSelectComponent,
    BonusTitleComponent,
    BonusItemComponent,
    BonusTipsDialogComponent
  ],
  entryComponents: [
    BonusTipsDialogComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }

