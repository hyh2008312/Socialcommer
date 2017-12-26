import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-2-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../store-template-2.scss']
})

export class HomePageComponent implements OnInit {
  public categories: any = [];
  public category: any = {
    id: null,
    name: ''
  };
  public shareLink: string;
  public text = '';

  baseImageUrl: string = 'https://media.socialcommer.com/source/web/pic/pic-2-1.jpg';

  imageUrlOne: string = 'https://media.socialcommer.com/source/web/pic/pic-2-2.jpg';
  imageHomeMade: string = 'https://media.socialcommer.com/source/web/pic/pic-2-5.jpg';
  imageSubscribe: string = 'https://media.socialcommer.com/source/web/pic/pic-2-11.jpg';
  imageOwnerThree: string = 'https://media.socialcommer.com/source/web/pic/pic-2-3.jpg';
  imageOwnerFour: string = 'https://media.socialcommer.com/source/web/pic/pic-2-4.jpg';
  imageOwnerSix: string = 'https://media.socialcommer.com/source/web/pic/pic-2-6.jpg';
  imageOwnerEleven: string = 'https://media.socialcommer.com/source/web/pic/pic-2-11.jpg';

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
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-7.jpg'
  }, {
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-8.jpg'
  }, {
    id: 2,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-9.jpg'
  }, {
    id: 3,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-10.jpg'
  }, {
    id: 4,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-9.jpg'
  }, {
    id: 5,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-7.jpg'
  }];


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
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        if (data.category.length > 1) {
          self.categories = [{name: 'All'}, ...data.category];
        } else {
          self.categories = [...data.category];
        }
        self.category = self.categories[0];
        self.storeService.addStore(data);

        self.storeService.pageView({
          pageType: 'store',
          viewTime: new Date().getTime(),
          storeId: data.id
        });
        self.queryProduct();
      }
    });
  }

  queryProduct(clearProduct?: boolean) {
  }

  jumpProductList(): void {
    this.router.navigate([`/shop/store/templates/preview/2/list`]);
  }
}
