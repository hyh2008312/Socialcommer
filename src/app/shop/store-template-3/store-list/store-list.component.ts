import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store } from '../../store';

@Component({
  selector: 'app-shop-template-3-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class StoreListComponent implements OnInit {

  public categories:any = [{
    id: 0,
    name: 'All'
  }, {
    id: 0,
    name: 'Daily Specials'
  }, {
    id: 0,
    name: 'Headphones'
  }, {
    id: 0,
    name: 'Camera'
  }, {
    id: 0,
    name: 'Audio'
  }, {
    id: 0,
    name: 'Wearable Tech'
  }, {
    id: 0,
    name: 'Smart Home'
  }];
  public category: any = {
    id: null,
    name: 'All'
  };
  public shareLink: string;
  public text = '';

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
    mainImage: 'https://media.socialcommer.com/source/web/template/3/12-pic.jpg'
  },{
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/3/07-pic.jpg'
  },{
    id: 2,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/3/13-pic.jpg'
  },{
    id: 3,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/3/14-pic.jpg'
  }];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {
    this.shareLink = window.location.href;
    let self = this;
    let firstLoad = false;
    this.storeService.store.subscribe((data) => {
      if(data && !firstLoad) {
        firstLoad = true;
        self.store = data;
        self.text = data.description;
        self.storeService.addStore(data);
      }
    });
  }

  changeCategory() {

  }

}
