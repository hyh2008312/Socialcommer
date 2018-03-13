import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-shop-template-2-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../_store-template-2.scss']
})

export class StoreNavigationComponent implements OnInit {
  @Input() isBlack = false;
  @Input() type: number;
  @Input() productNumber: number = 0;
  contents: any;

  constructor(private  router: Router) {

  }

  ngOnInit(): void {
    this.initDate();
  }

  ngOnDestroy() {

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

  jumpCart(): void {
    this.router.navigate([`/shop/templates/preview/2/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`/shop/templates/preview/2/order`]);
  }


}
