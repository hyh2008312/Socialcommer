import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-store-cart-product-item',
  templateUrl: './store-cart-product-item.component.html',
  styleUrls: ['../store-cart.scss']
})

export class StoreCartProductItemComponent{

  @Input() homeLink: string = '';

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

  number = 1;

  isEdit: boolean = false;
  isDialogOpen: boolean = false;

  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }

  plusNumber() {
    this.number++;
  }

  minusNumber() {
    if(this.number > 0) {
      this.number--;
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
}
