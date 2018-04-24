import {Component, OnInit, Output, OnDestroy, EventEmitter, Input} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

@Component({
  selector: 'app-shop-template-3-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class StoreNavigationComponent implements OnInit {

  @Input() navigationIndex = 0;
  @Input() isNavigationHaveBlog = true;
  @Input() isHavePromotion = false;
  @Input() category: any;
  isShowCategoryFlag: boolean = false;
  isCategoryBold: boolean = false;
  @Output() public routerChange: EventEmitter<any> = new EventEmitter();
  @Output() public CategoryChange: EventEmitter<any> = new EventEmitter();
  // 标志着分类加粗还是导航blog about Discover 加粗
  isNavigationFlag:boolean = true ;

  routerObservable: any;

  contents = [{
    text: 'Discover'
  }, {
    text: 'Flash Sale'
  }, {
    text: 'Collections'
  }, {
    text: 'Blogs'
  }, {
    text: 'About'
  }];


  constructor(private router: Router) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy() {

  }

  isShowCategory(): void {
    this.isShowCategoryFlag = !this.isShowCategoryFlag;
  }


  changeNavigation(index) {
    this.isNavigationFlag=true ;
    this.isShowCategoryFlag = false;
    this.categoryIndex = -1;
    this.navigationIndex = index;
    this.routerChange.emit(index);
  }

  categoryIndex: number = -1;

  changeCategoryBold(isBold: boolean, index?: number) {
    this.isNavigationFlag=false ;
    this.categoryIndex = index;
    this.isCategoryBold = isBold;
    this.CategoryChange.emit(this.category[index])

  }
}
