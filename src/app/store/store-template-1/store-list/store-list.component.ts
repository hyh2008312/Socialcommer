import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['../../store.scss']
})

export class StoreListComponent implements OnInit {

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

  currency: string = 'USD';


  //导航上是否显示flash sale
  isHavePromotion: boolean = false;

  //是否是promotion的请求(区分两种卡片)
  isPromotion: boolean = false;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {
    let self = this;
    self.storeService.store.subscribe((data) => {
      if (data) {
        self.store = data;
        self.text = data.description;
        self.currency = data.currency.toUpperCase();
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
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
  }

  scrollChange($event) {
    this.showButton = $event;
  }

  changeCategory(category) {
    this.category = category;
    this.page = 1;
    if (this.category.id == -100) {
      this.queryFlashSale(true);
    } else {
      this.queryProduct(true);
    }
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
      this.isPromotion = true;
      self.product = self.product.concat(data.results);
      if (data.next == null) {
        self.nextPage = false;
      }
    });
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
        this.product = [];
        this.nextPage = true;
      }
      this.isPromotion = false;
      self.product = self.product.concat(data.results);
      if (data.next == null) {
        self.nextPage = false;
      }
    });
  }

  jumpList(): void {
    this.page++;
    if (this.category.id == -100) {
      this.queryFlashSale();
    } else {
      this.queryProduct();
    }
  }

  back(): void {
    this.router.navigate([`./store/${this.store.displayName}/1`]);
  }
}
