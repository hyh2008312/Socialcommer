import { Component, OnInit, Output, OnDestroy, EventEmitter, Input} from '@angular/core';
import { Router, NavigationStart } from  '@angular/router';

@Component({
  selector: 'app-shop-template-3-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class StoreNavigationComponent implements OnInit {

  @Input() navigationIndex = 0;
  @Output() public routerChange: EventEmitter<any> = new EventEmitter();

  routerObservable: any;

  contents = [{
    text: 'HOME'
  }, {
    text: 'COLLECTION'
  }, {
    text: 'BLOG'
  }, {
    text: 'ABOUT ME'
  }];


  constructor(
    private router: Router
  ) {

  }

  ngOnInit():void {

  }

  ngOnDestroy() {

  }

  changeNavigation(index) {
    this.navigationIndex = index;
    this.routerChange.emit(index);
  }

}
