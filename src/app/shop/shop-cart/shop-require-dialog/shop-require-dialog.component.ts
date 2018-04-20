import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-shop-require-dialog',
  templateUrl: './shop-require-dialog.component.html',
  styleUrls: ['../_shop-cart.scss']
})

export class ShopRequireDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<ShopRequireDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {}

  close():void {
    this.dialogRef.close();
  }

}
