import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-shop-template-5-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['../store-template-5.scss']
})

export class StoreListComponent implements OnInit, OnDestroy {
  @Input() storeName: string;
  public shareLink: string;
  public text: string;
  product: any =[
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

  categoryProduct:any=[];

  id: number;
  categoryName: string;
  sub: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
    // 1.可以通过id去和分类列表进行对比 2.可以用请求下来的商品中的categoryName的名字
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.categoryName = this.product[this.id - 1].name;
      this.categoryProduct = this.product[this.id - 1].relations;

    });
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
