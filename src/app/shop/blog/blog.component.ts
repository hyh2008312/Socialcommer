import { Component, OnInit, OnDestroy, Inject} from '@angular/core';

import { ShopService } from '../shop.service';
import { UserService } from  '../../shared/services/user/user.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BlogCreateDialogComponent } from '../blog-create-dialog/blog-create-dialog.component';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['../shop.scss']
})

export class BlogComponent implements OnInit {


  // MatPaginator Inputs
  length:number = 0;
  pageSize = 12;
  pageSizeOptions = [6, 12];

  blog: any = false;
  blogIndex = 1;

  selectedIndex: number = 0;

  constructor(
    private shopService: ShopService,
    private dialog: MatDialog,
    private userService: UserService
  ) {

  }

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    this.blogIndex = event.pageIndex + 1;
    this.changeBlog();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  ngOnInit():void {
    let self = this;
    self.changeBlog();

  }

  ngOnDestroy() {

  }

  changeBlog() {
    let page = this.blogIndex;

    let self = this;
    self.shopService.getBlog({
      page: page,
      page_size: this.pageSize
    }).then((data) => {
      self.length = data.count;
      self.blog = data.results;

    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(BlogCreateDialogComponent, {
      data: {
        blog : this.blog
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  categoryChange(event) {
    switch(event.event) {
      case 'delete':

        this.blog.splice(event.index,1);

        break;
      case 'edit':
        this.blog.splice(event.index,1, event.category);

        break;
    }


  }

}
