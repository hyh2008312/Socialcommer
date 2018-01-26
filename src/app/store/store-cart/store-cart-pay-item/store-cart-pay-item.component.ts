import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-store-cart-pay-item',
  templateUrl: './store-cart-pay-item.component.html',
  styleUrls: ['../store-cart.scss']
})

export class StoreCartPayItemComponent{

  @Input() product: any;
  @Output() productChange = new EventEmitter<any>();

  constructor() {

  }

  ngOnChanges() {

  }

}
