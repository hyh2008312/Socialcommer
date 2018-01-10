import { Input, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-item-product-card-5',
  templateUrl: './store-item-product-card.component.html',
  styleUrls: ['../store-template-5.scss']
})

export class StoreItemProductCardComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;

  constructor(
    private router: Router
  ) {}

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
        baseLink = baseLink.split('/category')[0];
        break;
    }
    this.router.navigate([baseLink + link]);
  }
}
