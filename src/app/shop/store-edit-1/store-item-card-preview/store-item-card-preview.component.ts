import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-store-item-card-preview',
  templateUrl: './store-item-card-preview.component.html',
  styleUrls: ['../../../store/store.scss', '../../shop.css']
})

export class StoreItemCardPreviewComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;
  @Output() public productId: EventEmitter<any> = new EventEmitter();

  currency = 'USD';

  constructor() {
  }

  ngOnInit(): void {
  }

  jumpProductDetail() {
    this.productId.emit(this.product.id);
  }

}
