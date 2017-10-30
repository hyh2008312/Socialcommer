import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Router,NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { ShopService } from '../shop.service';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['../shop.scss']
})

export class CatalogComponent implements OnInit {

  showToggles : boolean = false;
  storeId: number;
  storeCurrency: string = 'USD';

  productPublished: any = false;
  productDraft: any = false;
  productUnpublished: any = false;

  selectedIndex: number = 0;
  subscription: any;
  subscription1: any;

  constructor(
    private shopService: ShopService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit():void {
    let self = this;

    this.subscription = self.userService.store.subscribe((data) => {
      if(data) {
        self.storeId = data.id;
        self.storeCurrency = data.currency;
        self.subscription1 = self.activatedRoute.queryParams.subscribe((data)=> {
          if(data.tab == 'published' ) {
            self.selectedIndex = 0;
          }
          if(data.tab == 'draft') {
            self.selectedIndex = 1;
          }
          if(data.tab == 'unpublished') {
            self.selectedIndex = 2;
          }
          if(data.tab == null) {
            self.changeProducts({index: self.selectedIndex});
          }
        });
      }
    });

    this.router.events.subscribe(s => {
      if (s instanceof NavigationStart) {
        if(s.url.split('?')[0] == '/shop/listings') {
          self.subscription = self.userService.store.subscribe((data) => {
            if(data) {
              self.storeId = data.id;
              self.storeCurrency = data.currency;
              self.subscription1 = self.activatedRoute.queryParams.subscribe((data)=> {
                if(data.tab == 'published') {
                  self.selectedIndex = 0;
                }
                if(data.tab == 'draft') {
                  self.selectedIndex = 1;
                }
                if(data.tab == 'unpublished') {
                  self.selectedIndex = 1;
                }
                if(data.tab == null) {
                  self.changeProducts({index: self.selectedIndex});
                }
              });
            }
          });
        } else {
          self.subscription.unsubscribe();
          self.subscription1.unsubscribe();
        }
      }
    });

    self.shopService.currentListingTab.subscribe((data) => {
      self.selectedIndex = data;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }

  openToggle() {
    this.showToggles = !this.showToggles;
  }

  changeProducts(event) {
    let relationStatus = 'published';
    this.shopService.setCurrentListingTab(event.index);
    switch (event.index) {
      case 1:
        relationStatus = 'draft';
            break;
      case 2:
        relationStatus = 'unpublished';
            break;
      default:
            break;
    }

    let self = this;
    self.shopService.getProductList({
      storeId: this.storeId,
      relationStatus: relationStatus,
      page: 1,
      pageSize: 12
    }).then((data) => {

      switch (event.index) {
        case 1:
          self.productDraft = data.results;
          break;
        case 2:
          self.productUnpublished = data.results;
          break;
        default:
          self.productPublished = data.results;
          break;
      }

    });
  }

  productChange(event) {
    switch(event.status) {
      case 0:
        switch(event.event) {
          case 'delete':
            this.productPublished.splice(event.index,1);
            break;
          case 'unpublish':
            this.productPublished.splice(event.index,1);
            break;
        }
        break;
      case 2:
        switch(event.event) {
          case 'delete':
            this.productUnpublished.splice(event.index,1);
            break;
          case 'publish':
            this.productUnpublished.splice(event.index,1);
            break;
        }
        break;
    }
  }

}
