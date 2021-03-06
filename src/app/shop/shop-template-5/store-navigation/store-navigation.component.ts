import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {ViewScrollTopDirective} from '../../../shared/directives/view-scroll-top/view-scroll-top.directive';

@Component({
  selector: 'app-shop-template-5-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../_store-template-5.scss']
})

export class StoreNavigationComponent implements OnInit {
  @Input() isBlack = false;
  @Input() type: number;
  @Input() categories: any;
  @Output() public routerChange: EventEmitter<any> = new EventEmitter();
  @ViewChild(ViewScrollTopDirective) scrollTopDirective: ViewScrollTopDirective;
  //是否为新手引导
  isGuide: boolean = false;
  templateCategories =
    [
      {id: 1, name: 'Daily Specials'},
      {id: 2, name: 'Dresses'},
      {id: 3, name: 'Skirts'},
      {id: 4, name: 'Jeans'},
      {id: 5, name: 'Shoes'},
      {id: 6, name: 'Handbags'},
    ];
  routerObservable: any;
  contents = [{
    text: 'DISCOVER',
    link: './',
    exact: true
  }, {
    text: 'BLOGS',
    link: './blog',
    exact: true
  }];

  categoryContents: any;


  constructor(public router: Router) {
    let url = this.router.url;
    this.isGuide = url.indexOf('guide/preview') >= 0;
  }

  ngOnInit(): void {
    let self = this;
    self.routerObservable = self.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) { // 当导航成功结束时执行
          self.routerChange.emit(true);
          if (this.scrollTopDirective)
            this.scrollTopDirective.setScrollTop();
        }
      });
  }

  ngOnDestroy() {
    if (this.routerObservable) {
      this.routerObservable.unsubscribe();
    }
  }

  jumpCart(): void {
    if (this.isGuide) {
      this.router.navigate([`/shop/guide/preview/5/cart`]);
    } else {
      this.router.navigate([`/shop/templates/preview/5/cart`]);
    }

  }

  jumpOrder(): void {
    if (this.isGuide) {
      this.router.navigate([`/shop/guide/preview/5/order`]);
    } else {
      this.router.navigate([`/shop/templates/preview/5/order`]);
    }

  }

}
