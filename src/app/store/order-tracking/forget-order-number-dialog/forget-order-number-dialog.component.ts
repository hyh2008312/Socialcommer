import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrderTrackingService } from '../order-tracking.service';

@Component({
  selector: 'app-order-forget-order-number-dialog',
  templateUrl: './forget-order-number-dialog.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class ForgetOrderNumberDialogComponent implements OnInit {

  orderForm : FormGroup;

  orderFormErr: any = false;

  modified: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ForgetOrderNumberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderTrackingService: OrderTrackingService
  ) {
    this.orderForm = this.fb.group({
      emailAddress: ['', Validators.required]
    });
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  checkoutEmail() {

  }

}
