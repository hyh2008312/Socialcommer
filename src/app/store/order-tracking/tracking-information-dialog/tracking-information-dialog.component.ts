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

  modified: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TrackingInformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderTrackingService: OrderTrackingService
  ) {
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

}
