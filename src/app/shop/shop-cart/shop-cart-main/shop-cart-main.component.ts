import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {UserService} from "../../../shared/services/user/user.service";
import {ShopService} from "../../shop.service";
import {ShopCartService} from '../shop-cart.service';

@Component({
  selector: 'app-shop-cart-main',
  templateUrl: './shop-cart-main.component.html',
  styleUrls: ['../_shop-cart.scss']
})

export class ShopCartMainComponent implements OnInit {

  homeLink: string = '';

  isTotalDialogOpen: boolean = false;

  storeId: any = '';

  currency: string = 'USD';

  countries: any[];

  countryName: any = '';

  countryId: number = 1;

  products: any;

  shippingList: any;

  displayName: any = '';

  subTotalPrice: number = 0;

  shippingTotalPrice: number = 0;

  shippingItem: any = {};

  totalPrice: number = 0;

  cartErr: any = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private shopService: ShopService,
              private shopCartService: ShopCartService) {

  }

  ngOnInit() {
    let self = this;

    self.userService.store.subscribe((data) => {
      if (data) {
        let uid = data.templateId || 1;
        self.homeLink = `/store/${data.displayName}/${uid}`;
        self.storeId = data.id;
        self.currency = data.currency;
        self.displayName = data.displayName;
        self.products = self.shopService.getProductInCart(self.displayName);
        self.countryName = data.country.name;
        self.changeShipping(data.country.id);
        self.calculatePrice();
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
    this.shopService.addProductToCart(this.displayName, this.products);
  }

  changeShipping($event) {
    this.countryId = $event;
    let pid = '';
    let pidArray = [];
    if (this.products && this.products.length > 0) {
      for (let value of this.products) {
        pidArray.push(value.id);
      }
      pid = pidArray.join(',');
      let obj = {
        cid: this.countryId,
        pid
      };

      this.shopCartService.getShippingList(obj).then((data) => {
        this.shippingList = data;
      });
    }
  }

  calculatePrice() {
    let price = 0;
    let shippingPrice = 0;
    let rate = 1;
    if (this.currency.toUpperCase() == 'INR') {
      rate = 65.4;
    }
    for (let item of this.products) {
      if (typeof item.number == 'number' && item.number > 0) {
        price += item.number * Math.round(item.salePriceAmount * rate * 100) / 100;
        if (this.shippingItem[item.id]) {
          shippingPrice += Math.round(this.shippingItem[item.id].priceItem * rate * 100) / 100 * item.number;
        }
      }
    }

    this.subTotalPrice = price;
    this.shippingTotalPrice = shippingPrice;
    this.totalPrice = this.subTotalPrice + this.shippingTotalPrice;
  }

  checkout() {
    let lines = [];
    for (let item of this.products) {
      lines.push({
        goodsId: item.goodsId,
        quantity: item.number,
        variantId: item.variantId,
        shippingPriceId: this.shippingItem[item.id].id
      });
    }

    let cart = {
      storeId: this.storeId,
      totalInclTax: 0,
      totalExclTax: 0,
      shippingInclTax: 0,
      shippingExclTax: 0,
      currency: this.currency,
      lines
    };

    let self = this;
    this.shopCartService.createOrder(cart).then((data) => {
      self.cartErr = false;
      self.shopCartService.addOrder(data);
      self.router.navigate([`./checkout`], {relativeTo: this.activatedRoute});
    }).catch((data) => {
      self.cartErr = data;
    });
  }

}
