import { Input, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-item-product-card-4',
  templateUrl: './store-item-product-card.component.html',
  styleUrls: ['../store-template-4.scss']
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
    switch (this.status) {
      case 0:
        link = `/detail/${this.product.id}`;
        break;
      case 1:
        link = `/${this.product.id}`;
        break;
    }
    this.router.navigate([this.router.url + link]);
  }
}
