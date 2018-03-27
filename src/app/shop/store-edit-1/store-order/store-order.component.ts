import {Component, Output, EventEmitter,Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-1-order',
  templateUrl: './store-order.component.html',
  styleUrls: ['./_store-order.scss']
})

export class StoreOrderComponent {

  loginGroup: FormGroup;
  loginErr: any = false;
  @Input() storeName: string;
  @Output() public closeStoreOrder: EventEmitter<any> = new EventEmitter();
  @Output() public openStoreCart: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  closeOrder(): void {
    this.closeStoreOrder.emit();
  }

  openCart(): void {
    this.openStoreCart.emit();
  }

}
