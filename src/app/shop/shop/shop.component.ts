import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShopService } from '../shop.service';
import { UserService } from  '../../shared/services/user/user.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['../shop.scss']
})

export class ShopComponent implements OnInit {

  avatar: any = false;
  storeName: any = false;
  isPopOpen: boolean = false;

  constructor(
    private userService: UserService,
    private shopService: ShopService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    let self = this;
    self.userService.currentUser.subscribe((data) => {
      if(data) {
        self.avatar = data.avatar;
        if(data.store && data.store.length> 0) {
          self.storeName = data.store[0].displayName;

          let templateId = data.store[0].templateId;

          //self.shopService.getMultiTemplate({
          //  storeId: data.store[0].id
          //}).then((data) => {
          //  self.shopService.setTemplateList(data);
          //
          //  let index = data.find((item) => {
          //    if(templateId == item.id) {
          //      self.shopService.setTemplateUId(item.uid);
          //      return true;
          //    }
          //  });
          //
          //  if(index < 0) {
          //    self.shopService.setTemplateUId(1);
          //  }
          //});
        }
      }
    });
  }

  ngOnInit():void {
    let self = this;

    self.shopService.getCategoryList().then((data) => {
      self.userService.addUserCategory(data);
    });

    self.shopService.getSupplyCategory().then((data) => {
      self.userService.addPubCategory(data);
    });

  }

  openPop() {
    this.isPopOpen = !this.isPopOpen;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/account/login']);
  }

}
