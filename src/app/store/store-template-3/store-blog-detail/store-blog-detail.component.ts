import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store, Blog } from '../../store';

@Component({
  selector: 'app-store-template-3-store-blog-detail',
  templateUrl: './store-blog-detail.component.html',
  styleUrls: ['./store-blog-detail.scss']
})

export class StoreBlogDetailComponent implements OnInit {
  public shareLink: string;
  public text = '';
  blog: Blog = new Blog;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {
    this.shareLink = window.location.href;

    let id = this.activatedRoute.snapshot.params['id'];
    let self = this;
    this.storeService.getBlogDetail(id).then((data) => {
      self.blog = data;
      self.text = data.title;
      self.storeService.addTitleDescription({
        title: data.title,
        description: data.description,
        shareImage: data.cover
      });

      self.storeService.pageViewBlog({
        viewTime: new Date().getTime(),
        blogId: data.id
      });
    });
  }


}
