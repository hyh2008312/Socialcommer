import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConstantService } from  '../../shared/services/constant/constant.service';

@Component({
  selector: 'app-product-affiliate-link-dialog',
  templateUrl: './product-affiliate-link-dialog.component.html',
  styleUrls: ['../shop.scss']
})

export class ProductAffiliateLinkDialogComponent implements OnInit {

  url: any = false;
  constructor(
    public dialogRef: MatDialogRef<ProductAffiliateLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private constant: ConstantService
  ) {

  }

  ngOnInit():void {
    if(this.data.source) {
      this.url = this.constant.getAffiliateLink()[this.data.source];
    }
  }

  close():void {
    this.dialogRef.close();
  }

}
