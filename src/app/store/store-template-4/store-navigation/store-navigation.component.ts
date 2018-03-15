import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {ViewScrollTopDirective} from "../../../shared/directives/view-scroll-top/view-scroll-top.directive";

@Component({
  selector: 'app-shop-template-4-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../_store-template-4.scss']
})

export class StoreNavigationComponent implements OnInit {
  @Input() isBlack = false;
  @Input() type: number;
  @Input() displayName: string;
  @Output() public routerChange: EventEmitter<any> = new EventEmitter();
  @ViewChild(ViewScrollTopDirective) scrollTopDirective: ViewScrollTopDirective;
  routerObservable: any;


  contents = [{
    text: 'HOME',
    link: './',
    exact: true
  }, {
    text: 'COLLECTIONS',
    link: './list',
    exact: false
  }, {
    text: 'BLOG',
    link: './blog',
    exact: true
  }, {
    text: 'ABOUT',
    link: './about_me',
    exact: true
  }];


  constructor(public router: Router,) {
  }


  ngOnInit(): void {
    let self = this;
    self.routerObservable = self.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) { // 当导航成功结束时执行
          self.routerChange.emit(true);
          if (this.scrollTopDirective) {
            this.scrollTopDirective.setScrollTop();
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.routerObservable) {
      this.routerObservable.unsubscribe();
    }
  }

  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }

}
