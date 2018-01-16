import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-store-cart-product-item',
  templateUrl: './store-cart-product-item.component.html',
  styleUrls: ['../store-cart.scss']
})

export class StoreCartProductItemComponent{

  @Input() homeLink: string = '';
  @Input() product: any;
  @Output() productChange = new EventEmitter<any>();
  @Input() index: number = 0;
  @Input() shippingList: any;

  shipping = 'ePacket';

  shippingItem = {
    content: 'ePacket',
    price: '$ 5',
    subContent: '2 - 3 business days'
  };

  shippingList = [{
    content: 'ePacket',
    price: '$ 5',
    subContent: '2 - 3 business days'
  },{
    content: 'DHL',
    price: 'Free',
    subContent: '5 - 10 business days'
  }];

  isEdit: boolean = false;
  isDialogOpen: boolean = false;

  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }

  plusNumber() {
    this.product.number++;
    this.productChange.emit({
      type: 'edit',
      product: this.product,
      index: this.index
    });
  }

  minusNumber() {
    if(this.product.number > 1) {
      this.product.number--;
      this.productChange.emit({
        type: 'edit',
        product: this.product,
        index: this.index
      });
    }
  }

  onEdit() {
    this.isEdit = !this.isEdit;
  }

  changeShipping($event) {
    for(let value of this.shippingList) {
      if(value.content == $event) {
        this.shipping = $event;
        this.shippingItem = value;
        this.isDialogOpen = false;
        break;
      }
    }
  }

  openDialog() {
    this.isDialogOpen = !this.isDialogOpen;
  }

  delete() {
    this.productChange.emit({
      type: 'delete',
      product: this.product,
      index: this.index
    });
  }

  numberChanges($event) {
    if(typeof $event != "number" || $event <= 0) {
      this.product.number = 1;
    } else {
      this.product.number = $event;
    }

    this.productChange.emit({
      type: 'edit',
      product: this.product,
      index: this.index
    });
  }
}
