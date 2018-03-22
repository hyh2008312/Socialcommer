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

  shippingLists: any=[];

  shipping:any = {
    id: '',
    type: 'Free',
    shippingName: '',
    shippingTimeMin: 0,
    shippingTimeMax: 0,
    priceItem: 0
  };

  isEdit: boolean = false;
  isDialogOpen: boolean = false;

  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }

  ngOnChanges() {
    if(this.shippingList) {
      if(this.shippingList[this.product.id]) {
        this.shippingLists = this.shippingList[this.product.id];
        this.changeShipping(this.shippingLists[0]);
      }
    }


  }

  plusNumber() {
    this.product.number++;
    this.productChange.emit({
      type: 'edit',
      product: this.product,
      shippingPrice: this.shipping,
      index: this.index
    });
  }

  minusNumber() {
    if(this.product.number > 1) {
      this.product.number--;
      this.productChange.emit({
        type: 'edit',
        product: this.product,
        shippingPrice: this.shipping,
        index: this.index
      });
    }
  }

  onEdit() {
    this.isEdit = !this.isEdit;
  }

  changeShipping($event) {
    this.isDialogOpen = false;
    if($event) {
      this.shipping = $event;
      this.productChange.emit({
        type: 'edit',
        product: this.product,
        shippingPrice: this.shipping,
        index: this.index
      });
    }
  }

  openDialog() {
    this.isDialogOpen = !this.isDialogOpen;
  }

  delete() {
    this.productChange.emit({
      type: 'delete',
      product: this.product,
      shippingPrice: this.shipping,
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
      shippingPrice: this.shipping,
      index: this.index
    });
  }
}
