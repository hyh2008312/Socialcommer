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

  dateSales: any = 7;
  dateTransaction: any = 7;
  dateRefund: any = 7;

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

  salesSort: any = 'unit_prices';
  salesSortList = [{
    name: 'Units Sold',
    value: 'unit_prices'
  }, {
    name: 'Total Sales',
    value: 'total_sales'
  }, {
    name: 'Commissions Earned',
    value: 'commissions'
  }];

  transactionStatus: any = 'All';
  transactionStatusList = [{
    name: 'All Status',
    value: 'All'
  }, {
    name: 'Processing',
    value: 'Processing'
  }, {
    name: 'Fulfilled',
    value: 'Fulfilled'
  }, {
    name: 'Canceled',
    value: 'Canceled'
  }];

  sales: any = false;
  salesIndex = 1;
  transaction: any = false;
  transactionIndex = 1;
  refund: any = false;
  refundIndex = 1;

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
    let page = this.salesIndex;
    let date = this.dateSales;
    switch (event.index) {
      case 1:
        page = this.transactionIndex;
        date = this.dateTransaction;
        break;
      case 2:
        page = this.refundIndex;
        date = this.dateRefund;
        break;
      default:
        break;
    }

    let self = this;
    switch (event.index) {
      case 0:
        this.reportService.getSalesPerformance({
          sort: this.salesSort,
          days: date,
          page,
          page_size: this.pageSize
        }).then((data) => {
          self.length = data.count;
          self.sales = [...data.results];
        });
        break;
      case 1:
        this.reportService.getTransactionHistory({
          status: this.transactionStatus,
          days: date,
          page,
          page_size: this.pageSize
        }).then((data) => {
          self.length = data.count;
          self.transaction = [...data.results];
        });
        break;
      case 2:
        this.reportService.getRefundHistory({
          days: date,
          page,
          page_size: this.pageSize
        }).then((data) => {
          self.length = data.count;
          self.refund = [...data.results];
        });
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
    }
    this.changeProducts({index: index});
  }

  changeDate($event, type, index) {
    switch (type) {
      case 1:
        this.dateTransaction = $event;
        break;
      case 2:
        this.dateRefund = $event;
        break;
      default:
        this.dateSales = $event;
        break;
    }
    this.changeProducts({index: index});
  }


}
