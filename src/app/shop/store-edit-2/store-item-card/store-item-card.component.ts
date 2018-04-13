import {Input, Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-item-card-edit',
  templateUrl: './store-item-card.component.html',
  styleUrls: ['../_store-template-2-edit.scss']
})

export class StoreItemCardComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;
  currency = 'USD';
  @Output() public productId: EventEmitter<any> = new EventEmitter();

  // 活动是否开始和是否结束
  isPromotionOnGoing: boolean = false;
  isPromotionScheduled: boolean = false;
  // 倒计时,时间差，天，时
  _diff: any;
  days: any;
  hours: any;
  salePrice:any ;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  jumpProductDetail() {
    this.productId.emit(this.product.id);
  }
  ngOnChanges() {
    this.salePrice =  this.product.salePrice ;
    if (this.product.promotionOngoing) {
      this.isPromotionOnGoing = true;
      if (this.product.promotionOngoing.discount != 0) {
        this.salePrice = this.product.salePrice * this.product.promotionOngoing.discount /100;
      }
      this.settingTimes = this.product.promotionOngoing.endTimestamp * 1000 - Date.now();
    } else if (this.product.promotionScheduled) {
      this.isPromotionScheduled = true;
      if(this.product.promotionScheduled.discount != 0){
        this.salePrice = this.product.salePrice * this.product.promotionScheduled.discount /100;
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
