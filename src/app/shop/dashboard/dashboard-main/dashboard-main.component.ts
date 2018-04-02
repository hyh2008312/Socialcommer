import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../dashboard.service';
import { UserService } from '../../../shared/services/user/user.service';
import { MatDialog } from "@angular/material";

import { BonusTipsDialogComponent } from '../bonus-tips-dialog/bonus-tips-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./_dashboard-main.scss']
})

export class DashboardMainComponent implements OnInit {

  timeOverview: string = 'Last 7 days';
  timeStatistic: string = 'Last 7 days';

  times = [{
    code: 'Yesterday',
    value: 'Yesterday',
    day: 1,
  }, {
    code: 'Last 7 days',
    value: 'Last 7 days',
    day: 7
  }, {
    code: 'Last 30 days',
    value: 'Last 30 days',
    day: 30
  }, {
    code: 'All Time',
    value: 'All Time',
    day: 31
  }];

  storeDay: number = 7;
  productDay: number = 7;

  storeId: number;

  storeStatistic: any = {};
  productStatistic: any = false;

  monthlySale: any = 0;
  currency: string = 'USD';

  constructor(
    private shopService: DashboardService,
    private userService: UserService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit():void {
    let self = this;
    this.userService.store.subscribe((data) => {
      if(data) {
        self.storeId = data.id;

        self.currency = data.currency.toUpperCase();

        self.getStore();

        self.getProduct();

        self.getMonthlySale();
      }
    });

  }

  getStore(event?:any) {
    if(event) {
      this.storeDay = event.day;
    }

    let self = this;
    this.shopService.getStoreStatistics({
      day: this.storeDay
    }).then((data) => {
      self.storeStatistic = data;
    });
  }

  getProduct(event?:any) {
    if(event) {
      this.productDay = event.day;
    }

    let self = this;
    this.shopService.getProductStatistics({
      day: this.productDay
    }).then((data) => {
      self.productStatistic = [...data];
    });
  }

  getMonthlySale() {
    let self = this;
    this.shopService.getSaleMonthly().then((data) => {
      self.monthlySale = data.sellTotal;
    });
  }

  openBonusTipDialog() {
    let dialogRef = this.dialog.open(BonusTipsDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
