import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-cart-header',
  templateUrl: './store-cart-header.component.html',
  styleUrls: ['../store-cart.scss']
})

export class StoreCartHeaderComponent{

  @Input() homeLink: string = '';
  @Input() cartLink: string = '';

  constructor(

  ) {

  }


}
