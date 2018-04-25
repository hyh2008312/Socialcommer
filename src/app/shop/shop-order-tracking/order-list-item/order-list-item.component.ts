import {Input, Output, Component, OnInit, OnChanges, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';

import {OverlayContainer} from '@angular/cdk/overlay';
import {ShopOrderTrackingService} from '../shop-order-tracking.service';

@Component({
  selector: 'app-shop-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class OrderListItemComponent implements OnInit {

  @Input() order: any;
  @Input() index: number = 0;
  @Output() orderChange = new EventEmitter<any>();

  constructor(
    private orderTrackingService: ShopOrderTrackingService,
    private router: Router,
    private  activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    overlayContainer: OverlayContainer
  ) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }

  ngOnInit(): void {


  }

  ngOnChanges() {

  }

  delete() {
    let self = this;
    self.orderTrackingService.deleteOrder(self.order).then(() => {
      self.orderChange.emit({
        index: self.index,
        status: 'delete',
        order: self.order
      });
    });
  }

  jumpCheckout() {
    this.orderTrackingService.addCartOrder(true);
    this.router.navigate([`/shop/cart/checkout/${this.order.id}`]);
  }

}
