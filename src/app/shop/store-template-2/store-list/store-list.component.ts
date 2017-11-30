import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-3-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['../store-template-2.scss']
})

export class StoreListComponent implements OnInit {

  public categories: any = [];
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
  product: any = [{
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-7.jpg'
  }, {
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-8.jpg'
  }, {
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-9.jpg'
  }, {
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-10.jpg'
  }, {
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-9.jpg'
  }, {
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-7.jpg'
  }
  ];

  isClearData: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
    let firstLoad = false;

    this.storeService.store.subscribe((data) => {
      if (data && !firstLoad) {
        firstLoad = true;
        this.store = data;
        this.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        this.categories = [{name: 'All'}, ...data.category];
        this.category = this.categories[0];
        this.storeService.addStore(data);

        this.storeService.pageView({
          pageType: 'store',
          viewTime: new Date().getTime(),
          storeId: data.id
        });
        this.isClearData=false ;
        console.log( "-------->"+this.isClearData);
        this.queryProduct();
      }
    });
  }

  changeCategory() {

  }

  queryProduct() {
  }

  back(): void {
    this.router.navigate([`./store/${this.store.displayName}`]);
  }
}
