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

  constructor(
    private shopService: ShopService,
    private userService: UserService
  ) {

  }

  ngOnInit():void {
    let self = this;
    self.userService.store.subscribe((data) => {
      if(data) {
        self.storeId = data.id;
        self.storeCurrency = data.currency;
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

    this.shopService.getProduct({
      storeId: this.storeId,
      relationStatus: relationStatus
    }).then((data) => {
      console.log(data)
    });
  }

}
