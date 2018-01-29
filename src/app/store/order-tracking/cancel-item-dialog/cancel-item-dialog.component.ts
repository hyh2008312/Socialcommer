import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrderTrackingService } from '../order-tracking.service';

@Component({
  selector: 'app-order-cancel-item-dialog',
  templateUrl: './cancel-item-dialog.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class CancelItemDialogComponent implements OnInit {

  orderForm : FormGroup;

  orderFormErr: any = false;

  reasons: any = [{
    name: "Order Created by Mistake"
  }, {
    name: "I Don't Want It Anymore"
  }, {
    name: "Found Cheaper Item Somewhere Else"
  }, {
    name: "Need to Change My Order Information"
  }, {
    name: "Other"
  }];

  constructor(
    public dialogRef: MatDialogRef<CancelItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderTrackingService: OrderTrackingService
  ) {
    this.orderForm = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  cancelItem() {
    if(this.orderForm.invalid) {
      return;
    }
    let order = {
      id: this.data.order.id,
      number: this.data.number,
      email: this.data.email,
      reason: this.orderForm.value.reason
    };
    let self = this;
    self.orderTrackingService.cancelOrder(order).then((data) => {
      self.data.isCancel = true;
      self.data.order = data;
    });
  }

}
