import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, ViewChild} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {ViewModifyBodyStyleDirective} from '../../../shared/directives/view-modify-body-style/view-modify-body-style.directive';

@Component({
  selector: 'app-store-template-5-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../_store-template-6.scss']
})

export class StoreNavigationComponent implements OnInit, OnChanges {

  @Input() isBlack = false;
  @Input() type: number;
  @Input() categories: any;
  @Input() storeName: string;
  @Input() productNumber: number = 0; //购物车数量
  @Input() displayName: string; //店铺的链接名
  @Input() isHaveBlog: boolean;  //控制blog是否显示
  @Input() isHaveFlashSale: boolean = false; //是否有促销
  @Output() public routerChange: EventEmitter<any> = new EventEmitter();
  @ViewChild(ViewModifyBodyStyleDirective) scrollTopDirective: ViewModifyBodyStyleDirective;

  isShowMore: boolean = false; //1.是否显示more的按钮 2.控制blog显示的位置(导航或者more里边)
  isShowMoreCategory: boolean = false;
  routerObservable: any;
  contents = [{
    text: 'DISCOVER',
    link: './',
    exact: true
  }
  ];
  showCategory: any = [];
  moreCategory: any = [];

  constructor(public router: Router) {
  }

  isFirstLoad: boolean = true;

  ngOnChanges(): void {
    let self = this;
    if (self.categories != null && self.categories.length != 0) {
      if (self.isFirstLoad) {
        self.isFirstLoad = false;
        if (self.categories.length <= 4) {
          self.showCategory = self.categories;
          self.isShowMore = false;
        } else {
          self.isShowMore = true;
          for (let i = 0; i < self.categories.length; i++) {
            if (i <= 2) {
              self.showCategory.push(self.categories[i]);
            } else {
              self.moreCategory.push(self.categories[i])
            }

          }
        }
      }
    }
  }


  ngOnInit(): void {
    let self = this;
    self.routerObservable = self.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) { // 当导航成功结束时执行
          self.routerChange.emit();
          if (this.scrollTopDirective)
            this.scrollTopDirective.scrollToTop();
        }
      });
  }

  ngOnDestroy() {
    if (this.routerObservable) {
      this.routerObservable.unsubscribe();
    }
  }

  changeShowMoreCategory(): void {
    this.isShowMoreCategory = !this.isShowMoreCategory;
  }

  hiddenShowMoreCategory(): void {
    this.isShowMoreCategory = false;
  }

  jumpMMCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }
}
