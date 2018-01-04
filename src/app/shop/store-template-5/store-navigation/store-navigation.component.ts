import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-shop-template-5-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../store-template-5.scss']
})

export class StoreNavigationComponent implements OnInit {
  @Input() isBlack = false;
  @Input() type: number;
  @Input() categories: any;
  @Output() public routerChange: EventEmitter<any> = new EventEmitter();
  templateCategories = [{id: 1, name: 't-shirt'}, {id: 2, name: 'shoes'}, {id: 3, name: 'skirt'}];
  routerObservable: any;
  contents = [{
    text: 'HOME',
    link: './',
    exact: true
  }, {
    text: 'BLOG',
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
        }
      });
  }

  ngOnDestroy() {
    if (this.routerObservable) {
      this.routerObservable.unsubscribe();
    }
  }

}
