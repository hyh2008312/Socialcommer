import {Input, Output, Component, OnInit, OnChanges, EventEmitter, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';

import {OverlayContainer} from '@angular/cdk/overlay';
import {ShopOrderTrackingService} from '../shop-order-tracking.service';

import {ChangeShippingAddressDialogComponent} from '../change-shipping-address-dialog/change-shipping-address-dialog.component';
import {CancelItemDialogComponent} from '../cancel-item-dialog/cancel-item-dialog.component';
import {TrackingInformationDialogComponent} from '../tracking-information-dialog/tracking-information-dialog.component';
import {ReturnRequestDialogComponent} from '../return-request-dialog/return-request-dialog.component';

@Component({
  selector: 'app-shop-order-detail-item',
  templateUrl: './order-detail-item.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class OrderDetailItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() order: any;
  @Input() email: any;
  @Input() number: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  productLink: any = '';
  sub: any;

  currency: string = 'USD';

  totalAmount: number = 0;

  netPaymentAmount: number = 0;

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
    if (this.order) {
      this.totalAmount = (parseFloat(this.order.priceExclTax) + parseFloat(this.order.shippingExclTax)) * this.order.quantity;
      if (this.order.returnOrder) {
        if (this.order.returnOrder.status == 'Partially Refunded' || this.order.returnOrder.status == 'Refunded') {
          this.netPaymentAmount = this.totalAmount - this.order.refundAmount;
        }
      }
      this.currency = this.order.currency.toUpperCase();
    }
  }

  cancelItem() {
    let dialogRef = this.dialog.open(CancelItemDialogComponent, {
      data: {
        order: this.order,
        email: this.email,
        number: this.number,
        isCancel: false
      }
    });

    let self = this;
    dialogRef.afterClosed().subscribe(result => {
      if (dialogRef.componentInstance.data.isCancel == true) {
        self.order = dialogRef.componentInstance.data.order;
        self.productChange.emit({
          index: self.index,
          order: self.order,
          event: 'cancel'
        });
      }
    });
  }

  changeShippingAddress() {
    let dialogRef = this.dialog.open(ChangeShippingAddressDialogComponent, {
      data: {
        order: this.order,
        email: this.email,
        number: this.number,
        isAddressChange: false
      }
    });

    let self = this;
    dialogRef.afterClosed().subscribe(result => {
      if (dialogRef.componentInstance.data.isAddressChange == true) {
        self.order = dialogRef.componentInstance.data.order;
        self.productChange.emit({
          index: self.index,
          order: self.order,
          event: 'change address'
        });
      }
    });
  }

  trackingInformation() {
    let dialogRef = this.dialog.open(TrackingInformationDialogComponent, {
      data: {
        order: this.order
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  returnItem() {
    let dialogRef = this.dialog.open(ReturnRequestDialogComponent, {
      data: {
        order: this.order,
        email: this.email,
        number: this.number,
        isReturn: false
      }
    });

    let self = this;
    dialogRef.afterClosed().subscribe(result => {
      if (dialogRef.componentInstance.data.isReturn == true) {
        self.order = dialogRef.componentInstance.data.order;
        self.productChange.emit({
          index: self.index,
          order: self.order,
          event: 'return request'
        });
      }
    });
  }

  // 跳转到私信列表
  jumpCustomerService() {
    this.router.navigate([`./message/${this.order.id}`], {
      relativeTo: this.activatedRoute
    });
  }

}
