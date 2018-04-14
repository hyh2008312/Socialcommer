import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, ViewChild} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {ViewScrollTopDirective} from '../../../shared/directives/view-scroll-top/view-scroll-top.directive';

@Component({
  selector: 'app-shop-template-1-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../store.scss']
})

export class StoreNavigationComponent implements OnInit, OnChanges {

  @Input() isBlack = false;
  @Input() type: number;
  @Input() storeName: string='STORE NAME';
  @Input() displayName: string;  // 路由的店铺名
  @Output() public routerChange: EventEmitter<any> = new EventEmitter();

  isShowMore: boolean = false; //1.是否显示more的按钮 2.控制blog显示的位置(导航或者more里边)
  isShowMoreCategory: boolean = false;
  routerObservable: any;
  //是否为新手引导
  isGuide: boolean = false;

  contents = [{
    text: 'Home',
    link: './',
  }, {
    text:'All Collections',
    link:'./list'
  }

  ];
  showCategory: any = [];
  moreCategory: any = [];

  constructor(public router: Router) {
    let url = this.router.url;
    this.isGuide = url.indexOf('guide/preview') >= 0;
  }

  isFirstLoad: boolean = true;

  ngOnChanges(): void {
    let self = this;
  }


  ngOnInit(): void {
    let self = this;
    self.routerObservable = self.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) { // 当导航成功结束时执行
          self.routerChange.emit();
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

  jumpCart(): void {
    if(this.isGuide){
      this.router.navigate([`/shop/guide/preview/1/cart`]);
    }else {
      this.router.navigate([`/shop/templates/preview/1/cart`]);
    }

  }
  jumpOrder(): void {
    if(this.isGuide){
      this.router.navigate([`/shop/guide/preview/1/order`]);
    }else {
      this.router.navigate([`/shop/templates/preview/1/order`]);
    }
  }

}
