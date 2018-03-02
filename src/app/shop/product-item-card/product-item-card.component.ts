import { Input, Component, OnInit, OnChanges} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-product-item-card',
  templateUrl: './product-item-card.component.html',
  styleUrls: ['./_product-item-card.scss'],
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

export class ProductItemCardComponent implements OnInit {

  @Input() product:any = {};
  @Input() supplier: any = false;
  @Input() isRecommend: any = false;

  currency: string = 'USD';
  commission: any = 0;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  animationState = 'inactive';

  changeAnimationState(): void {
    this.animationState = this.animationState === 'active' ? 'inactive' : 'active';
  }

  ngOnChanges() {
    this.commission = this.product.commissionRate;
  }

  jumpLink() {
    if(this.supplier) {
      this.router.navigate([`/shop/listings/items/supplier/${this.product.supplierId}/${this.product.id}/`]);
    } else {
      this.router.navigate([`/shop/listings/items/${this.product.id}/`]);
    }
  }

  jumpEditLink() {
    if(this.supplier) {
      this.router.navigate([`/shop/listings/items/supplier/${this.product.supplierId}/${this.product.id}/preview/`]);
    } else {
      this.router.navigate([`/shop/listings/items/${this.product.id}/preview/`]);
    }
  }

}
