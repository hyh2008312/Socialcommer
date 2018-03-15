import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store } from '../../store';

@Component({
  selector: 'app-store-template-3-store-blog',
  templateUrl: './store-blog.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class StoreBlogComponent implements OnInit {
  page = 1;
  nextPage: boolean = true;
  blog: any = [];
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

        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: false
        });

        self.storeService.pageView({
          pt: 'store',
          vt: new Date().getTime(),
          sid: data.id
        });

        self.ownerId = data.ownerId;
        self.queryBlog();
      }
    });
  }

  jumpList():void {
    this.page++;
    this.queryBlog();
  }

  queryBlog(clearBlog?:boolean) {
    if(!this.ownerId) {
      return;
    }
    let options = {
      ownerId: this.ownerId,
      page: this.page,
      page_size: 12
    };
    let self = this;
    self.storeService.getBlog(options).then((data)=>{

      if(clearBlog) {
        self.blog = [];
        self.nextPage = true;
      }
      self.blog = self.blog.concat(data.results);
      if(data.next == null) {
        self.nextPage = false;
      }
    });
  }


}
