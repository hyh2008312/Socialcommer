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
  productPublishedIndex = 1;
  productDraft: any = false;
  productDraftIndex = 1;
  productUnpublished: any = false;
  productUnpublishedIndex = 1;

  selectedIndex: number = 0;
  subscription: any;
  subscription1: any;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 12;
  pageSizeOptions = [6, 12];

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
            self.changeProducts({index: self.selectedIndex});
          }
          if(data.tab == 'draft') {
            self.selectedIndex = 1;
            self.changeProducts({index: self.selectedIndex});
          }
          if(data.tab == 'unpublished') {
            self.selectedIndex = 2;
            self.changeProducts({index: self.selectedIndex});
          }
          if(data.tab == null) {
            self.changeProducts({index: self.selectedIndex});
          }
        });
      }
    });

    this.router.events.subscribe(s => {
      if (s instanceof NavigationStart) {
        if(s.url.split('?')[0] == '/shop/listings/products') {
          self.subscription = self.userService.store.subscribe((data) => {
            if(data) {
              self.storeId = data.id;
              self.storeCurrency = data.currency;
              self.subscription1 = self.activatedRoute.queryParams.subscribe((data)=> {
                if(data.tab == 'published') {
                  self.selectedIndex = 0;
                  self.changeProducts({index: self.selectedIndex});
                }
                if(data.tab == 'draft') {
                  self.selectedIndex = 1;
                  self.changeProducts({index: self.selectedIndex});
                }
                if(data.tab == 'unpublished') {
                  self.selectedIndex = 2;
                  self.changeProducts({index: self.selectedIndex});
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

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    switch (type) {
      case 0:
        this.productPublishedIndex = event.pageIndex + 1;
          break;
      case 1:
        this.productDraftIndex = event.pageIndex + 1;
          break;
      case 2:
        this.productUnpublishedIndex = event.pageIndex + 1;
          break;
    }
    this.changeProducts({index: type});
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  openToggle() {
    this.showToggles = !this.showToggles;
  }
  closeToggle() {
    this.showToggles = false;
  }

  changeProducts(event) {
    let relationStatus = 'published';
    this.shopService.setCurrentListingTab(event.index);
    let page = this.productPublishedIndex;
    switch (event.index) {
      case 1:
        relationStatus = 'draft';
        page = this.productDraftIndex;
          break;
      case 2:
        relationStatus = 'unpublished';
        page = this.productUnpublishedIndex;
          break;
      default:
        break;
    }

    let self = this;
    self.shopService.getProductList({
      storeId: this.storeId,
      relationStatus: relationStatus,
      page: page,
      page_size: this.pageSize
    }).then((data) => {
      self.length = data.count;
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
      case 1:
        switch(event.event) {
          case 'delete':
            this.productDraft.splice(event.index,1);
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
