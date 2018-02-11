import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-6-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../_store-template-6.scss']
})

export class HomePageComponent implements OnInit {
  public categories: any = [];
  public category: any = {
    id: null,
    name: ''
  };
  templateCategories = [
    {
      id: 1,
      name: 'CHAIR',
      imageCategory: 'https://media.socialcommer.com/source/web/template/6/simpolo-2032193.jpg',
      relations: [
        {
          id: 1,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/421-L_C_U_(K162)_K16220___FZ.jpg'
        }, {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/421L-C_K_(K2026)_K20268___FZ.jpg'
        }, {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/1715L-N___(K0154)_K105413_FZ.jpg'
        },
        {
          id: 4,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/1709Y-N___(K1617)_K16174_FZ.jpg'
        }, {
          id: 5,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/2165RC-AP___(K1206)_K12062_FZ.jpg'
        }, {
          id: 6,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/196625-(WWW)_W_W_W_FZ.jpg'
        }, {
          id: 7,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/WL21S-111G_(K1882)_K18828_FZ.jpg'
        }, {
          id: 8,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/KL3-(kLOUNGE)_KLF01_FZ.jpg'
        }
      ]
    },
    {
      id: 2,
      name: 'TABLE',
      imageCategory: 'https://media.socialcommer.com/source/web/template/6/wall-416060.jpg',
      relations: [
        {
          id: 9,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/176TR-2_F2_FZ.jpg'
        }, {
          id: 10,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/174T-O_2_VBO_FZ.jpg'
        }, {
          id: 11,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/311-(BCI)_F2_FZ.jpg'
        },
        {
          id: 12,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/85T32M-TARC_FZ.jpg'
        }, {
          id: 13,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/Thumb_arena_880,3.png'
        }, {
          id: 14,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/Thumb_face-off-880,3.png'
        },
        {
          id: 15,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/DUrso_hightable880,10.png'
        }, {
          id: 16,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          mainImage: 'https://media.socialcommer.com/source/web/template/6/87-(BCI)_F2_FZ.jpg'
        }
      ]
    }
  ];
  public text = '';
  imageBanner: string = 'https://media.socialcommer.com/source/web/template/6/flowerpots-2754775.png';
  imageBlogCover: string = 'https://media.socialcommer.com/source/web/template/6/2015-04-Life-of-Pix-free-stock-photos-girl-blond-hair-bar-leeroy.jpg';


  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;

  blog: any = [{
    id: 0,
    title: 'FLORENCE KNOLL IN METROPOLIS MAGAZINE',
    modified: '2017-12-25T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/6/10430_z,0.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 1,
    title: 'FLORENCE KNOLL IN METROPOLIS MAGAZINE',
    modified: '2017-12-25T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/6/12866_z,0.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 2,
    title: 'FLORENCE KNOLL IN METROPOLIS MAGAZINE',
    modified: '2017-12-25T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/6/13389_z,0.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 3,
    title: 'FLORENCE KNOLL IN METROPOLIS MAGAZINE',
    modified: '2017-12-25T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/6/13427_z.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }
  ];

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
    this.router.navigate(['./category', categoryId], {relativeTo: this.activatedRoute});
  }

  jumpBlogList(): void {
    this.router.navigate(['./blog'], {relativeTo: this.activatedRoute});
  }

}
