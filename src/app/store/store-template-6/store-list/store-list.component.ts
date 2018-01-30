import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-5-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['../_store-template-6.scss']
})

export class StoreListComponent implements OnInit, OnDestroy {
  public text: string;
  product: any = [];
  id: number;
  categoryName: string='';
  sub: any;

  store: Store = new Store();
  page = 1;
  nextPage: boolean = false;
  imageCategoryPicture: string = '';

  categoryInfo: any = [];
  categoryInfoList: any = [];

  categoryTitle: string = '';
  categoryDescription: string = '';
  //默认的图片的模版
  defaultPicture: string = 'https://media.socialcommer.com/source/web/template/6/wall-416060.jpg';


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {
    // 1.可以通过id去和分类列表进行对比 2.可以用请求下来的商品中的categoryName的名字
    let self = this;
    self.sub = this.activatedRoute.params.subscribe(params => {
      self.id = parseInt(params['id']);
      if (self.store.id) {
        self.categoryName = self.getCategoryName();
        self.setCategoryImagePicture();
        self.changeCategory();
      } else {
        self.storeService.store.subscribe((data) => {
          if (data) {
            self.store = data;
            self.text = data.description;
            self.categoryName = self.getCategoryName();
            self.setCategoryImagePicture();
            self.storeService.addTitleDescription({
              title: data.name,
              description: data.description,
              shareImage: data.imageUrl
            });
            self.storeService.pageView({
              pageType: 'store',
              viewTime: new Date().getTime(),
              storeId: data.id
            });
            self.queryProduct();
          }
        });
      }
    });
  }

  setCategoryImagePicture(): void {
    this.categoryInfo = this.store.image.categoryImageList;
    if (this.categoryInfo.length > 0) {
      for (let i = 0; i < this.categoryInfo.length; i++) {
        if (this.id === this.categoryInfo[i].id) {
          this.imageCategoryPicture = this.categoryInfo[i].imageCategoryPicture;
          break;
        }
        if (i == this.categoryInfo.length - 1) {
          this.imageCategoryPicture = this.defaultPicture;
        }
      }
    }
    this.categoryInfoList = this.store.context.tempCategoryList;
    if (this.categoryInfoList.length > 0) {
      for (let i = 0; i < this.categoryInfoList.length; i++) {
        if (this.id === this.categoryInfoList[i].categoryId) {
          this.categoryTitle = this.categoryInfoList[i].title;
          this.categoryDescription = this.categoryInfoList[i].description;
          break;
        }
        if (i == this.categoryInfoList.length - 1) {
          this.categoryTitle = this.defaultCategoryTitle(this.categoryName);
        }
      }
    }
  }


  defaultCategoryTitle(mCategoryTitle: string): string {
    return `<p class="ql-align-center"><span class="ql-size-huge" style="color: rgb(255, 255, 255);">${mCategoryTitle}</span></p>`;
  }


  getCategoryName(): string {
    for (let index = 0; index < this.store.category.length; index++) {
      if (this.id === this.store.category[index].id) {
        return this.store.category[index].name;
      }
    }
    return '';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
  }


  changeCategory() {
    this.page = 1;
    this.queryProduct(true);
  }

  jumpList(): void {
    this.page++;
    this.queryProduct();
  }

  queryProduct(clearCategory?: boolean) {
    let options = {
      categoryId: this.id,
      storeId: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 8
    };
    let self = this;
    self.storeService.getProductList(options).then((data) => {
      if (clearCategory) {
        self.product = [];
        self.nextPage = true;
      }
      self.product = self.product.concat(data.results);
      if (data.next == null) {
        self.nextPage = false;
      } else {
        self.nextPage = true;
      }
    });
  }

}
