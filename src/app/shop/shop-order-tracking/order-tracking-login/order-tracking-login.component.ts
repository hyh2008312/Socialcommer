import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShopOrderTrackingService } from '../shop-order-tracking.service';

import { ForgetOrderNumberDialogComponent } from '../forget-order-number-dialog/forget-order-number-dialog.component';

@Component({
  selector: 'app-shop-tracking-login',
  templateUrl: './order-tracking-login.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class OrderTrackingLoginComponent{

  orderList: any;

  page = 1;
  pageSize = 12;
  pageSizeOptions = [6, 12];

  length: number = 0;

  searchKey: any = '';
  isSearch: boolean = false;
  searchForm: FormGroup;

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getOrderList();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  constructor(
    private fb: FormBuilder,
    private orderTrackingService: ShopOrderTrackingService
  ) {
    this.getOrderList();

    this.searchForm = this.fb.group({
      searchKey: ['']
    });

    this.searchForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data) {
    this.isSearch = false;
  }

  clearSearchKey() {
    this.searchKey = '';
  }

  getOrderList() {
    this.orderTrackingService.getOrderList({
      page: this.page,
      page_size: this.pageSize,
    }).then((data) => {
      this.length = data.count;
      this.orderList = [...data.results];
    });
  }

  orderChange($event) {
    if($event.status == 'delete') {
      this.orderList.splice($event.index, 1);
    }
  }
}
