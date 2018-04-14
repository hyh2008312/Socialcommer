import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

import {UserService} from '../../../shared/services/user/user.service';
import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-store-template-1',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store.scss', '../../shop.scss']
})

export class MainPageComponent implements OnInit {

  public categories: any = [{
    id: 0,
    name: 'All'
  }, {
    id: 0,
    name: 'Daily Specials'
  }, {
    id: 0,
    name: 'Skin Care'
  }, {
    id: 0,
    name: 'Hair Care'
  }, {
    id: 0,
    name: 'Fragrance'
  }, {
    id: 0,
    name: 'Tools'
  }];
  public category: any = {
    id: 0,
    name: 'All'
  };
  public shareLink: string;
  public text = '';

  baseImageUrl: string = 'https://media.xberts.com/collector/source/web/templats/01-pic-7.jpg';

  contextList: any = {};
  imageList: any = {};
  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;
  product = [{
    id: 0,
    mainImage: "https://media.xberts.com/collector/source/web/templats/01-pic-1.jpg",
    originalPriceAmount: 55.95,
    originalPriceCurrency: "USD",
    salePriceAmount: 39.30,
    salePriceCurrency: "USD",
    title: "Skin Care and Cosmetic Ingredients Dictionary. "
  }, {
    id: 1,
    mainImage: "https://media.xberts.com/collector/source/web/templats/01-pic-2.jpg",
    originalPriceAmount: 39.00,
    originalPriceCurrency: "USD",
    salePriceAmount: 19.00,
    salePriceCurrency: "USD",
    title: "Mermaid Chunky Glitter Large 30g Jar COSMETIC GLITTER Festival Face Body"
  }, {
    id: 2,
    mainImage: "https://media.xberts.com/collector/source/web/templats/01-pic-3.jpg",
    originalPriceAmount: 39.00,
    originalPriceCurrency: "USD",
    salePriceAmount: 19.00,
    salePriceCurrency: "USD",
    title: "Black Markup Mirror 6 Inch 3x Magnification LED Light Two-Sided Table"
  }, {
    id: 3,
    mainImage: "https://media.xberts.com/collector/source/web/templats/01-pic-4.jpg",
    originalPriceAmount: 49.99,
    originalPriceCurrency: "USD",
    salePriceAmount: 19.99,
    salePriceCurrency: "USD",
    title: "Eyelash Dreamer Makeup Bag, Eyelash Dreamer, Makeup Bag, Makeup, Lash "
  }, {
    id: 4,
    mainImage: "https://media.xberts.com/collector/source/web/templats/01-pic-5.jpg",
    originalPriceAmount: 6.00,
    originalPriceCurrency: "USD",
    salePriceAmount: 4.99,
    salePriceCurrency: "USD",
    title: "E.l.f Hydrating Face Primer, 0.47 Fluid Ounce"
  }, {
    id: 5,
    mainImage: "https://media.xberts.com/collector/source/web/templats/01-pic-6.jpg",
    originalPriceAmount: 49.99,
    originalPriceCurrency: "USD",
    salePriceAmount: 35.99,
    salePriceCurrency: "USD",
    title: "The Best Organic Vitamin C Serum - [BIG 2-OZ Bottle] - Hyaluronic Acid, 20% C + E"
  }];

  queryMedia: any;
  isMobile: boolean = false;
  productNumber: number = 0;
  about: string = 'Thank you for visiting my store! Have a nice day.  ';


  nameTag = 'STORE NAME';
  titleTag = '<p class="ql-align-center"><strong class="ql-size-huge" style="color: rgb(255, 255, 255);">Welcome to The Beauty Store!</strong></p>';
  descriptionTag = '<p class="ql-align-center"><strong style="color: rgb(255, 255, 255);" class="ql-size-large">Follow beauty tips and find unique high-quality makeup tools, cosmetics and hairstyles all in once place.</strong></p>';
  userTag = '<p>Welcome to my curated online store. This is a place to share you with beauty tips and high-quality unique makeup tools, cosmetics, hairstyles and everyday essentials. Please browse my collections and grab an item!</p>';
  imageSrc = 'https://media.xberts.com/collector/source/web/templats/01-pic-7.jpg';
//是否为新手引导
  isGuide: boolean = false;

  isShowMenu: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private media: ObservableMedia,
              private userService: UserService) {
    let url = this.router.url;
    this.isGuide = url.indexOf('guide/preview') >= 0;
    let self = this;
    self.queryMedia = this.media.asObservable()
      .subscribe((data) => {
        if (data.mqAlias == 'xs') {
          self.isMobile = true;
        } else {
          self.isMobile = false;
        }
      });
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
  }

  jumpList(): void {

    if (this.isMobile) {
      this.router.navigate([`./list`], {relativeTo: this.activatedRoute});
    } else {
      this.page++;
    }
  }

  changeCategory() {
    this.page = 1;
  }

  ngOnDestroy() {
    this.queryMedia.unsubscribe();
  }

  jumpCart(): void {
    if (this.isGuide) {
      this.router.navigate([`/shop/guide/preview/1/cart`]);
    } else {
      this.router.navigate([`/shop/templates/preview/1/cart`]);
    }
  }

  jumpOrder(): void {
    if (this.isGuide) {
      this.router.navigate([`/shop/guide/preview/1/order`]);
    } else {
      this.router.navigate([`/shop/templates/preview/1/order`]);
    }
  }

  changeShowMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  closeShowMenu() {
    this.isShowMenu = false;
  }
}
