import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { StoreService } from '../store.service';
import { Store } from '../store';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store.scss','../../shop/shop.scss']
})

export class MainPageComponent implements OnInit {

  public categories:any = [];
  public category: any = {
    id: null,
    name : ''
  };
  public shareLink: string;
  public text = 'Here you let your customers get to know you. Tell them a little bit about yourself and why you create this business.'
  + 'Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills or training'
  + 'that make you an expert in your field? Show your customers that there are read people with instersting stories working'
  + 'behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust you brad.';

  baseImageUrl: string = 'https://media.xberts.com/collector/source/web/templats/01-pic-7.jpg';

  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;
  product: any = [];

  queryMedia: any;
  isMobile: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private media: ObservableMedia
  ) {
    let storeName = this.activatedRoute.snapshot.params['name'];
    let self = this;
    this.storeService.getStore(storeName).then((data) => {
      self.store = data;
      self.categories = [...data.category];
      self.category = self.categories[0];
      self.storeService.addStore(data);

      self.storeService.pageView({
        pageType: 'store',
        viewTime: new Date().getTime(),
        storeId: data.id
      });

      self.queryProduct();
    });

    self.queryMedia = this.media.asObservable()
      .subscribe((data) => {
        if(data.mqAlias == 'xs') {
          self.isMobile = true;
        } else {
          self.isMobile = false;
        }

      });
  }

  ngOnInit():void {
    this.shareLink = window.location.href;
  }

  jumpList():void {

    if(this.isMobile) {
      let storeName = this.activatedRoute.snapshot.params['name'];
      this.router.navigate([`store/${storeName}/list`]);
    } else {
      this.page++;
      this.queryProduct();
    }
  }

  changeCategory() {
    this.page = 1;
    this.queryProduct(true);
  }

  queryProduct(clearProduct?:boolean) {
    if(this.categories.length <= 0) {
      return;
    }
    let options = {
      categoryId: this.category.id,
      storeId: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 12
    };
    let self = this;
    self.storeService.getProductList(options).then((data)=>{
      if(clearProduct) {
        this.product = [];
        this.nextPage = true;
      }
      self.product = self.product.concat(data.results);
      if(data.next == null) {
        self.nextPage = false;
      }
    });
  }

  ngOnDestroy() {
    this.queryMedia.unsubscribe();
  }

}
