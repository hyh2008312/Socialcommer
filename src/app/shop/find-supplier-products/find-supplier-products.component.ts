import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router, ActivatedRoute} from '@angular/router';

import { ShopService } from '../shop.service';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-shop-find-supplier-products',
  templateUrl: './find-supplier-products.component.html',
  styleUrls: ['./_find-supplier-products.scss']
})

export class FindSupplierProductsComponent implements OnInit {


  sort: any = '';
  supplierName: any = '';
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

  categoryId: any = '';
  categories:any = [];

  // MatPaginator Inputs
  productIndex: number = 1;
  length:number = 0;
  pageSize = 15;
  pageSizeOptions = [15, 30];

  // Product list
  productList: any = false;

  constructor(
    private shopService: ShopService,
    private userService: UserService,
    private fb: FormBuilder,
    overlayContainer: OverlayContainer,
    private activatedRoute: ActivatedRoute
  ) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');

  }


  ngOnInit():void {
    this.getSupplyProductList();

    let self = this;
    self.userService.pubCategory.subscribe((data) => {
      if(data) {
        self.categories.push({
          id: '',
          data: {name: 'All Categories'}
        });
        for(let item of data) {
          self.categories.push(item);
        }
      }
    });
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

  getSupplyProductList() {
    let cat = this.categoryId != '' ? this.categoryId: null;

    let sid = this.activatedRoute.snapshot.params['supplierId'];

    let self = this;
    self.shopService.getProductListBySupply({
      cat,
      sid,
      page: this.productIndex,
      page_size: this.pageSize,
      sort: this.sort
    }).then((data) => {

      self.length = data.count;

      self.productList = data.results;

      self.supplierName = self.productList[0].supplierName;
    });
  }

  sortChange($event) {
    this.sort = $event;
    this.getSupplyProductList();
  }

  categoryChange($event) {
    this.categoryId = $event;
    this.getSupplyProductList();
  }

}
