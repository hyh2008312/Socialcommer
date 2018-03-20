import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';

import { ShopService } from '../shop.service';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-find-products',
  templateUrl: './find-products.component.html',
  styleUrls: ['./_find-products.scss']
})

export class FindProductsComponent implements OnInit {

  searchForm: FormGroup;

  sort: any = '';
  sortList = [{
    name: 'Newest Arrivals',
    value: ''
  }, {
    name: 'Commission High to Low',
    value: 'commission'
  }, {
    name: 'Price: Low to High',
    value: 'price_low'
  }, {
    name: 'Price: High to Low',
    value: 'price_high'
  }];

  countryId: any = 1;
  countryList: any = [];

  category: any = {
    id: null,
    data: {name: 'All'}
  };
  categories:any = [];

  selectable: boolean = true;
  removable: boolean = true;

  // MatPaginator Inputs
  productIndex: number = 1;
  length:number = 0;
  pageSize = 36;
  pageSizeOptions = [36];

  // Product list
  productList: any = false;

  searchKey: string = '';

  isSearch: boolean = false;

  currency: string = 'USD';

  sub: any;

  sub1: any;

  sub2: any;

  constructor(
    private shopService: ShopService,
    private userService: UserService,
    private fb: FormBuilder,
    overlayContainer: OverlayContainer,
    private activatedRoute: ActivatedRoute
  ) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    this.searchForm = this.fb.group({
      searchKey: ['']
    });

    this.searchForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.sub1 = this.userService.countryList.subscribe((data) => {
      if(data) {
        this.countryList = data;
      }
    });

    this.activatedRoute.url.subscribe((data) => {
      this.getSupplyProductList();
    });
  }

  onValueChanged(data) {
    this.isSearch = false;
  }

  ngOnInit():void {

    let self = this;
    self.sub2 = self.userService.pubCategory.subscribe((data) => {
      if(data) {
        self.categories.push({
          id: null,
          data: {name: 'All'}
        });
        self.categories.push({
          id: 'special',
          data: {name: 'Special Offers'}
        });
        for(let item of data) {
          self.categories.push(item);
        }

      }
    });

    self.sub = self.userService.store.subscribe((data) => {
      if(data) {
        self.currency = data.currency.toUpperCase();
      }
    });
  }

  clearSearchKey() {
    this.searchKey = '';
  }

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    this.productIndex = event.pageIndex + 1;
    this.getSupplyProductList();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  getSupplyProductList(isSearch?: any) {
    let cat = [];

    if(this.category && this.category.id) {
      cat = this.category.id;
    }
    if(isSearch != null) {
      cat = null;
      this.category = false;
    }

    let self = this;
    self.shopService.getSupplyProductList({
      cat,
      page: this.productIndex,
      page_size: this.pageSize,
      q: this.searchKey,
      sort: this.sort
    }).then((data) => {

      if(isSearch == false) {
        self.isSearch = true;
      }
      self.length = data.count;

      self.productList = data.results;
    });
  }

  changeCategory($event) {
    this.category = $event;
    this.getSupplyProductList();
  }

  changeSort($event) {
    this.sort = $event;
    this.getSupplyProductList();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
