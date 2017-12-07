import { Component, OnInit, Output, OnDestroy, EventEmitter} from '@angular/core';
import { Router, NavigationStart } from  '@angular/router';

@Component({
  selector: 'app-store-template-3-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class StoreNavigationComponent implements OnInit {

  @Output() public routerChange: EventEmitter<any> = new EventEmitter();

  routerObservable: any;

  contents = [{
    text: 'HOME',
    link: './',
    exact: true
  }, {
    text: 'COLLECTION',
    link: './list',
    exact: false
  }, {
    text: 'BLOG',
    link: './blog',
    exact: true
  }, {
    text: 'ABOUT ME',
    link: './about_me',
    exact: true
  }];

  constructor(
    private router: Router
  ) {

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
