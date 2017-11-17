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

  storeStatistic: StoreStatistic = new StoreStatistic();
  productStatistic: any[] = [];
  productStatisticPage: number = 1;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 12;
  pageSizeOptions = [6, 12];

  // MatPaginator Output
  changePage(event) {
    this.pageSize = event.pageSize;

    this.productStatisticPage = event.pageIndex + 1;

    this.getProduct();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

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
    if(event) {
      this.productDay = event.day;
    }

    let page = this.productStatisticPage;

    let self = this;
    this.shopService.getProductStatistics({
      store: this.storeId,
      day: this.productDay,
      page: page,
      page_size: this.pageSize
    }).then((data) => {
      self.length = data.count;
      self.productStatistic = [...data.results];
    });
  }
}
