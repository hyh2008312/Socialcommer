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

  countries: any[];

  countryId: number = 1;

  products: any;

  shippingList: any;

  displayName: any = '';

  subTotalPrice: number = 0;

  shippingTotalPrice: number = 0;

  shippingItem: any = {};

  totalPrice: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
        self.storeCartService.getCountryList().then((data) => {
          self.countries = data;
          self.changeShipping(this.countries[0].id);
          self.calculatePrice();
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
        this.shippingItem[$event.product.id] = $event.shippingPrice;
        break;
      case 'delete':
        this.products.splice($event.index, 1);
        delete this.shippingItem[$event.product.id];
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
    let shippingPrice = 0;
    for(let item of this.products) {
      if(typeof item.number == 'number' && item.number > 0) {
        price += item.number * item.salePriceAmount;
        if(this.shippingItem[item.id]) {
          shippingPrice += parseFloat(this.shippingItem[item.id].priceItem);
        }
      }
    }

    this.subTotalPrice = price;
    this.shippingTotalPrice = shippingPrice;
    this.totalPrice = this.subTotalPrice + this.shippingTotalPrice;
  }

  checkout() {
    let lines = [];
    for(let item of this.products) {
      lines.push({
        goodsId: item.id,
        quantity: item.number,
        variantId: item.variantId,
        shippingPriceId : this.shippingItem[item.id].id
      });
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

    let self = this;
    this.storeCartService.createOrder(cart).then((data) => {
      console.log(data);
      self.storeService.addProductToCart(self.displayName, []);
      self.storeCartService.addOrder(data);

      self.router.navigate([`./checkout`], {relativeTo: this.activatedRoute});
    });
  }

}
