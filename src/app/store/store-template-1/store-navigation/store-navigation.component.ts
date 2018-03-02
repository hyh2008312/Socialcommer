import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, ViewChild} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {ViewScrollTopDirective} from '../../../shared/directives/view-scroll-top/view-scroll-top.directive';

@Component({
  selector: 'app-store-template-1-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../../store.scss']
})

export class StoreNavigationComponent implements OnInit, OnChanges {

  @Input() isBlack = false;
  @Input() type: number;
  @Input() storeName: string;
  @Input() displayName: string;  // 路由的店铺名
  @Output() public routerChange: EventEmitter<any> = new EventEmitter();

  isShowMore: boolean = false; //1.是否显示more的按钮 2.控制blog显示的位置(导航或者more里边)
  isShowMoreCategory: boolean = false;
  routerObservable: any;
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
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }

}
