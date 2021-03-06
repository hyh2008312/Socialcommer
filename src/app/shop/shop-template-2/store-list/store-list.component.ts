import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-3-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['../_store-template-2.scss']
})

export class StoreListComponent implements OnInit {

  public categories: any = [{
    id: 0,
    name: 'All'
  }, {
    id: 0,
    name: 'Daily Specials'
  }, {
    id: 0,
    name: 'Bakery'
  }, {
    id: 0,
    name: 'Breads'
  }, {
    id: 0,
    name: 'Drinks'
  }, {
    id: 0,
    name: 'Cookies'
  }, {
    id: 0,
    name: 'Donuts'
  }];
  public category: any = {
    id: null,
    name: 'All'
  };
  public shareLink: string;
  public text = 'Here you let your customers get to know you. Tell them a little bit about yourself and why you create this business.'
    + 'Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills or training'
    + 'that make you an expert in your field? Show your customers that there are read people with instersting stories working'
    + 'behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust you brad.';

  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;
  product: any = [{
    id: 0,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/blog/cover/1c4078ad-f91f-46c4-bd13-a3d75e578f06.jpg'
  }, {
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/pic/pic-2-8.jpg'
  }, {
    id: 2,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/pic/pic-2-9.jpg'
  }, {
    id: 3,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/pic/pic-2-10.jpg'
  }, {
    id: 4,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/blog/cover/84e6476b-bc20-45eb-8501-62b9a9a96f0d.jpg'
  }, {
    id: 5,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/pic/pic-2-7.jpg'
  }];

  isClearData: boolean = false;
  //是否为新手引导
  isGuide: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {
    let url = this.router.url;
    this.isGuide = url.indexOf('guide/preview') >= 0;
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
    let firstLoad = false;

    this.storeService.store.subscribe((data) => {
      if (data && !firstLoad) {
        firstLoad = true;
        this.store = data;
        this.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        this.storeService.addStore(data);

        this.storeService.pageView({
          pageType: 'store',
          viewTime: new Date().getTime(),
          storeId: data.id
        });
        this.isClearData = false;
        this.queryProduct();
      }
    });
  }

  changeCategory() {

  }

  queryProduct() {
  }

  jumpCart(): void {
    if (this.isGuide) {
      this.router.navigate([`/shop/guide/preview/2/cart`]);
    } else {
      this.router.navigate([`/shop/templates/preview/2/cart`]);
    }
  }
}
