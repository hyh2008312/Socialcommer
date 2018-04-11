import {Input, Component, OnInit, Output, EventEmitter, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../../shop/shop';
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
  styleUrls: ['../_store-template-4.scss'],
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

export class StoreItemProductCardComponent implements OnInit, OnChanges {

  @Input() status: number = 0;
  @Input() product: any = null;
  @Input() currency: string = 'USD';
  @Output() scrollToTop = new EventEmitter();

  // 活动是否开始和是否结束
  isPromotionOnGoing: boolean = false;
  isPromotionScheduled: boolean = false;
  // 倒计时,时间差，天，时
  _diff: any;
  days: any;
  hours: any;

  progressPercentage: number = 0;

  constructor(private router: Router) {
  }


  ngOnInit(): void {
  }

  animationState = 'inactive';

  changeAnimationState(): void {
    this.animationState = this.animationState === 'active' ? 'inactive' : 'active';
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
      // 详情页进入详情页
      case 3:
        link = `/detail/${this.product.id}`;
        baseLink = baseLink.split('/detail')[0];
        this.scrollToTop.emit(true);
        break;
    }

    this.router.navigate([baseLink + link]);
  }

  ngOnChanges() {
    if (this.product.promotionOngoing) {
      this.isPromotionOnGoing = true;
      this.progressPercentage = this.product.promotionOngoing.saleRatio;
      if (this.product.promotionOngoing.discount != '0.0') {
        this.product.salePrice = this.product.salePrice * this.product.promotionOngoing.discount;
      }
      this.settingTimes = this.product.promotionOngoing.endTimestamp * 1000 - Date.now();
    } else if (this.product.promotionScheduled) {
      this.isPromotionScheduled = true;
      if (this.product.promotionScheduled.discount != '0.0') {
        this.product.salePrice = this.product.salePrice * this.product.promotionScheduled.discount;
      }
      this.settingTimes = this.product.promotionScheduled.startTimestamp * 1000 - Date.now();
    }
  }

  set settingTimes(time) {
    this._diff = Math.floor(time / 1000);
    this.days = Math.floor(this._diff / 3600 / 24);
    this.hours = Math.floor(this._diff / 3600 % 24);
  }

}
