import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-store-product-share-dialog',
  templateUrl: './product-share-dialog.component.html',
  styleUrls: ['../_shop.scss']
})

export class ProductShareDialogComponent implements OnInit {

  text: string = 'Don’t miss out on this new product in my store: ';

  constructor(
    public dialogRef: MatDialogRef<ProductShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.text = this.text + this.data.text;
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

}
