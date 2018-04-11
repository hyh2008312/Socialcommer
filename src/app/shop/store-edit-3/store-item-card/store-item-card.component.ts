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
  // 活动是否开始和是否结束
  isPromotionOnGoing: boolean = false;
  isPromotionScheduled: boolean = false;
  // 倒计时,时间差，天，时
  _diff: any;
  days: any;
  hours: any;

  progressPercentage: number = 0;
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  jumpProductDetail() {
    this.productId.emit(this.product.id);
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

}
