import { Component, OnInit, Inject, ElementRef } from '@angular/core';
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
    this.text = this.text + this.data.text + ' Product link:' + this.data.shareLink;
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  copy($event) {
    let self = this;
    let save = function (e){
      e.clipboardData.setData('text/plain',self.text);
      e.preventDefault();//阻止默认行为
    };
    document.addEventListener('copy',save);
    document.execCommand("copy");
  }

}
