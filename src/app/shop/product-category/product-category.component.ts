import { Component, OnInit, OnDestroy, Inject} from '@angular/core';

import { ShopService } from '../shop.service';
import { UserService } from  '../../shared/services/user/user.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryCreateDialogComponent } from '../category-create-dialog/category-create-dialog.component';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['../shop.scss']
})

export class ProductCategoryComponent implements OnInit {


  // MatPaginator Inputs
  length:number = 0;
  pageSize = 12;
  pageSizeOptions = [6, 12];

  category: any = false;
  categoryIndex = 1;

  userCategory: any;

  constructor(
    private shopService: ShopService,
    private dialog: MatDialog,
    private userService: UserService
  ) {

  }

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    this.categoryIndex = event.pageIndex + 1;
    this.changeCategory();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  ngOnInit():void {
    let self = this;
    self.changeCategory();

    self.userService.userCategory.subscribe((data) => {
      if(data) {
        self.userCategory = data;
      }
    })
  }

  ngOnDestroy() {

  }

  changeCategory() {
    let page = this.categoryIndex;

    let self = this;
    self.shopService.getProductCategoryList({
      page: page,
      page_size: this.pageSize
    }).then((data) => {
      self.length = data.count;
      self.category = data.results;

    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CategoryCreateDialogComponent, {
      data: {
        category : this.category
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      self.userCategory = [];
      for(let value of self.category) {
        self.userCategory.push({
          id: value.id,
          name: value.name
        })
      }
      self.userService.addUserCategory(self.userCategory);
    });
  }

  categoryChange(event) {
    switch(event.event) {
      case 'delete':

        this.category.splice(event.index,1);

        let _index = this.userCategory.findIndex((data) => {
          return data.id == event.category.id;
        });
        this.userCategory.splice(_index,1);
        this.userService.addUserCategory(this.userCategory);
        break;
      case 'edit':
        this.category.splice(event.index,1, event.category);

        let _index1 = this.userCategory.findIndex((data) => {
          return data.id == event.category.id;
        });
        this.userCategory.splice(_index1,1, {
          name: event.category.name,
          id: event.category.id
        });

        this.userService.addUserCategory(this.userCategory);
        break;
    }


  }

}
