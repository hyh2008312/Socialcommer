import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { ProductShareSuccessComponent } from '../product-share-success/product-share-success.component';

@Component({
  selector: 'app-store-product-share-dialog',
  templateUrl: './product-share-dialog.component.html',
  styleUrls: ['../_shop.scss']
})

export class ProductShareDialogComponent implements OnInit {

  text: string = 'Don’t miss out on this new product in my store: ';

  title: string = 'Youtube Channel';

  constructor(
    public dialogRef: MatDialogRef<ProductShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    this.text = this.text + this.data.text + '; Follow this link to get a discount today:  ' + this.data.shareLink;

    if(this.data.status == 1) {
      this.title = 'Instagram'
    }
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  copy($event) {
    this.openCopyBar();
  }

  openCopyBar() {
    this.snackBar.openFromComponent(ProductShareSuccessComponent, {
      duration: 1500,
      verticalPosition: 'top'
    });
  }

}
