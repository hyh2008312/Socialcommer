import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrderTrackingService } from '../order-tracking.service';

@Component({
  selector: 'app-order-return-request-dialog',
  templateUrl: './return-request-dialog.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class ReturnRequestDialogComponent implements OnInit {

  orderReturnForm: FormGroup;

  orderReturnFormErr: any = false;

  modified: boolean = false;

  requestTypeList: any = ['Return for Refund', 'Return for Item Exchange'];

  productQuantity: number = 2;

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
    private orderTrackingService: OrderTrackingService
  ) {
    this.orderReturnForm = this.fb.group({
      type: ['', Validators.required],
      reason: ['', Validators.required],
      comment: ['', Validators.required],
      attachment: ['', Validators.required]
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
    if(this.productQuantity < 2) {
      this.productQuantity++;
    }
  }
}
