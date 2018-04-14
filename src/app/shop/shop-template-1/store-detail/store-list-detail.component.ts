import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store, Product, Image} from '../../store';

@Component({
  selector: 'app-shop-template-1-store-list-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['../store.scss']
})

export class StoreListDetailComponent implements OnInit {

  public shareLink: string;
  public text = '';
  store: Store = new Store();
  product: any;
  image: any = [];
  selectedImage: any = false;
  imageSources: string[] = [];
  showButton: any = false;

  //是否为新手引导
  isGuide: boolean = false;


  recommendation = 'Use this section to tell your customers why you pick this product.';

  categoryName = 'Category Name';

  description = "This is a brief paragraph that describes the product to entice buyers. If you're writing a product description, take some time to prewrite. Research your product and the audience so you know how to best sell the product. From there, write down the statement. Start with a great opening and then describe the product vividly in a couple of short sentences. When you're finished, reread the statement. Watch for cliche phrases and lengthy sentences and revise the statement as necessary."

  productList = [{
    id: 0,
    imageUrl: "https://media.xberts.com/collector/source/web/templats/01-pic-1.jpg",
    originalPriceAmount: 55.95,
    originalPriceCurrency: "USD",
    salePriceAmount: 39.30,
    salePriceCurrency: "USD",
    title: "Skin Care and Cosmetic Ingredients Dictionary. "
  }, {
    id: 1,
    imageUrl: "https://media.xberts.com/collector/source/web/templats/01-pic-2.jpg",
    originalPriceAmount: 39.00,
    originalPriceCurrency: "USD",
    salePriceAmount: 19.00,
    salePriceCurrency: "USD",
    title: "Mermaid Chunky Glitter Large 30g Jar COSMETIC GLITTER Festival Face Body"
  }, {
    id: 2,
    imageUrl: "https://media.xberts.com/collector/source/web/templats/01-pic-3.jpg",
    originalPriceAmount: 39.00,
    originalPriceCurrency: "USD",
    salePriceAmount: 19.00,
    salePriceCurrency: "USD",
    title: "Black Markup Mirror 6 Inch 3x Magnification LED Light Two-Sided Table"
  }, {
    id: 3,
    imageUrl: "https://media.xberts.com/collector/source/web/templats/01-pic-4.jpg",
    originalPriceAmount: 49.99,
    originalPriceCurrency: "USD",
    salePriceAmount: 19.99,
    salePriceCurrency: "USD",
    title: "Eyelash Dreamer Makeup Bag, Eyelash Dreamer, Makeup Bag, Makeup, Lash "
  }, {
    id: 4,
    imageUrl: "https://media.xberts.com/collector/source/web/templats/01-pic-5.jpg",
    originalPriceAmount: 6.00,
    originalPriceCurrency: "USD",
    salePriceAmount: 4.99,
    salePriceCurrency: "USD",
    title: "E.l.f Hydrating Face Primer, 0.47 Fluid Ounce"
  }, {
    id: 5,
    imageUrl: "https://media.xberts.com/collector/source/web/templats/01-pic-6.jpg",
    originalPriceAmount: 49.99,
    originalPriceCurrency: "USD",
    salePriceAmount: 35.99,
    salePriceCurrency: "USD",
    title: "The Best Organic Vitamin C Serum - [BIG 2-OZ Bottle] - Hyaluronic Acid, 20% C + E"
  }];

  constructor(public router: Router,
              private activatedRouter: ActivatedRoute,
              private storeService: StoreService) {
    let url = this.router.url;
    this.isGuide = url.indexOf('guide/preview') >= 0;
    let self = this;
    this.storeService.store.subscribe((data) => {
      if (data) {
        self.store = data;
      }
    });
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

    let id = this.activatedRouter.snapshot.params['id'];
    this.product = this.productList[id];
    this.image = [this.product.imageUrl];
    this.selectedImage = this.product.imageUrl;
    this.imageSources.push(this.product.imageUrl);
  }

  scrollChange($event) {
    this.showButton = $event;
  }

  close(): void {
    if (this.isGuide) {
      this.router.navigate([`/shop/guide/preview/1/list`]);
    } else {
      this.router.navigate([`/shop/templates/preview/1/list`]);
    }
  }
  openLink() {
    let id = this.activatedRouter.snapshot.params['id'];
    this.storeService.buttonClick({
      viewTime: new Date().getTime(),
      relationId: id,
      storeId: this.store.id
    });
  }

}
