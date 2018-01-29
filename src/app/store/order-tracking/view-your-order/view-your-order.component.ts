import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { OrderTrackingService } from '../order-tracking.service';

@Component({
  selector: 'app-order-view-your-order',
  templateUrl: './view-your-order.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class ViewYourOrderComponent{

  order: any;

  emailAddress: any;
  trackingNumber: any;

  totalPrice: number = 0;

  subscription: any;

  constructor(
    private orderTrackingService: OrderTrackingService
  ) {
    this.subscription = this.orderTrackingService.order.subscribe((data) => {
      this.order = data;
      this.emailAddress = data.emailAddress;
      this.trackingNumber = data.number;
      this.totalPrice = parseFloat(this.order.totalExclTax) + parseFloat(this.order.shippingExclTax);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
