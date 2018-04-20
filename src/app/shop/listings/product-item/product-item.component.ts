import {Input, Output, Component, OnInit, OnChanges, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

import {ShopService} from '../shop.service';
import {UserService} from '../../../shared/services/user/user.service';

import {ProductShareDialogComponent} from "../product-share-dialog/product-share-dialog.component";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['../_shop.scss']
})

export class ProductItemComponent implements OnInit, OnChanges {

  @Input() status: number = 0;
  @Input() product: any = null;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  storeId;
  storeCurrency = 'USD';
  displayName = '';
  templateId = 5;

  link: string = '';
  text: string = '';

  // 活动是否开始和是否结束
  isPromotionOnGoing: boolean = false;
  isPromotionScheduled: boolean = false;
  // 倒计时,时间差，天，时
  _diff: any;
  days: any;
  hours: any;
  progressPercentage: number = 0;

  salePrice: any;

  constructor(private shopService: ShopService,
              private userService: UserService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    let self = this;
    self.userService.store.subscribe((data) => {
      if (data) {
        self.storeId = data.id;
        self.storeCurrency = data.currency.toUpperCase();
        self.displayName = data.displayName;
        self.templateId = data.template ? data.template.templateId : 5;
        self.link = `http://${window.location.host}/store/${this.displayName}/${this.templateId}/detail/${this.product.id}`;
        self.text = this.product.title;
      }
    });
  }


  delete() {
    let self = this;

    self.shopService.deleteProduct(this.product).then((data) => {
      self.productChange.emit({
        product: self.product,
        event: 'delete',
        status: self.status,
        index: self.index
      })
    });
  }

  publish() {
    let self = this;

    let product = {
      id: this.product.id,
      status: 'published'
    };

    self.shopService.publishProduct(product).then((data) => {
      self.productChange.emit({
        product: data,
        event: 'publish',
        status: self.status,
        index: self.index
      })
    });
  }

  unpublish() {
    let self = this;

    let product = {
      id: this.product.id,
      status: 'unpublished'
    };

    self.shopService.publishProduct(product).then((data) => {
      self.productChange.emit({
        product: self.product,
        event: 'unpublish',
        status: self.status,
        index: self.index
      })
    });
  }

  shareToYoutube() {
    let dialogRef = this.dialog.open(ProductShareDialogComponent, {
      data: {
        shareLink: `http://${window.location.host}/store/${this.displayName}/${this.templateId}/detail/${this.product.id}`,
        text: this.product.title
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  edit() {
    let tab = '';
    switch (this.status) {
      case 0:
        tab = 'publish';
        break;
      case 1:
        tab = 'unpublish';
        break;
    }
    this.router.navigate([`shop/listings/products/${this.product.id}/edit`], {queryParams: {tab}});
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
      if (this.product.promotionScheduled.discount != 0) {
        this.salePrice = this.product.salePrice * this.product.promotionScheduled.discount / 100;
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
  jumpProductDetails() {
      this.router.navigate([`/shop/listings/products/${this.product.productId}/`]);
  }

}
