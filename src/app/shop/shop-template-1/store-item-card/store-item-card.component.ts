import { Input, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-template-1-store-item-card',
  templateUrl: './store-item-card.component.html',
  styleUrls: ['../../shop.css','../_store.scss']
})

export class StoreItemCardComponent implements OnInit {

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
