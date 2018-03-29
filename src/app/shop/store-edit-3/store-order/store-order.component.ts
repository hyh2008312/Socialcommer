import {Component, Output, EventEmitter,Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-3-order',
  templateUrl: './store-order.component.html',
  styleUrls: ['./_store-order.scss']
})

export class StoreOrderComponent {

  loginGroup: FormGroup;
  loginErr: any = false;
  shareLink: string;
  text: string;
  @Input() storeName: string;
  @Output() public closeStoreOrder: EventEmitter<any> = new EventEmitter();
  @Output() public openStoreCart: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.shareLink = window.location.href;
  }

  closeOrder(): void {
    this.closeStoreOrder.emit();
  }

  openCart(): void {
    this.openStoreCart.emit();
  }

}
