import {Component, OnInit, OnDestroy, Input} from '@angular/core';

@Component({
  selector: 'app-shop-template-2-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../store-template-2.scss']
})

export class StoreNavigationComponent implements OnInit {
  @Input() isBlack = false;
  @Input() type: number;
  contents: any;

  constructor() {

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
          link: './products',
          exact: false
        } ,{
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
          link: '../products',
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
          link: './products',
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
