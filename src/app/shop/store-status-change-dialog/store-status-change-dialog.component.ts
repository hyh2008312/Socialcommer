import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-shop-store-status-change-dialog',
  templateUrl: './store-status-change-dialog.component.html',
  styleUrls: ['./_store-status-change-dialog.scss']
})

export class StoreStatusChangeDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<StoreStatusChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.data.status = false;
    this.dialogRef.close();
  }

  open() {
    this.data.status = true;
    this.dialogRef.close();
  }


}
