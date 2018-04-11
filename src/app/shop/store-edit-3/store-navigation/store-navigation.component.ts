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

  @Output() public routerChange: EventEmitter<any> = new EventEmitter();

  routerObservable: any;

  contents = [{
    text: 'Home'
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

  changeNavigation(index) {
    this.navigationIndex = index;
    this.routerChange.emit(index);
  }
}
