import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

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

  subscription: any;

  constructor(
    private shopService: ShopService,
    private dialog: MatDialog,
    private userService: UserService,
    private router : Router,
    private activatedRoute: ActivatedRoute
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

    self.subscription = self.activatedRoute.queryParams.subscribe((data)=> {
      if(data.tab == 'published') {
        self.selectedIndex = 0;
        self.changeBlog();
      }
      if(data.tab == 'draft') {
        self.selectedIndex = 1;
        self.changeBlog();
      }
      if(data.tab == null) {
        self.changeBlog();
      }
    });

    this.router.events.subscribe(s => {
      if (s instanceof NavigationStart) {
        if(s.url.split('?')[0] == '/shop/blog') {
          self.subscription = self.activatedRoute.queryParams.subscribe((data)=> {
            if(data.tab == 'published') {
              self.selectedIndex = 0;
              self.changeBlog();
            }
            if(data.tab == 'draft') {
              self.selectedIndex = 1;
              self.changeBlog();
            }
            if(data.tab == null) {
              self.changeBlog();
            }
          });
        } else {
          self.subscription.unsubscribe();
        }
      }
    });

    self.shopService.currentBlogTab.subscribe((data) => {
      self.selectedIndex = data;
    });
  }

  changeBlog() {
    let page = this.blogIndex;

    let self = this;

    let status = '';
    switch (this.selectedIndex) {
      case 0:
        status = 'published';
        break;
      case 1:
        status = 'editing';
        break;
    }
    self.shopService.getBlog({
      page: page,
      page_size: this.pageSize,
      status
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
