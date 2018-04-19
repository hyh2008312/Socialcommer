import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-store-template-3-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['../_store-template-2.scss']
})

export class StoreListComponent implements OnInit {

  public categories: any = [];
  contextList: any = {};
  public category: any = {
    id: null,
    name: ''
  };
  public shareLink: string;
  public text = 'Here you let your customers get to know you. Tell them a little bit about yourself and why you create this business.'
    + 'Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills or training'
    + 'that make you an expert in your field? Show your customers that there are read people with instersting stories working'
    + 'behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust you brad.';

  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;
  product: any = [];
  isClearData: boolean = false;
  showButton: boolean = false;
  productNumber: number = 0;
  displayName: string;
  currency:string='USD';
  isHavePromotion: boolean = false;
  baseImageUrl: string = 'https://media.socialcommer.com/source/web/pic/pic-2-1.jpg';
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  scrollChange($event) {
    this.showButton = $event;
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
    let firstLoad = false;
    let self = this;
    this.storeService.store.subscribe((data) => {
      if (data && !firstLoad) {
        firstLoad = true;
        self.store = data;
        self.displayName = data.displayName;
        self.text = `Welcome to my store: ${data.name} - ${data.description}`;
        self.isHavePromotion = data.promotionNum > 0;
        self.storeService.addCart(self.storeService.getProductInCart(data.displayName));
        self.contextList = data.context ? data.context : {};
        let banner = data.images ? data.images.bannerImageStr : self.baseImageUrl;
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: banner
        });
        let tempCategory = data.category.filter((data)=>{
          return data.goodsCount !=0 ;
        });
        self.categories = [{name: 'All'}, ...tempCategory];
        self.category = this.categories[0];
        self.storeService.addStore(data);

        self.storeService.pageView({
          pt: 'store',
          vt: new Date().getTime(),
          sid: data.id
        });
        self.isClearData = false;
        self.queryProduct();
      }
    });
    self.storeService.cart.subscribe((data) => {
      if (data && data.length > 0) {
        self.productNumber = 0;
        for (let item of data) {
          self.productNumber += parseInt(item.number);
        }
      }
    });
  }

  jumpList(): void {
    this.page++;
    this.queryProduct();
  }

  changeCategory() {
    this.page = 1;
    this.isClearData = true;
    this.nextPage = true;
    this.queryProduct();
  }

  queryProduct() {
    let options = {
      cat: this.category.id,
      store: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 48
    };
    this.storeService.getProductList(options).then((data) => {
      if (this.isClearData) {
        this.isClearData = false;
        this.product = [];
      }
      this.product = this.product.concat(data.results);
      if (data.next == null) {
        this.nextPage = false;
      }
    });
  }

  back(): void {
    this.router.navigate([`./store/${this.store.displayName}`]);
  }

  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }
}
