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
  @Input() productNumber: number;
  displayName: string = '';

  constructor(
    private storeService: StoreService
  ) {

    this.storeService.store.subscribe((data) => {
      if(data) {
        let uid = data.templateId;
        this.homeLink = `/store/${data.displayName}/${uid}`;
        this.displayName = data.displayName;
      }
    });
  }

  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }

}
