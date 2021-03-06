import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-store-template-3-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class HomePageComponent implements OnInit {
  public categories: any = [];
  public category: any = {
    id: null,
    name: ''
  };
  public shareLink: string;
  public text = '';

  baseImageUrl: string = 'https://media.socialcommer.com/source/web/template/3/15-pic.jpg';

  store: Store = new Store();
  contextList: any = {};
  imageList: any = {};
  page = 1;
  blogPage=1;
  nextPage: boolean = true;
  nextBlogPage: boolean = true;
  product: any = [];

  blog: any = [];

  ownerId: any;
  isHaveBlog: boolean = false;
  currency: string = 'USD';

  showBlogFlag: number = 1;

  //是否显示根据两者条件
  isBlog: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

    let self = this;

    this.storeService.store.subscribe((data) => {
      if (data) {
        self.store = data;
        self.contextList = data.context ? data.context : {};

        if (data.context && data.context.blogFlag) {
          self.showBlogFlag = data.context.blogFlag;
        }
        self.imageList = data.images ? data.images : {};
        self.text = data.description;
        self.ownerId = data.ownerId;
        self.currency = data.currency.toUpperCase();
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        if (data.category.length > 1) {
          self.categories = [{name: 'All'}, ...data.category];
        } else {
          self.categories = [...data.category];
        }
        self.category = self.categories[0];

        self.storeService.pageView({
          pt: 'store',
          vt: new Date().getTime(),
          sid: data.id
        });

        self.queryProduct();
        self.queryBlog();
      }
    });
  }

  queryProduct(clearProduct?: boolean) {
    if (this.categories.length <= 0) {
      this.nextPage = false;
      return;
    }
    let options = {
      cat: this.category.id,
      store: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 48
    };
    let self = this;
    self.storeService.getProductList(options).then((data) => {
      if (clearProduct) {
        self.product = [];
        self.nextPage = true;
      }
      self.product = self.product.concat(data.results);
      if (data.next == null) {
        self.nextPage = false;
      }
    });
  }

  queryBlog(clearBlog?: boolean) {
    if (!this.ownerId) {
      return;
    }
    let options = {
      ownerId: this.ownerId,
      page: this.blogPage,
      page_size: 2
    };
    let self = this;
    self.storeService.getBlog(options).then((data) => {
      if (clearBlog) {
        self.blog = [];
        self.nextBlogPage = true;
      }
      self.blog = self.blog.concat(data.results);
      this.isHaveBlog = !(data.count === 0);
      if (data.next == null) {
        self.nextBlogPage = false;
      }
      // 当为1：未设定 2 显示 3 不显示
      if (self.showBlogFlag == 1) {
        self.isBlog = self.isHaveBlog;
      } else if (self.showBlogFlag == 2) {
        self.isBlog = true;
      } else if (self.showBlogFlag == 3) {
        self.isBlog = false;
      }
    });
  }

  jumpToCollection() {
    this.page++ ;
    this.queryProduct();
  }

  jumpToBlog() {
    this.router.navigate(['./blog'], {relativeTo: this.activatedRoute});
  }
}
