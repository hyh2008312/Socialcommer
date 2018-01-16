import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { StoreCartService } from '../store-cart.service';

@Component({
  selector: 'app-store-cart-main',
  templateUrl: './store-cart-main.component.html',
  styleUrls: ['../store-cart.scss']
})

export class StoreCartMainComponent implements OnInit{

  homeLink:string = '';

  isTotalDialogOpen: boolean = false;

  storeId: any = '';

  currency: string = 'USD';

  countries: Object[];

  countryId: number = 1;

  products: any;

  shippingList: any;

  displayName: any = '';

  subTotalPrice: number = 0;

  totalPrice: number = 0;

  constructor(
    private storeService: StoreService,
    private storeCartService: StoreCartService
  ) {

  }

  ngOnInit() {
    let self = this;

    self.storeService.store.subscribe((data) => {
      if(data) {
        let uid = data.templateId == 1? data.templateId:data.uid;
        self.homeLink = `/store/${data.displayName}/${uid}`;
        self.storeId = data.id;
        self.currency = data.currency;
        self.displayName = data.displayName;
        self.products = self.storeService.getProductInCart(self.displayName);
        self.calculatePrice();
        self.storeCartService.getCountryList().then((data) => {
          self.countries = data;
          self.changeShipping(this.countries[0].id);
        });
      }
    });
  }

  openDialog() {
    this.isTotalDialogOpen = !this.isTotalDialogOpen;
  }

  productEdit($event) {
    switch ($event.type) {
      case 'edit':
        this.products[$event.index] = $event.product;
        break;
      case 'delete':
        this.products.splice($event.index, 1);
        break;
    }
    this.calculatePrice();
    this.storeService.addProductToCart(this.displayName,this.products);
  }

  changeShipping($event) {
    this.countryId = $event;
    let pid = '';
    let pidArray = [];
    for(let value of this.products) {
      pidArray.push(value.id);
    }
    pid = pidArray.join(',');
    let obj = {
      cid: this.countryId,
      pid
    };

    this.storeCartService.getShippingList(obj).then((data) => {
      this.shippingList = data;
    });
  }

  calculatePrice() {
    let price = 0;
    for(let item of this.products) {
      if(typeof item.number == 'number' && item.number > 0) {
        price += item.number * item.salePriceAmount;
      }
    }

    this.subTotalPrice = price;
    this.totalPrice = this.subTotalPrice;
  }

  checkout() {
    let lines = [];
    for(let item of this.products) {
      lines.push({
        goodsId: item.id,
        quantity: item.number,
        variantId: item.sku
      })
    }

    let cart = {
      storeId: this.storeId,
      currency: this.currency,
      totalInclTax: 0,
      totalExclTax: 0,
      shippingInclTax:0,
      shippingExclTax: 0,
      lines
    };

    this.storeCartService.createOrder(cart).then((data) => {
      console.log(data)
    })
  }

}
