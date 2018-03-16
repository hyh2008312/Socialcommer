import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store-cart-header',
  templateUrl: './store-cart-header.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class StoreCartHeaderComponent{

  homeLink: string = '';
  productNumber: number;
  displayName: string = '';
  storeName: string = '';
  isNavigationShow: boolean = false;

  constructor(
    private router: Router,
    private storeService: StoreService
  ) {

    this.storeService.store.subscribe((data) => {
      if(data) {
        let uid = data.templateId;
        this.storeName = data.name;
        if(data.template && data.template.nameTag) {
          this.storeName = data.template.nameTag;
        }
        this.homeLink = `/store/${data.displayName}/${uid}`;
        this.displayName = data.displayName;
        let products = this.storeService.getProductInCart(this.displayName);
        this.storeService.addProductToCart(this.displayName,products);
      }
    });

    this.storeService.cart.subscribe((data) => {
      if (data) {
        this.productNumber = 0;
        for (let item of data) {
          this.productNumber += parseInt(item.number);
        }
      }
    });
  }

  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }

  changeShowMenu() {
    this.isNavigationShow = !this.isNavigationShow;
  }
}
