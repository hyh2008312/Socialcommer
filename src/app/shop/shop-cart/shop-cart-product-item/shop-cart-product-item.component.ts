import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import {UserService} from "../../../shared/services/user/user.service";

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
  @Input() shippingList: any;

  productLink: any = '';

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

  sub:any;

  constructor(
    overlayContainer: OverlayContainer,
    private userService: UserService
  ) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');

    this.sub = this.userService.store.subscribe((data) => {
      if(data) {
        this.productLink = 'http://' + window.location.host + '/store/' + data.displayName + '/' +
          (data.template && data.template.templateId?data.template.templateId:5)
        + '/detail/';
      }
    });
  }

  ngOnChanges() {
    if(this.shippingList) {
      if(this.shippingList[this.product.id]) {
        this.shippingLists = this.shippingList[this.product.id];
        this.changeShipping(this.shippingLists[0]);
      }
      this.productLink = this.productLink + this.product.goodsId;
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

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
}
