import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-store-item-card-preview',
  templateUrl: './store-item-card-preview.component.html',
  styleUrls: ['./_store-item-card-preview.scss']
})

export class StoreItemCardPreviewComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;
  @Output() public productId: EventEmitter<any> = new EventEmitter();
  @Input() isShowPromotionFlag: boolean = true;

  // 活动是否开始和是否结束
  isPromotionOnGoing: boolean = false;
  isPromotionScheduled: boolean = false;
  // 倒计时,时间差，天，时
  _diff: any;
  days: any;
  hours: any;
  progressPercentage: number = 0;
  currency = 'USD';

  constructor() {
  }

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
