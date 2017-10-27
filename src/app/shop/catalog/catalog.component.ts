import { Component, OnInit, Inject} from '@angular/core';

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

  productPublished: any;
  productDraft: any;
  productUnpublished: any;

  constructor(
    private shopService: ShopService,
    private userService: UserService
  ) {

  }

  ngOnInit():void {
    let self = this;
    let firstLoad = false;
    self.userService.store.subscribe((data) => {
      if(data) {
        self.storeId = data.id;
        self.storeCurrency = data.currency;
        if(!firstLoad) {
          this.changeProducts({index:0})
        }
      }
    });
  }

  openToggle() {
    this.showToggles = !this.showToggles;
  }

  changeProducts(event) {
    let relationStatus = 'published';
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
    self.shopService.getProduct({
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
        }
        break;
    }
  }

}
