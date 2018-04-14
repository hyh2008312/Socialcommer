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
//是否为新手引导
  isGuide: boolean = false;

  constructor(private router: Router,
              private storeService: StoreService) {
    let url = this.router.url;
    this.isGuide = url.indexOf('guide/preview') >= 0;
    if (this.isGuide) {
      this.homeLink = '/shop/guide/preview/2';
    } else {
      this.homeLink = '/shop/templates/preview/2';
    }
  }

  changeShowMenu() {
    this.isNavigationShow = !this.isNavigationShow;
  }

  jumpCart(): void {
    if (this.isGuide) {
      this.router.navigate([`/shop/guide/preview/2/cart`]);
    } else {
      this.router.navigate([`/shop/templates/preview/2/cart`]);
    }
  }

  jumpOrder(): void {
    if(this.isGuide){
      this.router.navigate([`/shop/guide/preview/2/order`]);
    }else {
      this.router.navigate([`/shop/templates/preview/2/order`]);
    }
  }

}
