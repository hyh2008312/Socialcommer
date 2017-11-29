import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store } from '../../store';

@Component({
  selector: 'app-shop-template-1-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['../store.scss']
})

export class StoreListComponent implements OnInit {

  public categories:any = [{
    id: 0,
    name: 'All'
  }, {
    id: 0,
    name: 'Electronics'
  }];
  public category: any = {
    id: 0,
    name : 'All'
  };
  public shareLink: string;
  public text = '';

  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;
  product = [{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-1.jpg",
    originalPriceAmount : 55.95,
    originalPriceCurrency : "USD",
    salePriceAmount : 39.30,
    salePriceCurrency : "USD",
    title : "Skin Care and Cosmetic Ingredients Dictionary. "
  }, {
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-2.jpg",
    originalPriceAmount : 39.00,
    originalPriceCurrency : "USD",
    salePriceAmount : 19.00,
    salePriceCurrency : "USD",
    title : "Mermaid Chunky Glitter Large 30g Jar COSMETIC GLITTER Festival Face Body"
  },{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-3.jpg",
    originalPriceAmount : 39.00,
    originalPriceCurrency : "USD",
    salePriceAmount : 19.00,
    salePriceCurrency : "USD",
    title : "Black Markup Mirror 6 Inch 3x Magnification LED Light Two-Sided Table"
  },{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-4.jpg",
    originalPriceAmount : 49.99,
    originalPriceCurrency : "USD",
    salePriceAmount : 19.99,
    salePriceCurrency : "USD",
    title : "Eyelash Dreamer Makeup Bag, Eyelash Dreamer, Makeup Bag, Makeup, Lash "
  },{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-5.jpg",
    originalPriceAmount : 6.00,
    originalPriceCurrency : "USD",
    salePriceAmount : 4.99,
    salePriceCurrency : "USD",
    title : "E.l.f Hydrating Face Primer, 0.47 Fluid Ounce"
  },{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-6.jpg",
    originalPriceAmount : 49.99,
    originalPriceCurrency : "USD",
    salePriceAmount : 35.99,
    salePriceCurrency : "USD",
    title : "The Best Organic Vitamin C Serum - [BIG 2-OZ Bottle] - Hyaluronic Acid, 20% C + E"
  }];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {

    let storeName = this.activatedRoute.snapshot.params['name'];
    let self = this;
    this.storeService.getStore(storeName).then((data) => {
      self.storeService.addStore(data);
    });
  }

  ngOnInit():void {
    this.shareLink = window.location.href;
  }

  changeCategory() {
    this.page = 1;
    this.queryProduct(true);
  }

  queryProduct(clearProduct?:boolean) {

  }

  jumpList():void {
    this.page++;
    this.queryProduct();
  }

  back():void {
    this.router.navigate([`./store/${this.store.displayName}`]);
  }
}
