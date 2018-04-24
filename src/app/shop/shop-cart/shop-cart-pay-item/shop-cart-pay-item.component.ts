import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shop-cart-pay-item',
  templateUrl: './shop-cart-pay-item.component.html',
  styleUrls: ['../_shop-cart.scss']
})

export class ShopCartPayItemComponent{

  @Input() product: any;
  @Output() productChange = new EventEmitter<any>();
  @Input() currency: any = '';

  constructor() {}

  ngOnChanges() {

  }


}
