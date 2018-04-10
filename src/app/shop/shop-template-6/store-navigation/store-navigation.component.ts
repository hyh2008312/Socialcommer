import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {ViewScrollTopDirective} from '../../../shared/directives/view-scroll-top/view-scroll-top.directive';
import {ViewModifyBodyStyleDirective} from '../../../shared/directives/view-modify-body-style/view-modify-body-style.directive';

@Component({
  selector: 'app-shop-template-5-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../_store-template-6.scss']
})

export class StoreNavigationComponent implements OnInit {
  @Input() isBlack = false;
  @Input() type: number;
  @Input() categories: any;
  @Output() public routerChange: EventEmitter<any> = new EventEmitter();
  @ViewChild(ViewModifyBodyStyleDirective) scrollTopDirective: ViewModifyBodyStyleDirective;
  templateCategories =
    [
      {id: 1, name: 'chair'},
      {id: 2, name: 'table'},
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
  }

  ngOnInit(): void {
    let self = this;
    self.routerObservable = self.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) { // 当导航成功结束时执行
          self.routerChange.emit(true);
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

  jumpCart(): void {
    this.router.navigate([`/shop/templates/preview/6/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`/shop/templates/preview/6/order`]);
  }

}
