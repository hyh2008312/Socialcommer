import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store } from '../../store';

@Component({
  selector: 'app-store-template-3-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class HomePageComponent implements OnInit {
  public categories:any = [];
  public category: any = {
    id: null,
    name : ''
  };
  public shareLink: string;
  public text = '';

  baseImageUrl: string = 'https://media.socialcommer.com/source/web/template/3/15-pic.jpg';

  store: Store = new Store();
  contextList: any = {};
  imageList: any = {};
  page = 1;
  nextPage: boolean = true;
  nextBlogPage: boolean = true;
  product: any = [];

  blog: any = [];

  ownerId: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {
    this.shareLink = window.location.href;

    let self = this;

    this.storeService.store.subscribe((data) => {
      if(data) {
        self.store = data;
        self.contextList = data.context?data.context: {};
        self.imageList = data.image?data.image:{};
        self.text = data.description;
        self.ownerId = data.ownerId;
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        if(data.category.length > 1) {
          self.categories = [{name: 'All'}, ...data.category];
        } else {
          self.categories = [...data.category];
        }
        self.category = self.categories[0];

        self.storeService.pageView({
          pageType: 'store',
          viewTime: new Date().getTime(),
          storeId: data.id
        });

        self.queryProduct();
        self.queryBlog();
      }
    });
  }

  queryProduct(clearProduct?:boolean) {
    if(this.categories.length <= 0) {
      return;
    }
    let options = {
      categoryId: this.category.id,
      storeId: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 4
    };
    let self = this;
    self.storeService.getProductList(options).then((data)=>{
      if(clearProduct) {
        self.product = [];
        self.nextPage = true;
      }
      self.product = self.product.concat(data.results);
      if(data.next == null) {
        self.nextPage = false;
      }
    });
  }

  queryBlog(clearBlog?:boolean) {
    if(!this.ownerId) {
      return;
    }
    let options = {
      ownerId: this.ownerId,
      page: this.page,
      page_size: 2
    };
    let self = this;
    self.storeService.getBlog(options).then((data)=>{
      if(clearBlog) {
        self.blog = [];
        self.nextBlogPage = true;
      }
      self.blog = self.blog.concat(data.results);
      if(data.next == null) {
        self.nextBlogPage = false;
      }
    });
  }

  jumpToCollection() {
    this.router.navigate(['./list'],{relativeTo: this.activatedRoute});
  }

  jumpToBlog() {
    this.router.navigate(['./blog'],{relativeTo: this.activatedRoute});
  }
}
