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

  isAllChecked: boolean = false;

  displayName: any = '';

  subTotalPrice: number = 0;

  shippingTotalPrice: number = 0;

  shippingItem: any = {};

  totalPrice: number = 0;

  cartErr: any = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private shopService: ShopService,
    private shopCartService: ShopCartService
  ) {

    //this.getProductList();
  }

  ngOnInit() {
    let self = this;

    self.userService.store.subscribe((data) => {
      if (data) {
        self.currency = data.currency;
        self.countryId = data.country.id;
        self.countryName = data.country.name;
        self.getProductList();
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
  }

  calculatePrice() {
    let price = 0;
    let shippingPrice = 0;
    let rate = 1;
    if (this.currency.toUpperCase() == 'INR') {
      rate = 65.4;
    }
    for (let item of this.products) {
      if (typeof item.quantity == 'number' && item.quantity > 0) {
        price += item.quantity * Math.round(item.salePrice * rate * 100) / 100;
        if (Object.keys(item.shippingItem).length>0) {
          shippingPrice += Math.round(item.shippingItem.priceItem * rate * 100) / 100 * item.quantity;
        }
      }
    }

    this.subTotalPrice = price;
    this.shippingTotalPrice = shippingPrice;
    this.totalPrice = this.subTotalPrice + this.shippingTotalPrice;
  }

  checkout() {
    let cart = [];
    this.cartErr = false;
    for (let item of this.products) {

      if(item.checked) {
        let arr = [];
        arr.push(item.id, item.shippingItem.id);
        cart.push(arr);
      }

      if(cart.length == 0) {
        return this.cartErr = 'You have to choose product first.';
      }
    }

    let self = this;
    this.shopCartService.createOrder(cart).then((data) => {
      self.cartErr = false;
      self.shopCartService.addOrder(data);
      self.router.navigate([`./checkout`], {relativeTo: this.activatedRoute});
    }).catch((data) => {
      self.cartErr = data;
    });
  }

  checkAll($event) {
    this.isAllChecked = $event;
    for(let item of this.products) {
      item.checked = $event;
    }
  }

  getProductList() {
    this.shopCartService.getProductList().then((data) => {
      this.products = [];
      for(let i = 0; i < data.length; i++) {
        let item: any = data[i];
        item.shippingItem = data[i].shippingPrices.length>0?data[i].shippingPrices[0]: {};
        item.checked = false;
        this.products.push(item);
      }
      this.calculatePrice();
    });
  }

}
