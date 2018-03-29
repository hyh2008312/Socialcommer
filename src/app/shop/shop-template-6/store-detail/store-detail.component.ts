import {Component, Directive, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store, Product, Image} from '../../store';

@Component({
  selector: 'app-shop-template-6-store-detail',
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
    'https://media.socialcommer.com/source/web/template/6/421-L_C_U_(K162)_K16220___FZ.jpg',
    'https://media.socialcommer.com/source/web/template/6/421L-C_K_(K2026)_K20268___FZ.jpg',
    'https://media.socialcommer.com/source/web/template/6/1715L-N___(K0154)_K105413_FZ.jpg',
    'https://media.socialcommer.com/source/web/template/6/1709Y-N___(K1617)_K16174_FZ.jpg',
    'https://media.socialcommer.com/source/web/template/6/196625-(WWW)_W_W_W_FZ.jpg',
    'https://media.socialcommer.com/source/web/template/6/Thumb_arena_880,3.png'
  ];
  id: number;
  recommedProducts: any = [];
  relatedProduct: any = [
    {
      'recommend': [
        {
          id: 1,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/176TR-2_F2_FZ.jpg'
        },
        {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/174T-O_2_VBO_FZ.jpg'
        },
        {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/311-(BCI)_F2_FZ.jpg'
        },
        {
          id: 4,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/85T32M-TARC_FZ.jpg'
        }
      ]
    },

    {
      'recommend': [
        {
          id: 1,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/dresses_03.jpg'
        },
        {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/dresses_02.jpg'
        },
        {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/dresses_01.jpg'
        }
      ]
    },
    {
      'recommend': [
        {
          id: 1,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/skirts_01.jpg'
        },
        {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/skirts_02.jpg'
        },
        {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/skirts_03.jpg'
        }
      ]
    },
    {
      'recommend': [
        {
          id: 1,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/jeans_03.jpg'
        },
        {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/jeans_02.jpg'
        },
        {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/jeans_01.jpg'
        }
      ]
    },
    {
      'recommend': [
        {
          id: 1,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/shoes_03.jpg'
        },
        {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/shoes_02.jpg'
        },
        {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/shoes_01.jpg'
        }
      ]
    },
    {
      'recommend': [
        {
          id: 1,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/handbags_03.jpg'
        },
        {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/handbags_02.jpg'
        },
        {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/5/handbags_01.jpg'
        }
      ]
    }
  ];

  constructor(public router: Router,
              private activatedRouter: ActivatedRoute,
              private storeService: StoreService) {
    let self = this;

    /* self.id = this.activatedRouter.snapshot.params['id'];
     self.selectedImage = self.imageSources[self.id - 1]; //根据id找图片
     self.image.push(self.selectedImage);
     self.recommedProducts =self.relatedProduct[Math.floor((self.id - 1)/3)].recommend;*/
    self.selectedImage = self.imageSources[0]; //根据id找图片
    self.image.push(self.imageSources[0]);
    self.image.push(self.imageSources[1]);
    self.image.push(self.imageSources[2]);
    self.image.push(self.imageSources[3]);
    self.image.push(self.imageSources[4]);
    self.image.push(self.imageSources[5]);
    self.recommedProducts = self.relatedProduct[0].recommend;

  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

  }
}
