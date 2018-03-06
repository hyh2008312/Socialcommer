import { Component, OnInit } from '@angular/core';

import { ShopService } from '../shop.service';
import { StoreStatistic } from '../shop';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./_dashboard.scss']
})

export class DashboardComponent implements OnInit {

  timeOverview: string = 'Yesterday';
  timeStatistic: string = 'Yesterday';

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

  storeDay: number = 1;
  productDay: number = 1;

  storeId: number;

  storeStatistic: any = {};
  productStatistic: any = false;

  monthlySale: any = 0;

  constructor(
    private shopService: ShopService,
    private userService: UserService
  ) {

  }

  ngOnInit():void {
    let self = this;
    this.userService.store.subscribe((data) => {
      if(data) {
        self.storeId = data.id;

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
}
