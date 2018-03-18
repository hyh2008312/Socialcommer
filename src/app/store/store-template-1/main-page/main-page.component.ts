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

  nameTag1 = 'STORE NAME';
  titleTag1 = '<p class="ql-align-center"><strong class="ql-size-huge" style="color: rgb(255, 255, 255);">store title</strong></p>';
  descriptionTag1 = '<p class="ql-align-center"><strong style="color: rgb(255, 255, 255);">This is your starter site, a single page online storefront. All of the images and text on this page can be changed to personalize the site for brand and to communicate your unique story to your customers.</strong></p>';
  userTag1 = '<p>Here you let your customers get to know you. Tell them a little bit about yourself and why you create this business. Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills or training that make you an expert in your field? Show your customers that there are real people with interesting stories working behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust in your brand.</p>';
  imageSrc1 = 'https://media.xberts.com/collector/source/web/templats/01-pic-7.jpg';

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
        self.storeName = data.context ? data.context.nameTag : data.name;
        self.contextList = data.context ? data.context : {
          nameTag: self.nameTag1,
          titleTag: self.titleTag1,
          descriptionTag: self.descriptionTag1,
          userTag: self.userTag1

        };
        self.imageList = data.images ? data.images : {
          imageSrc: self.imageSrc1
        };
        self.text = data.description;
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
      this.queryProduct();
    }
  }

  changeCategory() {
    this.page = 1;
    this.queryProduct(true);
  }

  queryProduct(clearProduct?: boolean) {
    if (this.categories.length <= 0) {
      return;
    }
    let options = {
      cat: this.category.id,
      store: this.store.id,
      page: this.page,
      page_size: 12
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
