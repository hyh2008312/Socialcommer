import {Input, Component, OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shop-item-product-card-5',
  templateUrl: './store-item-product-card.component.html',
  styleUrls: ['../_store-template-5.scss']
})

export class StoreItemProductCardComponent implements OnInit, OnChanges {

  @Input() status: number = 0;
  @Input() product: any = null;
  @Input() currency: string = 'USD';


  // 活动是否开始和是否结束
  isPromotionOnGoing: boolean = false;
  isPromotionScheduled: boolean = false;
  // 倒计时,时间差，天，时
  _diff: any;
  days: any;
  hours: any;
  salePrice: any;
  progressPercentage: number = 0;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
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
        baseLink = baseLink.split('/category')[0];
        break;
      // 详情页进入详情页
      case 2:
        link = `/detail/${this.product.id}`;
        baseLink = baseLink.split('/detail')[0];
        if (document.querySelector('html')) {
          document.querySelector('html').scrollTop = 0;
        }
        break;
    }
    this.router.navigate([baseLink + link]);
  }

  ngOnChanges() {
    this.salePrice = this.product.salePrice;
    if (this.product.promotionOngoing) {
      this.isPromotionOnGoing = true;
      this.progressPercentage = this.product.promotionOngoing.saleRatio;
      if (this.product.promotionOngoing.discount != 0) {
        this.salePrice = this.product.salePrice * this.product.promotionOngoing.discount / 100;
      }
      this.settingTimes = this.product.promotionOngoing.endTimestamp * 1000 - Date.now();
    } else if (this.product.promotionScheduled) {
      this.isPromotionScheduled = true;
      if (this.product.promotionScheduled.discount != 0) {
        this.salePrice = this.product.salePrice * this.product.promotionScheduled.discount / 100;
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
