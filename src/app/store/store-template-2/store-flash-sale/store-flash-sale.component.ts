import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-2-store-flash-sale',
  templateUrl: './store-flash-sale.component.html',
  styleUrls: ['../_store-template-2.scss']
})

export class StoreFlashSaleComponent implements OnInit {

  public categories: any = [];
  public category: any = {
    id: null,
    name: ''
  };
  public shareLink: string;
  public text = '';
  showButton: boolean = false;

  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;
  product: any = [];
  date: any;
  isShowCategoryMenu = false;
  currency: string = 'USD';
  isHaveProduct: boolean;
  isHavePromotion: boolean = false;
  productNumber: number = 0;
  displayName: string;
  baseImageUrl: string = 'https://media.socialcommer.com/source/web/pic/pic-2-1.jpg';
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {
  }


  ngOnInit(): void {
    this.shareLink = window.location.href;
    let self = this;
    let firstLoad = false;
    this.storeService.store.subscribe((data) => {
      if (data && !firstLoad) {
        firstLoad = true;
        self.store = data;
        self.text = `Welcome to my store: ${data.name} - ${data.description}`;
        self.isHavePromotion = data.promotionNum > 0;
        self.displayName = data.displayName ;
        self.storeService.addCart(self.storeService.getProductInCart(data.displayName));
        self.currency = data.currency.toUpperCase();
        let banner = data.images ? data.images.bannerImageStr : self.baseImageUrl;
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: banner
        });
        self.storeService.pageView({
          pt: 'store',
          vt: new Date().getTime(),
          sid: data.id
        });
        self.queryFlashSale();
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
  }

  jumpList(): void {
    this.page++;
    this.queryFlashSale();
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
      self.isHaveProduct =self.product.length ==0 ;
      if (data.next == null) {
        self.nextPage = false;
      }
    });
  }

  changeShowCategoryMenu(): void {
    this.isShowCategoryMenu = !this.isShowCategoryMenu;
  }
  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }
}
