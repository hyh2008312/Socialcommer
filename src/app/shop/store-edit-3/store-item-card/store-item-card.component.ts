import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-item-card',
  templateUrl: './store-item-card.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class StoreItemCardComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;
  @Output() public productId: EventEmitter<any> = new EventEmitter();
  currency = 'USD';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  jumpProductDetail() {
    this.productId.emit(this.product.id);
  }

}
