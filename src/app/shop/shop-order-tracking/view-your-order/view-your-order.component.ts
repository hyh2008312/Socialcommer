import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopOrderTrackingService } from '../shop-order-tracking.service';

@Component({
  selector: 'app-shop-view-your-order',
  templateUrl: './view-your-order.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class ViewYourOrderComponent{

  order: any = {
    totalCommissions: 0,
    totalExclTax: 0,
    shippingExclTax: 0,
    currency: 'usd'
  };
  created: any;

  emailAddress: any;
  trackingNumber: any;

  totalPrice: number = 0;

  constructor(
    private orderTrackingService: ShopOrderTrackingService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.snapshot.params['id'];

    this.orderTrackingService.getOrderDetail({
      id
    }).then((data) => {
      this.order = this.reSetOrder(data);
      this.created = data.lines[0].created;
      this.emailAddress = data.emailAddress;
      this.trackingNumber = data.number;
      this.totalPrice = parseFloat(this.order.totalExclTax) + parseFloat(this.order.shippingExclTax);
    });
  }


  viewInvoice() {
    this.orderTrackingService.getInvoice({
      id: this.order.id
    }).then((data) => {
      window.open(data.invoiceUrl);
    });
  }

  reSetOrder(order) {
    let supplierArray = [];
    let lineObject: any = {};
    for(let value of order.lines) {
      let index = supplierArray.findIndex((item) => {
        return item == value.supplierName;
      });
      if(index == -1) {
        if(!lineObject[value.supplierName]) {
          lineObject[value.supplierName] = [];
        }
        supplierArray.push(value.supplierName);
      }
      lineObject[value.supplierName].push(value);
    }
    let newLineArray = [];
    for(let k in lineObject) {
      let item = {
        supplier: k,
        lines: lineObject[k]
      };
      newLineArray.push(item);
    }
    order.supplyLine = newLineArray;

    return order;
  }
}
