import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-4-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../store-template-4.scss']
})

export class HomePageComponent implements OnInit {
  public categories:any = [{
    id: 0,
    name: 'All'
  }, {
    id: 0,
    name: 'Daily Specials'
  }, {
    id: 0,
    name: 'For Baby'
  }, {
    id: 0,
    name: 'For Girls'
  }, {
    id: 0,
    name: 'For Boys'
  }, {
    id: 0,
    name: 'Toys'
  }, {
    id: 0,
    name: 'Games'
  }];
  public category: any = {
    id: null,
    name: 'All'
  };
  public text = '';

  imageBanner: string = 'https://media.socialcommer.com/source/web/template/4/12.jpg';

  imageAdOne: string = 'https://media.socialcommer.com/source/web/template/4/1.jpg';
  imageAdTwo: string = 'https://media.socialcommer.com/source/web/template/4/2.jpg';
  imageAdThree: string = 'https://media.socialcommer.com/source/web/template/4/3.jpg';

  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;
  product: any = [{
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/4/4.jpg'
  }, {
    id: 2,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/4/5.jpg'
  }, {
    id: 3,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/4/8.jpg'
  }, {
    id: 4,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/4/9.jpg'
  }, {
    id: 5,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/4/6.jpg'
  }, {
    id: 6,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/4/7.jpg'
  }];

  blog: any = [{
    id: 1,
    title: 'Blog Title',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/4/10.jpg',
    context: 'Blog Description',
  }, {
    id: 2,
    title: 'Blog Title',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/4/11.jpg',
    context: 'Blog Description',
  }];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    let self = this;
  }

}
