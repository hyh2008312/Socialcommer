import {Input, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {ShopService} from '../shop.service';

@Component({
  selector: 'app-left-side-navigation',
  templateUrl: './left-side-navigation.component.html',
  styleUrls: ['../shop.scss']
})

export class LeftSideNavigationComponent implements OnInit {

  contents = [{
    id: 0,
    icon: 'icon-pic-dashboard',
    text: 'Dashboard',
    subContent: [{
      text: '',
      router: ''
    }],
    router: './dashboard',
    isActive: false
  }, {
    id: 1,
    icon: 'icon-pic-product',
    text: 'Listings',
    subContent: [{
      text: 'Add Items',
      router: './listings/items'
    }, {
      text: 'Catalog',
      router: './listings/products'
    }, {
      text: 'Categories',
      router: './listings/categories'
    }],
    router: null,
    slide: true,
    isActive: false,
    index: 0
  }, {
    id: 2,
    icon: 'icon-pic-store',
    text: 'Store',
    subContent: [{
      text: 'Edit Store',
      router: null
    }, {
      text: 'Settings',
      router: './store/settings'
    }],
    router: null,
    slide: true,
    isActive: false,
    index: 1
  }, {
    id: 3,
    icon: 'icon-pic-blog',
    text: 'Blogs',
    subContent: [{
      text: '',
      router: ''
    }],
    router: './blog',
    isActive: false
  }, {
    id: 4,
    icon: 'icon-pic-earning',
    text: 'Payment',
    subContent: [{
      text: 'Balance',
      router: './account/balance'
    }],
    router: null,
    slide: true,
    isActive: false,
    index: 0
  }, {
    id: 5,
    icon: 'icon-pic-report',
    text: 'Reports',
    subContent: [{
      text: '',
      router: ''
    }],
    router:  './report',
    isActive: false
  }];

  editRouter: string = './store/templates/edit';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private shopService: ShopService) {
  }

  ngOnInit(): void {
    let self = this;
    this.shopService.templateUid.subscribe((data) => {
      if (data) {
        self.editRouter = './templates/edit' + (data == 1 ? '' : '/' + data);
      }
    });
    let url = this.router.routerState.snapshot['url'].split('/shop');
    for (let value of this.contents) {
      if (!value.router) {
        for (let item of value.subContent) {
          if (url[1] && item.router && item.router != '' && item.router.split('.')[1] == url[1]) {
            value.isActive = true;
            break;
          }
        }
      } else {
        if (url[1] && value.router && value.router != '' && value.router.split('.')[1] == url[1]) {
          value.isActive = true;
          break;
        }
      }
    }
  }

  changeSlide(obj: any, index: number) {

    for (let value of this.contents) {
      if (value.id != obj.id) {
        value.isActive = false;
      }
    }
    if (obj.slide) {
      obj.isActive = !obj.isActive;
    } else {
      obj.isActive = true;
    }
    if (obj.router) {
      this.router.navigate([`${obj.router}`], {relativeTo: this.activatedRoute});
    }
  }

}
