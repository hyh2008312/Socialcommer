import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShopOrderTrackingService } from '../shop-order-tracking.service';

@Component({
  selector: 'app-shop-return-request-dialog',
  templateUrl: './return-request-dialog.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class ReturnRequestDialogComponent implements OnInit {

  orderReturnForm: FormGroup;

  orderReturnFormErr: any = false;

  modified: boolean = false;

  requestTypeList: any = [{
    code: 'Refund',
    name: 'Return for Refund'
  }, {
    code: 'Exchange',
    name: 'Return for Item Exchange'
  }];

  productQuantity: number = 0;

  isRefund: boolean = true;

  reasonList: any = [
    'Package Arrived Damaged',
    'Package Arrived Incomplete',
    'Warning Item was Delivered',
    'Item Not the Same as Described',
    'Item Arrived too Late'
  ];

  previewImgFile: any;
  previewImgSrcs: any;

  constructor(
    public dialogRef: MatDialogRef<ReturnRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderTrackingService: ShopOrderTrackingService
  ) {
    this.productQuantity = this.data.order.quantity;

    this.orderReturnForm = this.fb.group({
      type: ['', Validators.required],
      reason: ['', Validators.required],
      comments: ['', Validators.required]
    });
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  minusNumber(): void {
    if(this.productQuantity > 1) {
      this.productQuantity--;
    }
  }
  plusNumber(): void {
    if(this.productQuantity < this.data.order.quantity) {
      this.productQuantity++;
    }
  }

  changeNumber($event) {
    if($event == 'Refund') {
      this.isRefund = true;
      this.productQuantity = this.data.order.quantity;
    } else {
      this.isRefund = false;
    }
  }

  returnRequest() {
    if(this.orderReturnForm.invalid) {
      return;
    }

    let order = this.orderReturnForm.value;
    order.id = this.data.order.id;
    order.number = this.data.number;
    order.email = this.data.email;
    order.quantity = this.productQuantity;
    order.annex = this.previewImgFile;
    if(!order.annex || order.annex == '') {
      this.orderReturnFormErr = 'Your picture is still uploading. Please wait a bit!';
      return;
    }
    let self = this;
    self.orderTrackingService.returnRequest(order).then((data) => {
      self.orderReturnFormErr = false;
      self.data.isReturn = true;
      self.data.order = data;
      self.close();
    }).catch((data) => {
      self.orderReturnFormErr = data;
    });
  }
}
