import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-cart-main-6',
  templateUrl: './store-cart.component.html',
  styleUrls: ['./_store-edit-cart.scss']
})

export class StoreCartComponent implements OnInit {
  products: any;
  shareLink: string;
  text: string;
  @Input() storeName: string;
  @Output() public closeStoreCart: EventEmitter<any> = new EventEmitter();
  @Output() public openStoreOrder: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.shareLink = window.location.href;
  }

  closeCart(): void {
    this.closeStoreCart.emit();
  }

  openOrder(): void {
    this.openStoreOrder.emit();
  }

}
