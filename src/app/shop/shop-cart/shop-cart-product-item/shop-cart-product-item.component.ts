import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import {UserService} from "../../../shared/services/user/user.service";
import {ShopCartService} from '../shop-cart.service';

@Component({
  selector: 'app-shop-cart-product-item',
  templateUrl: './shop-cart-product-item.component.html',
  styleUrls: ['../_shop-cart.scss']
})

export class ShopCartProductItemComponent implements OnDestroy{

  @Input() homeLink: string = '';
  @Input() product: any= {};
  @Output() productChange = new EventEmitter<any>();
  @Input() index: number = 0;

  productLink: any = '';
  currency: string = '';

  isEdit: boolean = false;
  isDialogOpen: boolean = false;

  sub:any;

  constructor(
    overlayContainer: OverlayContainer,
    private userService: UserService,
    private shopCartService: ShopCartService
  ) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');

    this.sub = this.userService.store.subscribe((data) => {
      if(data) {
        this.productLink = 'http://' + window.location.host + '/shop/listings/items/';
        this.currency = data.currency.toUpperCase();
      }
    });
  }

  ngOnChanges() {
    if(this.product) {
      this.productLink = this.productLink + this.product.productId;
    }
  }

  plusNumber() {
    this.product.quantity++;
    this.shopCartService.changeProductNumber({
      id: this.product.id,
      quantity: this.product.quantity
    }).then((data) => {
      this.productChange.emit({
        type: 'edit',
        product: this.product,
        index: this.index
      });
    });
  }

  minusNumber() {
    if(this.product.quantity > 1) {
      this.product.quantity--;
      this.shopCartService.changeProductNumber({
        id: this.product.id,
        quantity: this.product.quantity
      }).then((data) => {
        this.productChange.emit({
          type: 'edit',
          product: this.product,
          index: this.index
        });
      });
    }
  }

  onEdit() {
    this.isEdit = !this.isEdit;
  }

  changeShipping($event) {
    this.isDialogOpen = false;
    if($event) {
      this.product.shippingItem = $event;
      this.productChange.emit({
        type: 'edit',
        product: this.product,
        index: this.index
      });
    }
  }

  openDialog() {
    this.isDialogOpen = !this.isDialogOpen;
  }

  delete() {
    this.shopCartService.deleteProduct({
      id: this.product.id
    }).then((data) => {
      this.productChange.emit({
        type: 'delete',
        product: this.product,
        index: this.index
      });
    });
  }

  numberChanges($event) {
    if(typeof $event != "number" || $event <= 0) {
      this.product.quantity = 1;
    } else {
      this.product.quantity = $event;
    }

    this.shopCartService.changeProductNumber({
      id: this.product.id,
      quantity: this.product.quantity
    }).then((data) => {
      this.productChange.emit({
        type: 'edit',
        product: this.product,
        index: this.index
      });
    });
  }

  productChecked($event) {
    this.product.checked = $event;
    this.productChange.emit({
      type: 'edit',
      product: this.product,
      index: this.index
    });
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
}
