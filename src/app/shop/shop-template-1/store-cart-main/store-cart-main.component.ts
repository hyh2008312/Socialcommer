import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';

@Component({
  selector: 'app-store-cart-main',
  templateUrl: './store-cart-main.component.html',
  styleUrls: ['../_store-cart.scss']
})

export class StoreCartMainComponent implements OnInit {

  homeLink: string = '';

  isTotalDialogOpen: boolean = false;

  storeId: any = '';

  currency: string = 'USD';

  countries: any[];

  countryName: any = '';

  countryId: number = 1;

  products: any;

  shippingList: any;

  displayName: any = '';

  subTotalPrice: number = 0;

  shippingTotalPrice: number = 0;


  totalPrice: number = 0;

  cartErr: any = false;

  //是否为新手引导
  isGuide: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,) {

  }

  ngOnInit() {
    let url = this.router.url;
    this.isGuide = url.indexOf('guide/preview') >= 0;
    let self = this;
    if(this.isGuide){
      self.homeLink = `/shop/guide/preview/1`;
    }else {
      self.homeLink = `/shop/templates/preview/1`;
    }

  }

  openDialog() {
    this.isTotalDialogOpen = !this.isTotalDialogOpen;
  }
}
