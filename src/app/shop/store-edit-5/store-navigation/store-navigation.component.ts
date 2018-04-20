import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-shop-template-5-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../_store-template-5.scss']
})

export class StoreNavigationComponent implements OnInit ,OnChanges{
  @Input() categories: any;
  @Output() public navigationChange: EventEmitter<any> = new EventEmitter();
  @Output() public categoryChange: EventEmitter<any> = new EventEmitter();
  @Input() navigationIndex = 0;
  @Input() isCategory = false;
  @Input() isNavigationHaveBlog = false;
  @Input() isHavePromotion = false;
  @Output() public openCart: EventEmitter<any> = new EventEmitter();
  @Output() public openOrder: EventEmitter<any> = new EventEmitter();

  isFirstLoad: boolean = true;
  contents = [{
    name: 'DISCOVER',
  }, {
    name: 'BLOGS',
  }, {
    name: 'Flash Sale'
  }
  ];

  isShowMore: boolean = false; //1.是否显示more的按钮 2.控制blog显示的位置(导航或者more里边)
  isShowMoreCategory: boolean = false;
  showCategory: any = [];
  moreCategory: any = [];

  isClickShow:boolean =true ;

  constructor(public router: Router) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
  }

  ngOnChanges(): void {
    let self = this;
    if (self.categories != null && self.categories.length != 0) {
      if (self.isFirstLoad) {
        self.isFirstLoad = false;
        if (self.categories.length <= 4) {
          self.showCategory = self.categories;
          self.isShowMore = false;
        } else {
          self.isShowMore = true;
          for (let i = 0; i < self.categories.length; i++) {
            if (i <= 2) {
              self.showCategory.push(self.categories[i]);
            } else {
              self.moreCategory.push(self.categories[i])
            }

          }
        }
      }
    }
  }


  changeShowMoreCategory(): void {
    this.isShowMoreCategory = !this.isShowMoreCategory;
  }





  changeNavigation(index: any) {
    this.isCategory = false;
    this.navigationIndex = index;
    this.navigationChange.emit(this.navigationIndex)

  }

  changeCategoryNavigation(index: any) {
    this.isCategory = true;
    this.isClickShow = true;
    this.navigationIndex = index;
    let cate = {
      'category': this.showCategory[index],
      'index': index
    };
    this.categoryChange.emit(cate);
  }

  hiddenShowMoreCategory(index:any): void {
    this.isShowMoreCategory = false;
    this.isCategory = true;
    this.isClickShow = false;
    this.navigationIndex = index;
    let cate = {
      'category': this.moreCategory[index],
      'index': index
    };
    this.categoryChange.emit(cate);
  }

  openStoreCart(): void {
    this.openCart.emit();
  }

  openStoreOrder(): void {
    this.openOrder.emit();
  }
}
