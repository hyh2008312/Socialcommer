import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store } from '../../store';

@Component({
  selector: 'app-shop-template-3-store-blog',
  templateUrl: './store-blog.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class StoreBlogComponent implements OnInit {
  page = 1;
  nextPage: boolean = true;
  blog: any = [{
    id: 0,
    title: 'Blog Title',
    cover: 'https://media.socialcommer.com/source/web/template/3/04-pic.jpg',
    context: 'Blog Description',
  },{
    id: 1,
    title: 'Blog Title',
    cover: 'https://media.socialcommer.com/source/web/template/3/06-pic.jpg',
    context: 'Blog Description',
  },{
    id: 2,
    title: 'Blog Title',
    cover: 'https://media.socialcommer.com/source/web/template/3/05-pic.jpg',
    context: 'Blog Description',
  },{
    id: 3,
    title: 'Blog Title',
    cover: 'https://media.socialcommer.com/source/web/template/3/02-pic.jpg',
    context: 'Blog Description',
  }];
  ownerId: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {
    let self = this;
    let firstLoad = false;
    this.storeService.store.subscribe((data) => {
      if(data && !firstLoad) {
        firstLoad = true;

        self.ownerId = data.ownerId;
      }
    });
  }

  jumpList():void {
    this.page++;
    this.queryBlog();
  }

  queryBlog(clearBlog?:boolean) {

  }


}
