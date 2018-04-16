import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-store-template-1',
  templateUrl: './main-page.component.html',
  styleUrls: ['../../store.scss', '../../../shop/shop.scss']
})

export class MainPageComponent implements OnInit {

  public categories: any = [];
  public category: any = {
    id: null,
    name: ''
  };
  public shareLink: string;
  public text = '';

  baseImageUrl: string = 'https://media.xberts.com/collector/source/web/templats/01-pic-7.jpg';
  contextList: any = {};
  imageList: any = {};

  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;
  product: any = [];

  queryMedia: any;
  isMobile: boolean = false;

  about: string = 'Thank you for visiting my store! Have a nice day.  ';

  productNumber: number = 0;
  displayName: string;
  isShowMenu: boolean = false;
  storeName: string = '';
  currency: string = 'USD';


  titleTag1 = '<p class="ql-align-center"><strong class="ql-size-huge" style="color: rgb(255, 255, 255);">Welcome to The Beauty Store!</strong></p>';
  descriptionTag1 = '<p class="ql-align-center"><strong style="color: rgb(255, 255, 255);">Follow beauty tips and find unique high-quality makeup tools, cosmetics and hairstyles all in once place.</strong></p>';
  userTag1 = '<p>Welcome to my curated online store. This is a place to share you with beauty tips and high-quality unique makeup tools, cosmetics, hairstyles and everyday essentials. Please browse my collections and grab an item!</p>';
  imageSrc1 = 'https://media.xberts.com/collector/source/web/templats/01-pic-7.jpg';

  //导航上是否显示flash sale
  isHavePromotion: boolean = false;

  //是否是promotion的请求(区分两种卡片)
  isPromotion: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private media: ObservableMedia) {

  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

    let self = this;
    let routerArray = this.router.url.split('/');
    self.storeService.store.subscribe((data) => {
      if (data) {
        self.store = data;
        self.currency = data.currency.toUpperCase();
        self.storeService.addCart(self.storeService.getProductInCart(data.displayName));
        self.displayName = data.displayName;
        self.storeName = data.name;
        self.contextList = data.context ? data.context : {
          nameTag: data.name,
          titleTag: self.titleTag1,
          descriptionTag: self.descriptionTag1,
          userTag: self.userTag1

        };
        self.imageList = data.images ? data.images : {
          imageSrc: self.imageSrc1
        };
        self.text = `Welcome to my store: ${data.name}-${data.description}`;
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });

        self.isHavePromotion = data.promotionNum > 0;

        let tempCategory = data.category.filter((data) => {
          return data.goodsCount != 0;
        });
        if (tempCategory.length > 1) {
          if (self.isHavePromotion) {
            self.categories = [{name: 'All'}, {name: 'Flash Sale', id: -100}, ...tempCategory];
          } else {
            self.categories = [{name: 'All'}, ...tempCategory];
          }
        } else {
          if (self.isHavePromotion) {
            self.categories = [{name: 'Flash Sale', id: -100}, ...tempCategory];
          } else {
            self.categories = [...tempCategory];
          }
        }
        self.category = self.categories[0];

        self.storeService.pageView({
          pt: 'store',
          vt: new Date().getTime(),
          sid: data.id
        });

        self.queryProduct();
      }
    });

    self.storeService.cart.subscribe((data) => {
      if (data && data.length > 0) {
        self.productNumber = 0;
        for (let item of data) {
          self.productNumber += parseInt(item.number);
        }
      }
    });

    self.queryMedia = this.media.asObservable()
      .subscribe((data) => {
        if (data.mqAlias == 'xs') {
          self.isMobile = true;
        } else {
          self.isMobile = false;
        }
      });
  }

  jumpList(): void {

    if (this.isMobile) {
      this.router.navigate([`store/${this.store.displayName}/1/list`]);
    } else {
      this.page++;
      if (this.category.id == -100) {
        this.queryFlashSale();
      } else {
        this.queryProduct();
      }
    }
  }

  changeCategory(category) {
    this.category = category;
    this.page = 1;
    if (this.category.id == -100) {
      this.isPromotion = true;
      this.queryFlashSale(true);
    } else {
      this.isPromotion = false;
      this.queryProduct(true);
    }
  }


  queryProduct(clearProduct?: boolean) {
    if (this.categories.length <= 0) {
      return;
    }
    let options = {
      cat: this.category.id,
      store: this.store.id,
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

  queryFlashSale(clearProduct?: boolean) {
    let options = {
      store: this.store.id,
      page: this.page,
      page_size: 48
    };
    let self = this;
    self.storeService.getFlashSaleList(options).then((data) => {
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

  ngOnDestroy() {
    this.queryMedia.unsubscribe();
  }

  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }

  jumpPrivacy(): void {
    this.router.navigate([`./store/${this.displayName}/1/privacy`]);
  }

  jumpReturn(): void {
    this.router.navigate([`./store/${this.displayName}/1/return`]);
  }

  jumpFaq(): void {
    this.router.navigate([`./store/${this.displayName}/1/faq`]);
  }

  jumpAbout(): void {
    this.router.navigate([`./store/${this.displayName}/1/about`]);
  }

  changeShowMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  closeShowMenu() {
    this.isShowMenu = false;
  }


}
