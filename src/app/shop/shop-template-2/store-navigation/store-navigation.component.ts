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
  //是否为新手引导
  isGuide: boolean = false;

  constructor(private  router: Router) {
    let url = this.router.url;
    this.isGuide = url.indexOf('guide/preview') >= 0;
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
          text: 'Home',
          link: './',
          exact: true
        }, {
          text: 'Products',
          link: './list',
          exact: false
        }, {
          text: 'About Me',
          link: './about_me',
          exact: true
        }
        ];
        break;
      case 2:
        this.contents = [{
          text: 'Home',
          link: '../',
          exact: true
        }, {
          text: 'Products',
          link: './',
          exact: false
        }, {
          text: 'About Me',
          link: '../about_me',
          exact: true
        }
        ];
        break;
      case 4:
        this.contents = [{
          text: 'Home',
          link: '../',
          exact: true
        }, {
          text: 'Products',
          link: '../list',
          exact: false
        }, {
          text: 'About Me',
          link: './',
          exact: true
        }
        ];
        break;
      default:
        this.contents = [{
          text: 'Home',
          link: './',
          exact: true
        }, {
          text: 'Products',
          link: './list',
          exact: false
        }, {
          text: 'About Me',
          link: './about_me',
          exact: true
        }
        ];
    }
  }

  jumpCart(): void {
    if (this.isGuide) {
      this.router.navigate([`/shop/guide/preview/2/cart`]);
    } else {
      this.router.navigate([`/shop/templates/preview/2/cart`]);
    }

  }

  jumpOrder(): void {
    if (this.isGuide) {
      this.router.navigate([`/shop/guide/preview/2/order`]);
    } else {
      this.router.navigate([`/shop/templates/preview/2/order`]);
    }

  }


}
