import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store, Product, Image } from '../../store';

@Component({
  selector: 'app-shop-template-2-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['../_store-template-2.scss']
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

  productList: any = [{
    id: 0,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/blog/cover/1c4078ad-f91f-46c4-bd13-a3d75e578f06.jpg'
  }, {
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-8.jpg'
  }, {
    id: 2,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-9.jpg'
  }, {
    id: 3,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-10.jpg'
  }, {
    id: 4,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/blog/cover/84e6476b-bc20-45eb-8501-62b9a9a96f0d.jpg'
  }, {
    id: 5,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/pic/pic-2-7.jpg'
  }];

  constructor(
    public router: Router,
    private activatedRouter: ActivatedRoute,
    private storeService: StoreService
  ) {
    let self = this;
    this.storeService.store.subscribe((data) => {
      if(data) {
        self.store = data;
      }
    });
  }

  ngOnInit():void {
    this.shareLink = window.location.href;

    let id = this.activatedRouter.snapshot.params['id'];
    this.product = this.productList[id];
    this.image = [this.product.imageUrl];
    this.selectedImage = this.product.imageUrl;
    this.imageSources.push(this.product.imageUrl);
  }

  close():void {
    this.router.navigate([`/shop/templates/preview/2`]);
  }

  openLink() {
  }

}
