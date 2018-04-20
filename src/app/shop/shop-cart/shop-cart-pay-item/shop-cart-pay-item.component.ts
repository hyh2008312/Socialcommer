import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import {UserService} from "../../../shared/services/user/user.service";

@Component({
  selector: 'app-shop-cart-pay-item',
  templateUrl: './shop-cart-pay-item.component.html',
  styleUrls: ['../_shop-cart.scss']
})

export class ShopCartPayItemComponent{

  @Input() product: any;
  @Output() productChange = new EventEmitter<any>();
  @Input() currency: any = '';

  productLink: any = '';

  sub: any;

  constructor(
    private userService: UserService
  ) {
    this.sub = this.userService.store.subscribe((data) => {
      if(data) {
        this.productLink = 'http://' + window.location.host + '/store/' + data.displayName + '/' +
          (data.template && data.template.templateId?data.template.templateId:5)
          + '/detail/';
      }
    });
  }

  ngOnChanges() {

    if(this.product) {
      this.productLink = this.productLink + this.product.goodsId;
    }

  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

}
