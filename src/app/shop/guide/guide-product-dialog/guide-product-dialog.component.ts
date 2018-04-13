import {Component, Inject, OnInit} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { GuideService } from '../guide.service';
import { UserService } from '../../../shared/services/user/user.service';


@Component({
  selector: 'app-shop-guide-product-dialog',
  templateUrl: './guide-product-dialog.component.html',
  styleUrls: ['../_guide.scss']
})

export class GuideProductDialogComponent implements OnInit {


  constructor(
    private guideService: GuideService,
    private userService: UserService,
    public dialogRef: MatDialogRef<GuideProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.getProductList(this.data.productList.id);
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  getProductList(categoryId) {
    this.guideService.getCategoryProductList(categoryId).then((data) => {
      this.data.productList.addProducts = [...data.products];
    });
  }

}
