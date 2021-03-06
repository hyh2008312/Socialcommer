import { Input, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-item-card',
  templateUrl: './store-item-card.component.html',
  styleUrls: ['../_store-template-2.scss']
})

export class StoreItemCardComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;

  currency = 'USD';

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
