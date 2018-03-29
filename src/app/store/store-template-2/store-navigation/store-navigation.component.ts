import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-store-template-2-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../_store-template-2.scss']
})

export class StoreNavigationComponent implements OnInit {
  @Input() isBlack = false;
  @Input() type: number;
  @Input() productNumber: number = 0;
  @Input() displayName: string;
  contents: any;

  constructor(public  router: Router,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initDate();
  }

  ngOnDestroy() {

  }

  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
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
      case 5:
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
          link: '../about_me',
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

}
