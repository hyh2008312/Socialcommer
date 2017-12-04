import {Component, OnInit, OnDestroy, Input, Output,EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-store-template-edit-2-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../store-template-2-edit.scss']
})

export class StoreNavigationComponent implements OnInit {
  @Output() public routerChange: EventEmitter<number> = new EventEmitter();
  @Input() isBlack =false;
  @Input()navigationIndex = 0;



  contents = [{
    text: 'HOME'
  }, {
    text: 'PRODUCTS'
  },  {
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
