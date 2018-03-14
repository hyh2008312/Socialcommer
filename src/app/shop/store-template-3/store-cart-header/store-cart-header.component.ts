import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';

@Component({
  selector: 'app-store-cart-header',
  templateUrl: './store-cart-header.component.html',
  styleUrls: ['../_store-cart.scss']
})

export class StoreCartHeaderComponent {

  homeLink: string = '';
  productNumber: number = 0;
  storeName: string = 'STORE NAME';
  isNavigationShow: boolean = false;

  constructor(private router: Router,
              private storeService: StoreService) {
    this.homeLink = '/shop/templates/preview/3';
  }

  changeShowMenu() {
    this.isNavigationShow = !this.isNavigationShow;
  }


}
