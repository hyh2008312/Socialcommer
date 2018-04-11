import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-store-store-to-reward-dialog',
  templateUrl: './store-to-reward-dialog.component.html',
  styleUrls: ['./_store-to-reward-dialog.scss']
})

export class StoreToRewardDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StoreToRewardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

}
