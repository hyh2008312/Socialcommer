import {Component, OnInit, Output, OnDestroy, EventEmitter, Input} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

@Component({
  selector: 'app-store-template-3-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class StoreNavigationComponent implements OnInit {

  @Output() public routerChange: EventEmitter<any> = new EventEmitter();

  @Input() displayName: string;
  @Input() isShowBlog: boolean = false;
  @Input() isHaveFlashSale: boolean = false;
  @Input() category: any;
  @Input() selectCategory: any;

  isShowCategoryFlag: boolean = false;

  isCategoryBold: boolean = false;


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
  },
    {
      text: 'Flash Sale',
      link: './flash',
      exact: true
    }];

  constructor(private router: Router) {
    let arraylist = this.router.url.split('/3/list/');
    if (arraylist.length == 2) {
      this.isCategoryBold = true;
      this.isShowCategoryFlag = true;
    }
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

  jumpOrderList(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }

  jumpCategory(): void {
    this.router.navigate([`./store/${this.displayName}/3/list`, this.selectCategory.id]);
  }

  isShowCategory(): void {
    this.isShowCategoryFlag = !this.isShowCategoryFlag;
  }

  changeCategoryBold(isBold: boolean) {
    this.isCategoryBold = isBold;
    if (!isBold) {
      this.isShowCategoryFlag = false;
    }
  }

}
