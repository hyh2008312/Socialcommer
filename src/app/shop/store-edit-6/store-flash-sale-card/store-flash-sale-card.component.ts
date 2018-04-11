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
  selector: 'app-edit-flash-sale-card-6',
  templateUrl: './store-flash-sale-card.component.html',
  styleUrls: ['./_store-flash-sale-card.scss'],
})

export class StoreFlashSaleCardComponent implements OnInit, OnChanges {

  @Input() status: number = 0;
  @Input() product: any = null;
  @Input() currency: string = 'USD';
  @Output() scrollToTop = new EventEmitter();
  @Output() public productId: EventEmitter<any> = new EventEmitter();

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

    let baseLink = this.router.url;
    let link = `/detail/${this.product.id}`;
    baseLink = baseLink.split('/flash')[0];
    this.router.navigate([baseLink + link]);
  }

  ngOnChanges() {
    if (this.product.promotionOngoing) {
      this.isPromotionOnGoing = true;
      this.progressPercentage = this.product.promotionOngoing.saleRatio;
      this.settingTimes = this.product.promotionOngoing.endTimestamp * 1000 - Date.now();
    } else if (this.product.promotionScheduled) {
      this.isPromotionScheduled = true;
      this.settingTimes = this.product.promotionScheduled.startTimestamp * 1000 - Date.now();
    }
  }

  set settingTimes(time) {
    this._diff = Math.floor(time / 1000);
    this.days = Math.floor(this._diff / 3600 / 24);
    this.hours = Math.floor(this._diff / 3600 % 24);
  }

  jumpProductDetail() {
    if (this.status === 3) {
      return;
    }
    this.productId.emit(this.product.id);
  }

}
