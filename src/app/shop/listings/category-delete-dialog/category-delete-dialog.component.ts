import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ShopService } from '../shop.service';

@Component({
  selector: 'app-category-delete-dialog',
  templateUrl: './category-delete-dialog.component.html',
  styleUrls: ['../_shop.scss']
})

export class CategoryDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CategoryDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shopService: ShopService
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  deleteCategory() {
    let self = this;
    self.shopService.deleteProductCategory({
      id: self.data.category.id
    }).then((data) => {
      self.data.isDelete = true;
      self.close();
    });
  }

}
