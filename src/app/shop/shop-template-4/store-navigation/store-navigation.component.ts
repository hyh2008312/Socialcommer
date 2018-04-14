import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-shop-template-4-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../_store-template-4.scss']
})

export class StoreNavigationComponent implements OnInit {
  @Input() isBlack = false;
  @Input() type: number;
  @Output() public routerChange: EventEmitter<any> = new EventEmitter();

  routerObservable: any;
  contents = [{
    text: 'Home',
    link: './',
    exact: true
  }, {
    text: 'Collections',
    link: './list',
    exact: false
  }, {
    text: 'Blogs',
    link: './blog',
    exact: true
  }, {
    text: 'About',
    link: './about_me',
    exact: true
  }];

  //是否为新手引导
  isGuide: boolean = false;

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
        }
      });
  }

  ngOnDestroy() {
    if (this.routerObservable) {
      this.routerObservable.unsubscribe();
    }
  }

  jumpOrder(): void {
    if (this.isGuide) {
      this.router.navigate([`/shop/guide/preview/4/order`]);
    } else {
      this.router.navigate([`/shop/templates/preview/4/order`]);
    }
  }
}
