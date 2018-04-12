import {Input, Component, OnInit, Output, EventEmitter,OnChanges} from '@angular/core';
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

export class StoreItemProductCardComponent implements OnInit,OnChanges {

  @Input() status: number = 0;
  @Input() product: any = null;
  @Input() currency: string = 'USD';
  @Output() public productId: EventEmitter<any> = new EventEmitter();

  // 活动是否开始和是否结束
  isPromotionOnGoing: boolean = false;
  isPromotionScheduled: boolean = false;
  // 倒计时,时间差，天，时
  _diff: any;
  days: any;
  hours: any;
  progressPercentage: number = 0;
  salePrice:any ;



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


  ngOnChanges() {
    this.salePrice =  this.product.salePrice ;
    if (this.product.promotionOngoing) {
      this.isPromotionOnGoing = true;
      this.progressPercentage = this.product.promotionOngoing.saleRatio;
      if (this.product.promotionOngoing.discount != '0.0') {
        this.salePrice = this.product.salePrice * this.product.promotionOngoing.discount/100;
      }
      this.settingTimes = this.product.promotionOngoing.endTimestamp * 1000 - Date.now();
    } else if (this.product.promotionScheduled) {
      this.isPromotionScheduled = true;
      if (this.product.promotionScheduled.discount != '0.0') {
        this.salePrice = this.product.salePrice * this.product.promotionScheduled.discount/100;
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
