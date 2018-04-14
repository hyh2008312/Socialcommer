import {Component, OnInit, Output, OnDestroy, EventEmitter, Input} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

@Component({
  selector: 'app-shop-template-3-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class StoreNavigationComponent implements OnInit {

  @Output() public routerChange: EventEmitter<any> = new EventEmitter();
  @Input() isMobile:boolean = false ;

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
  constructor(private router: Router) {
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
    if(this.isGuide){
      this.router.navigate([`/shop/guide/preview/3/order`]);
    }else {
      this.router.navigate([`/shop/templates/preview/3/order`]);
    }

  }

}
