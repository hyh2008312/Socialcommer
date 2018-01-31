import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { OrderTrackingService } from '../order-tracking.service';

@Component({
  selector: 'app-order-tracking-information-dialog',
  templateUrl: './tracking-information-dialog.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class TrackingInformationDialogComponent implements OnInit {


  orderFormErr: any = false;

  status: number = 0;

  constructor(
    public dialogRef: MatDialogRef<TrackingInformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderTrackingService: OrderTrackingService
  ) {
    if(this.data.order.returnOrder) {

    } else {
      switch (this.data.order.status) {
        case 'Unfulfilled':
          this.status = 1;
          break;
        case 'Fulfilled':
          this.status = 2;
          if(this.data.order.isArrival) {
            this.status = 3;
          }
          break;
      }
    }

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

}
