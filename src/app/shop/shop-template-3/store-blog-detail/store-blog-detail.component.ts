import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store, Blog } from '../../store';

@Component({
  selector: 'app-shop-template-3-store-blog-detail',
  templateUrl: './store-blog-detail.component.html',
  styleUrls: ['./store-blog-detail.scss']
})

export class StoreBlogDetailComponent implements OnInit {
  public shareLink: string;
  public text = '';
  blog: any;

  context = 'Write an awesome blog to engage your customers and drive traffic to your store!';

  blogList: any = [{
    id: 0,
    title: 'Blog Title',
    cover: 'https://media.socialcommer.com/source/web/template/3/04-pic.jpg'
  },{
    id: 1,
    title: 'Blog Title',
    cover: 'https://media.socialcommer.com/source/web/template/3/06-pic.jpg'
  },{
    id: 2,
    title: 'Blog Title',
    cover: 'https://media.socialcommer.com/source/web/template/3/05-pic.jpg'
  },{
    id: 3,
    title: 'Blog Title',
    cover: 'https://media.socialcommer.com/source/web/template/3/02-pic.jpg'
  }];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {
    this.shareLink = window.location.href;

    let id = this.activatedRoute.snapshot.params['id'];
    this.blog = this.blogList[id];
  }


}
