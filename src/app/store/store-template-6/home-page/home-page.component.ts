import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-5-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../_store-template-6.scss']
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
  categoryProduct: any = [];

  categoryInfoList: any = [];

  isShowEmptyData: boolean = false;

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
        self.categoryInfoList = data.context.tempCategoryList;
        self.text = data.description;
        self.ownerId = data.ownerId;
        self.queryCategoryProduct();
        self.queryBlog();
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        self.storeService.pageView({
          pt: 'store',
          vt: new Date().getTime(),
          sid: data.id
        });

      }
    });
  }

  categoryImageList: any = [];

  queryCategoryProduct() {
    let self = this;
    self.categoryImageList = self.imageList.categoryImageList;
    self.storeService.getCategoryProduct(self.store.displayName).then((data) => {
      self.categoryProduct = data;
      if (self.categoryProduct.length > 0) {
        self.isShowEmptyData = false;
      } else {
        self.isShowEmptyData = true;
      }
      //设置主图的分类界面
      for (let i = 0; i < self.categoryProduct.length; i++) {
        if (self.categoryImageList.length > 0) {
          for (let j = 0; j < self.categoryImageList.length; j++) {
            if (self.categoryProduct[i].id === self.categoryImageList[j].id) {
              self.categoryProduct[i].imageCategoryPicture = self.categoryImageList[j].imageCategoryPicture;
              break;
            }
            if (j == self.categoryImageList.length - 1) {
              self.categoryProduct[i].imageCategoryPicture = 'https://media.socialcommer.com/source/web/template/6/wall-416060.jpg';
            }
          }
        } else {
          self.categoryProduct[i].imageCategoryPicture = 'https://media.socialcommer.com/source/web/template/6/wall-416060.jpg';
        }
      }
      //设置分类的标题 self.categoryInfoList（分类的信息）
      for (let i = 0; i < self.categoryProduct.length; i++) {
        for (let j = 0; j < self.categoryInfoList.length; j++) {
          if (self.categoryProduct[i].id == self.categoryInfoList[j].categoryId) {
            self.categoryProduct[i].categoryTitle = self.categoryInfoList[j].title;
            break;
          }
          if (j == self.categoryInfoList.length - 1) {
            self.categoryProduct[i].categoryTitle = self.defaultCategoryTitle(self.categoryProduct[i].name);
          }
        }
      }


    });
  }

  defaultCategoryTitle(mCategoryTitle: any): string {
    return `<p class="ql-align-center"><span class="ql-size-huge" style="color: rgb(255, 255, 255);">${mCategoryTitle}</span></p>`;
  }

  queryBlog(clearBlog?: boolean) {
    if (!this.ownerId) {
      return;
    }
    let options = {
      ownerId: this.ownerId,
      page: this.page,
      page_size: 4
    };
    let self = this;
    self.storeService.getBlog(options).then((data) => {
      if (clearBlog) {
        self.blog = [];
        self.nextBlogPage = true;
      }
      self.blog = self.blog.concat(data.results);
      if (data.next == null) {
        self.nextBlogPage = false;
      }
    });
  }

  jumpCategory(categoryId: number): void {
    this.router.navigate(['./category', categoryId], {relativeTo: this.activatedRoute});
  }

  jumpBlogList(): void {
    this.router.navigate(['./blog'], {relativeTo: this.activatedRoute});
  }

}
