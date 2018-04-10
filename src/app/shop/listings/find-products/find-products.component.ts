import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OverlayContainer} from '@angular/cdk/overlay';

import {ShopService} from '../shop.service';
import {UserService} from '../../../shared/services/user/user.service';

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
  categories: any = [];

  // MatPaginator Inputs
  productIndex: number = 1;
  length: number = 0;
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

  promotionState: string = 'ongoing';
  // 根据这个 1,标志判断  onGoing and upcoming的标志 2,判断详情也的显示类型，（2种类型）
  isShowPromotionFlag: boolean = false;

  constructor(private shopService: ShopService,
              private userService: UserService,
              private fb: FormBuilder,
              overlayContainer: OverlayContainer,
              private activatedRoute: ActivatedRoute) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    this.searchForm = this.fb.group({
      searchKey: ['']
    });

    this.searchForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.sub1 = this.userService.countryList.subscribe((data) => {
      if (data) {
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

  ngOnInit(): void {

    let self = this;
    self.sub2 = self.userService.pubCategory.subscribe((data) => {
      if (data) {
        self.categories = [];
        self.categories.push({
          id: null,
          data: {name: 'All'}
        });
        self.categories.push({
          id: 'ongoing',
          data: {name: 'Flash Sale'}
        });
        self.categories.push({
          id: 'special',
          data: {name: 'Special Offers'}
        });
        for (let item of data) {
          self.categories.push(item);
        }

      }
    });

    self.sub = self.userService.store.subscribe((data) => {
      if (data) {
        self.currency = data.currency.toUpperCase();
      }
    });
  }

  clearSearchKey() {
    this.searchKey = '';
    this.productIndex = 1;
    this.getSupplyProductList();
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

    if (this.category && this.category.id) {
      cat = this.category.id;
    }
    if (isSearch != null) {
      this.isShowPromotionFlag = false;
      cat = null;
      this.category = {
        id: null,
        data: {name: 'All'}
      };
    }

    let self = this;
    self.shopService.getSupplyProductList({
      cat,
      page: this.productIndex,
      page_size: this.pageSize,
      q: this.searchKey,
      sort: this.sort
    }).then((data) => {

      if (isSearch == false) {
        self.isSearch = true;
      }
      self.length = data.count;

      self.productList = data.results;
    });
  }

  changeCategory($event) {
    this.category = $event;
    if (this.category.id == 'ongoing') {
      this.isShowPromotionFlag = true;
      this.promotionState = 'ongoing';
    } else {
      this.isShowPromotionFlag = false;
    }
    this.productIndex = 1;
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

  changePromotionState($event): void {
    if (this.promotionState == $event) {
      return;
    }
    this.promotionState = $event;
    this.category = {
      id: $event,
      data: {name: 'Flash Sale'}
    };
    this.productIndex = 1;
    this.getSupplyProductList();
  }
}
