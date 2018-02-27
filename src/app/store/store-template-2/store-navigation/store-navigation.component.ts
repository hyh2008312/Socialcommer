import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-store-template-2-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../store-template-2.scss']
})

export class StoreNavigationComponent implements OnInit {
  @Input() isBlack = false;
  @Input() type: number;
  @Output() jumpOrder = new EventEmitter<boolean>();
  contents: any;

  constructor(public  router: Router,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initDate();
  }

  ngOnDestroy() {

  }

  jumpToOrderList(): void {
    this.jumpOrder.emit(true);
  }

  initDate() {
    switch (this.type) {
      case 1:
        this.contents = [{
          text: 'HOME',
          link: './',
          exact: true
        }, {
          text: 'PRODUCTS',
          link: './list',
          exact: false
        }, {
          text: 'ABOUT ME',
          link: './about_me',
          exact: true
        }
        ];
        break;
      case 2:
        this.contents = [{
          text: 'HOME',
          link: '../',
          exact: true
        }, {
          text: 'PRODUCTS',
          link: './',
          exact: false
        }, {
          text: 'ABOUT ME',
          link: '../about_me',
          exact: true
        }
        ];
        break;
      case 4:
        this.contents = [{
          text: 'HOME',
          link: '../',
          exact: true
        }, {
          text: 'PRODUCTS',
          link: '../list',
          exact: false
        }, {
          text: 'ABOUT ME',
          link: './',
          exact: true
        }
        ];
        break;
      default:
        this.contents = [{
          text: 'HOME',
          link: './',
          exact: true
        }, {
          text: 'PRODUCTS',
          link: './list',
          exact: false
        }, {
          text: 'ABOUT ME',
          link: './about_me',
          exact: true
        }
        ];
    }
  }

}
