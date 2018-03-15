import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-shop-item-product-card-4',
  templateUrl: './store-item-product-card.component.html',
  styleUrls: ['../../../store/store-template-4/_store-template-4.scss'],
  animations: [
    trigger('goodsState', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})

export class StoreItemProductCardComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;
  @Input() currency: string = 'USD';
  @Output() public productId: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {
  }


  ngOnInit(): void {
  }

  animationState = 'inactive';

  changeAnimationState(): void {
    if (this.status === 3) {
      this.animationState = 'inactive';
      return;
    }
    this.animationState = this.animationState === 'active' ? 'inactive' : 'active';
  }

  jumpProductDetail() {
    if (this.status === 3) {
      return;
    }
    this.productId.emit(this.product.id);
  }


}
