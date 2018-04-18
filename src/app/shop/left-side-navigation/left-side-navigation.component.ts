import {Input, Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, NavigationStart, NavigationEnd} from '@angular/router';
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
    text: 'Products',
    subContent: [{
      text: 'Add Product',
      router: './listings/items'
    }, {
      text: 'My Listings',
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
    text: 'Storefront',
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
    icon: 'icon-pic-list1',
    text: 'Orders',
    subContent: [{
      text: '',
      router: ''
    }],
    router:  './orders',
    isActive: false
  }, {
    id: 5,
    icon: 'icon-pic-earning',
    text: 'Payment',
    subContent: [{
      text: '',
      router: ''
    }],
    router: './account',
    isActive: false
  }, {
    id: 6,
    icon: 'icon-pic-report',
    text: 'Reports',
    subContent: [{
      text: '',
      router: ''
    }],
    router:  './report',
    isActive: false
  }, {
    id: 7,
    icon: 'icon-pic-template',
    text: 'Templates',
    subContent: [{
      text: '',
      router: ''
    }],
    router:  './templates',
    isActive: false
  }];

  showLoading: boolean = false;
  loadingValue: any = 0;

  editRouter: string = '/shop/templates/edit';

  sub: any;
  sub1: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private shopService: ShopService) {
  }

  ngOnInit(): void {
    let self = this;
    this.sub = this.shopService.templateUid.subscribe((data) => {
      if (data) {
        self.editRouter = '/shop/templates/edit/' + data;
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

    this.sub1 = this.router.events.subscribe((s) => {
      if(s instanceof NavigationStart) {
        this.showLoading = true;
        this.loadingValue = 0;
        this.load();
      }
      if(s instanceof NavigationEnd) {
        this.showLoading = false;
        this.loadingValue = 0;
      }
    });
  }

  changeSlide(obj: any, index: number) {
    this.showLoading = false;
    this.loadingValue = 0;
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

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }

  private load() {
    if(this.loadingValue < 90) {
      this.loadingValue++;
    } else {
      return;
    }

    requestAnimationFrame(() => this.load());

  }
}
