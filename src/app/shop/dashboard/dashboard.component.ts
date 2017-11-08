import { Component, OnInit } from '@angular/core';

import { ShopService } from '../shop.service';
import { StoreStatistic } from '../shop';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../shop.scss']
})

export class DashboardComponent implements OnInit {

  timeOverview: string = 'All Time';
  timeStatistic: string = 'All Time';

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

  storeStatistic: StoreStatistic = new StoreStatistic();

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
      }
    });

  }

  getStore(event?:any) {
    if(event) {
      this.storeDay = event.day;
    }

    let self = this;
    this.shopService.getStoreStatistics({
      id: this.storeId,
      day: this.storeDay
    }).then((data) => {
      self.storeStatistic = data;
    });
  }

  getProduct(event?:any) {
    console.log(event)

    this.shopService.getProductStatistics({
      store: this.storeId,
      day: this.productDay
    }).then((data) => {
      console.log(data)
    });
  }
}
