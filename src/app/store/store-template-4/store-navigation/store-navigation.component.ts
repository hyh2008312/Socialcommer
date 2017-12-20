import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-shop-template-4-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../store-template-4.scss']
})

export class StoreNavigationComponent implements OnInit {
  @Input() isBlack = false;
  @Input() type: number;
  @Output() public routerChange: EventEmitter<any> = new EventEmitter();

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


  ngOnInit():void {
    let self = this;
    self.routerObservable = self.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) { // 当导航成功结束时执行
          self.routerChange.emit(true);
        }
      });
  }

  ngOnDestroy() {
    if(this.routerObservable) {
      this.routerObservable.unsubscribe();
    }
  }

}
