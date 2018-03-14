import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-store-product-share-dialog',
  templateUrl: './product-share-dialog.component.html',
  styleUrls: ['../shop.scss']
})

export class ProductShareDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProductShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

}
