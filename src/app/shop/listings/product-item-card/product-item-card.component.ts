import {Input, Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {UserService} from '../../../shared/services/user/user.service';

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

  @Input() product: any = {};
  @Input() supplier: any = false;
  @Input() isRecommend: any = false;
  @Input() isShowPromotionFlag: boolean = false;

  currency: string = 'USD';
  commission: any = 0;

  sub: any;
  // 活动是否开始和是否结束
  isPromotionOnGoing: boolean = false;
  isPromotionScheduled: boolean = false;
  // 倒计时,时间差，天，时
  _diff: any;
  days: any;
  hours: any;
  progressPercentage: number = 0;

  salePrice: any;

  constructor(private router: Router,
              private userService: UserService) {
    this.sub = this.userService.store.subscribe((data) => {
      if (data) {
        this.currency = data.currency.toUpperCase();
      }
    });
  }

  ngOnInit(): void {
    this.sub.unsubscribe();
  }

  animationState = 'inactive';

  changeAnimationState(): void {
    this.animationState = this.animationState === 'active' ? 'inactive' : 'active';
  }

  ngOnDestroy() {

  }

  ngOnChanges() {
    this.commission = this.product.commissionRate;
    this.salePrice = this.product.saleUnitPrice;
    if (this.product.promotionOngoing) {
      this.isPromotionOnGoing = true;
      this.progressPercentage = this.product.promotionOngoing.saleRatio;
      if (this.product.promotionOngoing.discount != '0.0') {
        this.salePrice = this.product.saleUnitPrice * this.product.promotionOngoing.discount / 100;
      }
      this.settingTimes = this.product.promotionOngoing.endTimestamp * 1000 - Date.now();
    } else if (this.product.promotionScheduled) {
      if (this.product.promotionScheduled.discount != '0.0') {
        this.salePrice = this.product.saleUnitPrice * this.product.promotionScheduled.discount / 100;
      }
      this.isPromotionScheduled = true;
      this.settingTimes = this.product.promotionScheduled.startTimestamp * 1000 - Date.now();
    }
  }

  set settingTimes(time) {
    this._diff = Math.floor(time / 1000);
    this.days = Math.floor(this._diff / 3600 / 24);
    this.hours = Math.floor(this._diff / 3600 % 24);
  }


  jumpLink() {
    if (this.supplier) {
      this.router.navigate([`/shop/listings/items/supplier/${this.product.supplierId}/${this.product.id}/`]);
    } else {
      this.router.navigate([`/shop/listings/items/${this.product.id}/`]);
    }
  }

  jumpEditLink() {
    if (this.supplier) {
      this.router.navigate([`/shop/listings/items/supplier/${this.product.supplierId}/${this.product.id}/preview/`]);
    } else {
      this.router.navigate([`/shop/listings/items/${this.product.id}/preview/`]);
    }
  }

  shareToEarn() {
    if (this.supplier) {
      this.router.navigate([`/shop/listings/items/supplier/${this.product.supplierId}/${this.product.id}/share/`]);
    } else {
      this.router.navigate([`/shop/listings/items/${this.product.id}/share/`]);
    }
  }

}
