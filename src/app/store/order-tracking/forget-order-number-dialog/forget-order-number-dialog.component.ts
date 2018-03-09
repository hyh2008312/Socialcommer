import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrderTrackingService } from '../order-tracking.service';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-order-forget-order-number-dialog',
  templateUrl: './forget-order-number-dialog.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class ForgetOrderNumberDialogComponent implements OnInit {

  orderForm : FormGroup;

  orderFormErr: any = false;

  modified: boolean = false;

  store: any = {};
  sub: any;

  constructor(
    public dialogRef: MatDialogRef<ForgetOrderNumberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderTrackingService: OrderTrackingService,
    private storeService: StoreService
  ) {
    this.orderForm = this.fb.group({
      email: ['', Validators.required]
    });

    this.storeService.store.subscribe((data) => {
      if(data) {
        this.store = data;
      }
    })
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  checkoutEmail() {
    let self = this;
    if(this.orderForm.invalid) {
      return;
    }
    let order: any = this.orderForm.value;
    order.sid = this.store.id;
    this.orderTrackingService.forgetOrderNumber(order).then((data) => {
      self.modified = true;
    });
  }

}
