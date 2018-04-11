import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-store-guide-bonus-dialog',
  templateUrl: './store-guide-bonus-dialog.component.html',
  styleUrls: ['./_store-guide-bonus-dialog.scss']
})

export class StoreGuideBonusDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StoreGuideBonusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

}
