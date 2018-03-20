import { Component, OnInit, OnDestroy} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { ReportService } from '../report.service';

@Component({
  selector: 'app-shop-account-report-main',
  templateUrl: './report-main.component.html',
  styleUrls: ['../_account-report.scss']
})

export class ReportMainComponent implements OnInit {

  storeId: number;
  storeCurrency: string = 'USD';

  date: any = 7;
  dateList = [{
    name: 'Last 7 Days',
    value: 7
  }, {
    name: 'Last 30 Days',
    value: 30
  }, {
    name: 'Last 90 Days',
    value: 90
  }, {
    name: 'Year to Date',
    value: 360
  }];

  salesSort: any = 7;
  salesSortList = [{
    name: 'Units Sold',
    value: 7
  }, {
    name: 'Total Sales',
    value: 30
  }, {
    name: 'Total Views',
    value: 90
  }, {
    name: 'Conversion',
    value: 360
  }, {
    name: 'Commissions Earned',
    value: 360
  }];

  transactionStatus: any = 0;
  transactionStatusList = [{
    name: 'All Status',
    value: 0
  }, {
    name: 'Processing',
    value: 7
  }, {
    name: 'Fulfilled',
    value: 30
  }, {
    name: 'Canceled',
    value: 90
  }];

  refundStatus: any = 0;
  refundStatusList = [{
    name: 'All Status',
    value: 0
  }, {
    name: 'Refunded',
    value: 7
  }, {
    name: 'Processing',
    value: 30
  }, {
    name: 'Canceled',
    value: 90
  }];

  sales: any = false;
  salesIndex = 1;
  transaction: any = false;
  transactionIndex = 1;
  refund: any = false;
  refundIndex = 1;

  selectedIndex: number = 0;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 12;
  pageSizeOptions = [6, 12];

  constructor(
    private reportService: ReportService
  ) {

  }

  ngOnInit():void {
    this.changeProducts({index: 0});
  }

  ngOnDestroy() {
  }

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    switch (type) {
      case 0:
        this.salesIndex = event.pageIndex + 1;
        break;
      case 1:
        this.transactionIndex = event.pageIndex + 1;
        break;
      case 2:
        this.refundIndex = event.pageIndex + 1;
        break;
    }
    this.changeProducts({index: type});
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  changeProducts(event) {
    let relationStatus = 'published';
    let page = this.salesIndex;
    switch (event.index) {
      case 1:
        page = this.transactionIndex;
        break;
      case 2:
        page = this.refundIndex;
        break;
      default:
        break;
    }

    let self = this;
    switch (event.index) {
      case 1:
        self.transaction = [];
        break;
      case 2:
        self.refund = [];
        break;
      default:
        self.sales = [];
        break;
    }
  }

  changeSort($event, type, index) {
    switch (type) {
      case 1:
        this.salesSort = $event;
        break;
      case 2:
        this.transactionStatus = $event;
        break;
      case 3:
        this.refundStatus = $event;
        break;
      default:
        this.date = $event;
        break;
    }
    this.changeProducts({index: index});
  }


}