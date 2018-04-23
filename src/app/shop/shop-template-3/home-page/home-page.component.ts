import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-3-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class HomePageComponent implements OnInit {

  public categories: any = [{
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
    mainImage: 'https://media.socialcommer.com/source/web/template/3/12-pic.jpg'
  }, {
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/3/07-pic.jpg'
  }, {
    id: 2,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/3/13-pic.jpg'
  }, {
    id: 3,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/3/14-pic.jpg'
  }, {
    id: 4,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/3/12-pic.jpg'
  }, {
    id: 5,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    mainImage: 'https://media.socialcommer.com/source/web/template/3/07-pic.jpg'
  }];

  blog: any = [{
    id: 0,
    title: 'Blog Title',
    cover: 'https://media.socialcommer.com/source/web/template/3/04-pic.jpg',
    context: 'Blog Description',
  }, {
    id: 1,
    title: 'Blog Title',
    cover: 'https://media.socialcommer.com/source/web/template/3/06-pic.jpg',
    context: 'Blog Description',
  }];

  ownerId: any;

  nameTag = 'STORE NAME';
  titleTag = '<p class="ql-align-center"><strong class="ql-size-huge" style="color: rgb(255, 255, 255);"> Decorate Your Life with Our Tastefully Curated Products! </strong></p>';
  descriptionTag = '<p class="ql-align-center"><strong style="color: rgb(255, 255, 255);">This was founded with starter site, a single page ' +
    'online storefront. All of the images and text on this page can be changed to personalize the site for brand ' +
    'and to communicate your unique story to your customers.</strong></p>';


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
        self.contextList = data.context ? data.context : {};
        self.imageList = data.images ? data.images : {};
        self.text = data.description;
      }
    });
  }

  queryProduct(clearProduct?: boolean) {

  }

  queryBlog(clearBlog?: boolean) {

  }

  jumpToCollection() {
    this.router.navigate(['./list'], {relativeTo: this.activatedRoute});
  }

  jumpToBlog() {
    this.router.navigate(['./blog'], {relativeTo: this.activatedRoute});
  }
}
