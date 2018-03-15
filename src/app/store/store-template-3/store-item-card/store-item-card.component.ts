import { Input, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-item-card',
  templateUrl: './store-item-card.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class StoreItemCardComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;
  @Input() currency: any = 'USD';


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
        baseLink = baseLink.split('/list')[0];
        break;
    }

    this.router.navigate([baseLink + link]);
  }

}
