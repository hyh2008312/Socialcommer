import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';

@Component({
  selector: 'app-edit-cart-main',
  templateUrl: './store-cart.component.html',
  styleUrls: ['./_store-edit-cart.scss']
})

export class StoreCartComponent implements OnInit {
  products: any;

  sharelink: string = '';
  text: string = '';

  @Input() storeName: string;
  @Output() public closeStoreCart: EventEmitter<any> = new EventEmitter();
  @Output() public openStoreOrder: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit() {
  }

  closeCart(): void {
    this.closeStoreCart.emit();
  }

  openOrder(): void {
    this.openStoreOrder.emit();
  }

}
