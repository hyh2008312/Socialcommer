import {Input, Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-item-card-edit',
  templateUrl: './store-item-card.component.html',
  styleUrls: ['../store-template-2-edit.scss']
})

export class StoreItemCardComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;
  currency = 'USD';
  @Output() public productId: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  jumpProductDetail() {
    this.productId.emit(this.product.id);
  }
}
