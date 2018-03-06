import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-shop-template-category-card',
  templateUrl: './store-category-card.component.html',
  styleUrls: ['../_store-template-5.scss']
})

export class StoreCategoryCardComponent implements OnInit {
  @Input() categoryName: string;
  @Input() categoryId: number;
  product: any;
  categoryOneProduct: any = [{
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623089.jpg'
  }, {
    id: 2,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623090.jpg'
  }, {
    id: 3,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623086.jpg'
  }];

  categoryTwoProduct: any = [{
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623083.jpg'
  }, {
    id: 2,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623091.jpg'
  }, {
    id: 3,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623087.jpg'
  }];

  categoryThreeProduct: any = [{
    id: 1,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623089.jpg'
  }, {
    id: 2,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623090.jpg'
  }, {
    id: 3,
    title: 'Product Name',
    salePriceAmount: '12',
    salePriceCurrency: 'USD',
    originalPriceAmount: '16',
    originalPriceCurrency: 'USD',
    imageUrl: 'https://media.socialcommer.com/source/web/template/5/fashion-1623086.jpg'
  }];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    switch (this.categoryId) {
      case 1:
        this.product = this.categoryOneProduct;
        break;
      case 2:
        this.product = this.categoryTwoProduct;
        break;
      case 3:
        this.product = this.categoryThreeProduct;
        break;
      default:
        this.product = this.categoryOneProduct;
    }
  }

  jumpToCategory() {
    this.router.navigate(['./category',this.categoryId], {relativeTo: this.activatedRoute});

  }


}
