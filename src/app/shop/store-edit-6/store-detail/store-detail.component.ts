import {Component, Directive, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store, Product, Image} from '../../store';

@Component({
  selector: 'app-shop-template-5-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['../_store-template-6.scss']
})

export class StoreDetailComponent implements OnInit {

  public shareLink: string;
  public text = '';
  store: Store = new Store();
  product: any = {
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    purchaseUrl: 'https://www.socialcommer.com/',
    recommendation: 'Use this section to tell your customers why you recommend this product.',
    description: 'This is a brief paragraph that describes the product to ' +
    'entice buyers. If you\'re writing a product description, take some time to ' +
    'prewrite. Research your product and the audience so you know how to best sell the' +
    ' product. From there, write down the statement. Start with a great opening and then ' +
    'describe the product vividly in a couple of short sentences. When you\'re finished, ' +
    'reread the statement. Watch for cliche phrases and lengthy sentences and revise the' +
    ' statement as necessary.',
  };
  image: any = [];
  selectedImage: any = false;
  imageSources: string[] = [
    'https://media.socialcommer.com/source/web/template/4/4.jpg',
    'https://media.socialcommer.com/source/web/template/4/5.jpg',
    'https://media.socialcommer.com/source/web/template/4/8.jpg',
    'https://media.socialcommer.com/source/web/template/4/9.jpg',
    'https://media.socialcommer.com/source/web/template/4/6.jpg',
    'https://media.socialcommer.com/source/web/template/4/7.jpg',
  ];
  id: number;

  relatedProduct: any = [{
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/4/4.jpg'
  }, {
    id: 2,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/4/5.jpg'
  }, {
    id: 3,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/4/8.jpg'
  }, {
    id: 4,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/4/9.jpg'
  }];

  constructor(public router: Router,
              private activatedRouter: ActivatedRoute,
              private storeService: StoreService) {
    let self = this;

    self.id = this.activatedRouter.snapshot.params['id'];
    self.selectedImage = self.imageSources[self.id-1];
    self.image = self.imageSources;
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

  }
}
