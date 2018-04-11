import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-5-store-flash-sale',
  templateUrl: './store-flash-sale.component.html',
  styleUrls: ['../_store-template-5.scss']
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
        self.text = data.description;
        self.currency = data.currency.toUpperCase();
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
        self.queryFlashSale();
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
}
