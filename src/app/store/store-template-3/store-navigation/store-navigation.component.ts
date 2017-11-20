import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-store-template-3-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class StoreNavigationComponent implements OnInit {

  contents = [{
    text: 'HOME',
    link: './',
    exact: true
  }, {
    text: 'COLLECTION',
    link: './collection',
    exact: false
  }, {
    text: 'BLOG',
    link: './blog',
    exact: true
  }, {
    text: 'ABOUT ME',
    link: './about_me',
    exact: true
  }, {
    text: 'SUBSCRIBE',
    link: './subscribe',
    exact: true
  }];

  constructor(

  ) {

  }

  ngOnInit():void {

  }

  ngOnDestroy() {

  }

}
