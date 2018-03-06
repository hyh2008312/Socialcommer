import { Component, OnInit, Inject } from '@angular/core';
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
  pageSize = 15;
  pageSizeOptions = [15, 30];

  // Product list
  productList: any = false;

  searchKey: string = '';

  isSearch: boolean = false;

  constructor(
    private shopService: ShopService,
    private userService: UserService,
    private fb: FormBuilder,
    overlayContainer: OverlayContainer
  ) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    this.searchForm = this.fb.group({
      searchKey: ['']
    });

    this.searchForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.userService.countryList.subscribe((data) => {
      if(data) {
        this.countryList = data;
      }
    });
  }

  onValueChanged(data) {
    this.isSearch = false;
  }

  ngOnInit():void {
    this.getSupplyProductList();

    let self = this;
    self.userService.pubCategory.subscribe((data) => {
      if(data) {
        self.categories.push({
          id: null,
          data: {name: 'All'}
        });
        self.categories.push({
          id: 'special',
          data: {name: 'Promotional Offers'}
        });
        for(let item of data) {
          self.categories.push(item);
        }

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

}
