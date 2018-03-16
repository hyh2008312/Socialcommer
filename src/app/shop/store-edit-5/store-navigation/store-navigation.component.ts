import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-shop-template-5-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../_store-template-5.scss']
})

export class StoreNavigationComponent implements OnInit {
  @Input() categories: any;
  @Output() public navigationChange: EventEmitter<any> = new EventEmitter();
  @Output() public categoryChange: EventEmitter<any> = new EventEmitter();
  @Input() navigationIndex = 0;
  @Input() isCategory = false;
  contents = [{
    name: 'DISCOVER',
  }, {
    name: 'BLOG',
  }];


  constructor(public router: Router) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
  }

  changeNavigation(index: any) {
    this.isCategory = false;
    this.navigationIndex = index;
    this.navigationChange.emit(this.navigationIndex)

  }

  changeCategoryNavigation(index: any) {
    this.isCategory = true;
    this.navigationIndex = index;
    let cate = {
      'category': this.categories[index],
      'index': index
    };
    this.categoryChange.emit(cate);
  }
}
