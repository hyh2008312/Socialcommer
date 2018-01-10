import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-5-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../store-template-5.scss']
})

export class HomePageComponent implements OnInit {
  public categories: any = [];
  public category: any = {
    id: null,
    name: ''
  };
  templateCategories =
    [
      {
        id: 1, name: 'Daily Specials',
        relations: [{
          id: 1,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623089.jpg'
        }, {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623090.jpg'
        }, {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623086.jpg'
        }]

      },
      {
        id: 2, name: 'Dresses',
        relations: [{
          id: 1,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623083.jpg'
        }, {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623091.jpg'
        }, {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623087.jpg'
        }]
      },
      {
        id: 3, name: 'Skirts',
        relations: [{
          id: 1,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623089.jpg'
        }, {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623090.jpg'
        }, {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623086.jpg'
        }]
      },
      {
        id: 4, name: 'Jeans',
        relations: [{
          id: 1,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623089.jpg'
        }, {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623090.jpg'
        }, {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623086.jpg'
        }]
      },
      {
        id: 5, name: 'Shoes',
        relations: [{
          id: 1,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623089.jpg'
        }, {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623090.jpg'
        }, {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623086.jpg'
        }]
      },
      {
        id: 6, name: 'Handbags',
        relations: [{
          id: 1,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623089.jpg'
        }, {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623090.jpg'
        }, {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623086.jpg'
        }]
      }
    ];


  public text = '';

  imageBanner: string = 'https://media.socialcommer.com/source/store/template/5da77c3f-0abe-40d2-b07d-a385d1fa5771.jpg';
  imageAboutCover: string = 'https://media.socialcommer.com/source/web/template/5/people-2593366.jpg';
  imageBlogCover: string = 'https://media.socialcommer.com/source/store/template/61424fc9-f460-4689-8cf6-64d6c193b663.jpg';


  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;

  blog: any = [{
    id: 0,
    title: 'Top 5 Spiritual Retreats',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/5/people-2584125.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 1,
    title: 'Top 5 Spiritual Retreats',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/5/people-2603521.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    /*this.storeService.store.subscribe((data) => {
      if (data) {
        this.store = data;
        this.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        this.categories = data.category;
        this.storeService.pageView({
          pageType: 'store',
          viewTime: new Date().getTime(),
          storeId: data.id
        });
      }
    });*/
  }

  jumpCategory(categoryId: number): void {
    this.router.navigate(['./category',categoryId], {relativeTo: this.activatedRoute},
    );
  }

  jumpBlogList(): void {
    this.router.navigate(['./blog'], {relativeTo: this.activatedRoute});
  }

}
