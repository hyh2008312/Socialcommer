import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shop-item-product-card-5',
  templateUrl: './store-item-product-card.component.html',
  styleUrls: ['../_store-template-5.scss']
})

export class StoreItemProductCardComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;
  @Output() public productId: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  jumpProductDetail() {
    if (this.status === 3) {
      return;
    }
    this.productId.emit(this.product.id);
  }
}
