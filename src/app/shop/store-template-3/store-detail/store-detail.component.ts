import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store, Product, Image} from '../../store';

@Component({
  selector: 'app-shop-template-3-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class StoreDetailComponent implements OnInit {

  public shareLink: string;
  public text = '';
  store: Store = new Store();
  product: any;
  image: any = [];
  selectedImage: any = false;
  imageSources: string[] = [];
  showButton: boolean = false;

  recommendation = 'Use this section to tell your customers why you pick this product.';

  categoryName = 'Category Name';

  description = "This is a brief paragraph that describes the product to entice buyers. If you're writing a product description, take some time to prewrite. Research your product and the audience so you know how to best sell the product. From there, write down the statement. Start with a great opening and then describe the product vividly in a couple of short sentences. When you're finished, reread the statement. Watch for cliche phrases and lengthy sentences and revise the statement as necessary."

  productList = [{
    id: 0,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/3/12-pic.jpg'
  }, {
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/3/07-pic.jpg'
  }, {
    id: 2,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/3/13-pic.jpg'
  }, {
    id: 3,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/3/14-pic.jpg'
  }, {
    id: 4,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/3/12-pic.jpg'
  }, {
    id: 5,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/3/07-pic.jpg'
  }];

  constructor(public router: Router,
              private activatedRouter: ActivatedRoute,
              private storeService: StoreService) {
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

  close(): void {
    this.router.navigate([`/shop/store/templates/preview/3`]);
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
