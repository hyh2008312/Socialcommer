import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-4-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../_store-template-4.scss']
})

export class HomePageComponent implements OnInit {
  imageBanner: string = 'https://media.socialcommer.com/source/web/template/4/12.jpg';
  public categories: any = [];
  public category: any = {
    id: null,
    name: ''
  };
  public shareLink: string;
  public text = '';
  store: Store = new Store();
  contextList: any = {};
  imageList: any = {};
  page = 1;
  nextPage: boolean = true;
  nextBlogPage: boolean = true;
  product: any = [];
  blog: any = [];
  ownerId: any;
  // 这个是分类的3个
  selectCategoryOne: any;
  selectCategoryTwo: any;
  selectCategoryThree: any;
  isHaveBlog: boolean = false;
  currency: string = 'USD';

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
        self.imageList = data.images ? data.images : {};
        self.text = data.description;
        self.ownerId = data.ownerId;
        self.currency = data.currency.toUpperCase();
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        // 分类广告
        if (data.category.length == 1) {
          self.selectCategoryOne = data.category[0];
        } else if (data.category.length == 2) {
          self.selectCategoryOne = data.category[0];
          self.selectCategoryTwo = data.category[1];
        } else if (data.category.length == 3) {
          self.selectCategoryOne = data.category[0];
          self.selectCategoryTwo = data.category[1];
          self.selectCategoryThree = data.category[2];
        } else if (data.category.length > 3) {
          self.selectCategoryOne = data.category[data.category.length - 3];
          self.selectCategoryTwo = data.category[data.category.length - 2];
          self.selectCategoryThree = data.category[data.category.length - 1];
        }
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
    let options = {
      cat: null,
      store: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 6
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
      page: this.page,
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
    });
  }

  jumpCategory(categoryIndex: number): void {

    let categoryId: any;
    switch (categoryIndex) {
      case 1:
        categoryId = this.selectCategoryOne.id;
        break;
      case 2:
        categoryId = this.selectCategoryTwo.id;
        break;
      case 3:
        categoryId = this.selectCategoryThree.id;
        break;
    }
    this.router.navigate(['./list'], {queryParams: {'categoryId': categoryId}, relativeTo: this.activatedRoute});
  }

  jumpProductList(): void {
    this.router.navigate(['./list'], {relativeTo: this.activatedRoute});
  }

  jumpBlogList(): void {
    this.router.navigate(['./blog'], {relativeTo: this.activatedRoute});
  }

}
