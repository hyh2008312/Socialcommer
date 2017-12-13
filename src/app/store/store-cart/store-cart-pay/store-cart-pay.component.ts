import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { ConstantService } from  '../../../shared/services/constant/constant.service';

@Component({
  selector: 'app-store-cart-pay',
  templateUrl: './store-cart-pay.component.html',
  styleUrls: ['../store-cart.scss']
})

export class StoreCartPayComponent implements OnInit{

  homeLink:string = '';

  isTotalDialogOpen: boolean = false;

  country: string;
  countries: Object[];

  payMethod: string = 'Credit Card';

  payMethodItem = {
    content: 'Credit Card',
    display: true
  };

  payMethodList = [{
    content: 'Credit Card',
    display: true
  }, {
    content: 'Paypal',
    display: false
  }];

  shippingMethod: string = 'Same as shipping address';

  shippingMethodItem = {
    content: 'Same as shipping address',
    display: false
  };

  shippingMethodList = [{
    content: 'Same as shipping address',
    display: false
  }, {
    content: 'Use a different billing address',
    display: true
  }];

  constructor(
    overlayContainer: OverlayContainer,
    private storeService: StoreService,
    private constant: ConstantService
  ) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    this.countries = this.constant.getCountries();
  }

  ngOnInit() {
    let self = this;

    self.storeService.store.subscribe((data) => {
      if(data) {
        let uid = data.templateId == 1? data.templateId:data.uid;
        self.homeLink = `/store/${data.displayName}/${uid}`;
      }
    });
  }

  changePayMethod($event) {
    for(let value of this.payMethodList) {
      if(value.content == $event) {
        this.payMethod = $event;
        this.payMethodItem = value;
        break;
      }
    }
  }

  changeShippingMethod($event) {
    for(let value of this.shippingMethodList) {
      if(value.content == $event) {
        this.shippingMethod = $event;
        this.shippingMethodItem = value;
        break;
      }
    }
  }

  openDialog() {
    this.isTotalDialogOpen = !this.isTotalDialogOpen;
  }

}
