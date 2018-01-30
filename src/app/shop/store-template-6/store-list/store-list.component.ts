import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-shop-template-5-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['../_store-template-6.scss']
})

export class StoreListComponent implements OnInit, OnDestroy {
  @Input() storeName: string;
  public shareLink: string;
  public text: string;
  product: any = [
    {
      id: 1, name: 'CHAIR',
      imageCategory: 'https://media.socialcommer.com/source/web/template/6/simpolo-2032193.jpg',
      relations:
        [
          {
            id: 1,
            title: 'Product Name',
            salePriceAmount: '12',
            salePriceCurrency: 'USD',
            originalPriceAmount: '16',
            originalPriceCurrency: 'USD',
            imageUrl: 'https://media.socialcommer.com/source/web/template/6/421-L_C_U_(K162)_K16220___FZ.jpg'
          }, {
          id: 2,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/421L-C_K_(K2026)_K20268___FZ.jpg'
        }, {
          id: 3,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/1715L-N___(K0154)_K105413_FZ.jpg'
        },
          {
            id: 4,
            title: 'Product Name',
            salePriceAmount: '12',
            salePriceCurrency: 'USD',
            originalPriceAmount: '16',
            originalPriceCurrency: 'USD',
            imageUrl: 'https://media.socialcommer.com/source/web/template/6/1709Y-N___(K1617)_K16174_FZ.jpg'
          }, {
          id: 5,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/2165RC-AP___(K1206)_K12062_FZ.jpg'
        }, {
          id: 6,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/196625-(WWW)_W_W_W_FZ.jpg'
        }, {
          id: 7,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/WL21S-111G_(K1882)_K18828_FZ.jpg'
        }, {
          id: 8,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/KL3-(kLOUNGE)_KLF01_FZ.jpg'
        }
        ]
    },
    {
      id: 2, name: 'TABLE',
      imageCategory: 'https://media.socialcommer.com/source/web/template/6/wall-416060.jpg',
      relations: [
        {
          id: 9,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/176TR-2_F2_FZ.jpg'
        }, {
          id: 10,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/174T-O_2_VBO_FZ.jpg'
        }, {
          id: 11,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/311-(BCI)_F2_FZ.jpg'
        },
        {
          id: 12,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/85T32M-TARC_FZ.jpg'
        }, {
          id: 13,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/Thumb_arena_880,3.png'
        }, {
          id: 14,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/Thumb_face-off-880,3.png'
        },
        {
          id: 15,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/DUrso_hightable880,10.png'
        }, {
          id: 16,
          title: 'Product Name',
          salePriceAmount: '12',
          salePriceCurrency: 'USD',
          originalPriceAmount: '16',
          originalPriceCurrency: 'USD',
          imageUrl: 'https://media.socialcommer.com/source/web/template/6/87-(BCI)_F2_FZ.jpg'
        }
      ]
    }
  ];

  categoryProduct: any = [];

  id: number;
  categoryName: string;
  sub: any;
  imageCategory: string = 'https://media.socialcommer.com/source/web/template/6/simpolo-2032193.jpg';
  relations: any = [
    {
      id: 1,
      title: 'Product Name',
      salePriceAmount: '12',
      salePriceCurrency: 'USD',
      originalPriceAmount: '16',
      originalPriceCurrency: 'USD',
      imageUrl: 'https://media.socialcommer.com/source/web/template/6/421-L_C_U_(K162)_K16220___FZ.jpg'
    }, {
      id: 2,
      title: 'Product Name',
      salePriceAmount: '12',
      salePriceCurrency: 'USD',
      originalPriceAmount: '16',
      originalPriceCurrency: 'USD',
      imageUrl: 'https://media.socialcommer.com/source/web/template/6/421L-C_K_(K2026)_K20268___FZ.jpg'
    }, {
      id: 3,
      title: 'Product Name',
      salePriceAmount: '12',
      salePriceCurrency: 'USD',
      originalPriceAmount: '16',
      originalPriceCurrency: 'USD',
      imageUrl: 'https://media.socialcommer.com/source/web/template/6/1715L-N___(K0154)_K105413_FZ.jpg'
    },
    {
      id: 4,
      title: 'Product Name',
      salePriceAmount: '12',
      salePriceCurrency: 'USD',
      originalPriceAmount: '16',
      originalPriceCurrency: 'USD',
      imageUrl: 'https://media.socialcommer.com/source/web/template/6/1709Y-N___(K1617)_K16174_FZ.jpg'
    }, {
      id: 5,
      title: 'Product Name',
      salePriceAmount: '12',
      salePriceCurrency: 'USD',
      originalPriceAmount: '16',
      originalPriceCurrency: 'USD',
      imageUrl: 'https://media.socialcommer.com/source/web/template/6/2165RC-AP___(K1206)_K12062_FZ.jpg'
    }, {
      id: 6,
      title: 'Product Name',
      salePriceAmount: '12',
      salePriceCurrency: 'USD',
      originalPriceAmount: '16',
      originalPriceCurrency: 'USD',
      imageUrl: 'https://media.socialcommer.com/source/web/template/6/196625-(WWW)_W_W_W_FZ.jpg'
    }, {
      id: 7,
      title: 'Product Name',
      salePriceAmount: '12',
      salePriceCurrency: 'USD',
      originalPriceAmount: '16',
      originalPriceCurrency: 'USD',
      imageUrl: 'https://media.socialcommer.com/source/web/template/6/WL21S-111G_(K1882)_K18828_FZ.jpg'
    }, {
      id: 8,
      title: 'Product Name',
      salePriceAmount: '12',
      salePriceCurrency: 'USD',
      originalPriceAmount: '16',
      originalPriceCurrency: 'USD',
      imageUrl: 'https://media.socialcommer.com/source/web/template/6/KL3-(kLOUNGE)_KLF01_FZ.jpg'
    }
  ];
  categoryBanner: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
    // 1.可以通过id去和分类列表进行对比 2.可以用请求下来的商品中的categoryName的名字
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.categoryName = this.product[this.id - 1].name;
      this.categoryBanner = this.product[this.id - 1].imageCategory;
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
