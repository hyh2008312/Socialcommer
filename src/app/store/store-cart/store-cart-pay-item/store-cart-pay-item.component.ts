import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import {StoreService} from '../../store.service';

@Component({
  selector: 'app-store-cart-pay-item',
  templateUrl: './store-cart-pay-item.component.html',
  styleUrls: ['../store-cart.scss']
})

export class StoreCartPayItemComponent{

  @Input() product: any;
  @Output() productChange = new EventEmitter<any>();
  @Input() currency: any = '';

  productLink: any = '';

  sub: any;

  constructor(
    private storeService: StoreService
  ) {
    this.sub = this.storeService.store.subscribe((data) => {
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
