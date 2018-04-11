import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-store-template-2-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../_store-template-2.scss']
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
  product: any = [];

  contextList: any = {};
  imageList: any = {};
  ownerId: any;
  productNumber: number = 0;
  displayName:string ;

  currency:string = 'USD';

  //导航上是否显示flash sale
  isHavePromotion: boolean = false;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
    let self = this;
    let firstLoad = false;

    this.storeService.store.subscribe((data) => {
      if (data) {
        self.store = data;
        self.currency = data.currency.toUpperCase();
        self.storeService.addCart(self.storeService.getProductInCart(data.displayName));
        self.displayName = data.displayName ;
        self.contextList = data.context ? data.context : {};
        self.imageList = data.images ? data.images : {};
        self.text = data.description;
        self.ownerId = data.ownerId;
        self.isHavePromotion = data.promotionNum > 0;
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        let tempCategory = data.category.filter((data)=>{
          return data.goodsCount !=0 ;
        });
        if (tempCategory.length > 1) {
          self.categories = [{name: 'All'}, ...tempCategory];
        } else {
          self.categories = [...tempCategory];
        }
        self.category = self.categories[0];

        self.storeService.pageView({
          pt: 'store',
          vt: new Date().getTime(),
          sid: data.id
        });

        self.queryProduct();

      }
    });

    self.storeService.cart.subscribe((data) => {
      if(data && data.length>0) {
        self.productNumber = 0;
        for(let item of data) {
          self.productNumber += parseInt(item.number);
        }
      }
    });


  }


  queryProduct(clearProduct?: boolean) {
    if (this.categories.length <= 0) {
      return;
    }
    let options = {
      cat: this.category.id,
      store: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 6
    };
    let self = this;
    self.storeService.getProductList(options).then((data) => {
      if (clearProduct) {
        this.product = [];
        this.nextPage = true;
      }
      self.product = self.product.concat(data.results);
      if (data.next == null) {
        self.nextPage = false;
      }
    });
  }

  jumpProductList(): void {
    this.router.navigate([`./store/${this.store.displayName}/2/list`]);
  }

  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }
}
