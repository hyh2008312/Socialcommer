import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../../shop/shop';

@Component({
  selector: 'app-shop-item-product-card-4',
  templateUrl: './store-item-product-card.component.html',
  styleUrls: ['../store-template-4.scss']
})

export class StoreItemProductCardComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;
  constructor(private router: Router) {
  }


  ngOnInit(): void {
  }

  jumpLink() {
    let link = '';
    let baseLink = this.router.url;
    switch (this.status) {
      case 0:
        link = `/detail/${this.product.id}`;
        break;
      case 1:
        link = `/detail/${this.product.id}`;
        baseLink = baseLink.split('/list')[0];
        break;
      // 详情页进入详情页
      case 3:
        link = `/detail/${this.product.id}`;
        baseLink = baseLink.split('/detail')[0];
        break;
    }

    this.router.navigate([baseLink + link]);
  }
}
