import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store } from '../../store';

@Component({
  selector: 'app-shop-template-3-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class HomePageComponent implements OnInit {
  public categories:any = [];
  public category: any = {
    id: null,
    name : ''
  };
  public shareLink: string;
  public text = '';

  baseImageUrl: string = 'https://media.socialcommer.com/source/web/template/3/15-pic.jpg';

  store: Store = new Store();
  contextList: any = {};
  imageList: any = {};
  page = 1;
  nextPage: boolean = true;
  nextBlogPage: boolean = true;
  product: any = [{
    id: 0,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/3/12-pic.jpg'
  },{
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/3/07-pic.jpg'
  },{
    id: 2,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/3/13-pic.jpg'
  },{
    id: 3,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/3/14-pic.jpg'
  }];

  blog: any = [{
    id: 0,
    title: 'Blog Title',
    cover: 'https://media.socialcommer.com/source/web/template/3/04-pic.jpg',
    context: 'Blog Description',
  },{
    id: 1,
    title: 'Blog Title',
    cover: 'https://media.socialcommer.com/source/web/template/3/06-pic.jpg',
    context: 'Blog Description',
  }];

  ownerId: any;

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
        self.contextList = data.context? data.context: {};
        self.imageList = data.image? data.image: {};
        self.text = data.description;
        self.ownerId = data.ownerId;
        self.storeService.addStore(data);

      }
    });
  }

  queryProduct(clearProduct?:boolean) {

  }

  queryBlog(clearBlog?:boolean) {

  }
}
