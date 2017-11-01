import { Component, OnInit } from '@angular/core';

import { ShopService } from '../shop.service';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['../shop.scss']
})

export class ShopComponent implements OnInit {

  avatar: any = false;
  storeName: any = false;

  constructor(
    private userService: UserService,
    private shopService: ShopService
  ) { }

  ngOnInit():void {
    let self = this;
    self.userService.currentUser.subscribe((data) => {
      if(data) {
        self.avatar = data.avatar;
        if(data.store && data.store.length> 0) {
          self.storeName = data.store[0].displayName;
        }
      }
    });


    self.shopService.getCategoryList().then((data) => {
      self.userService.addCategory(data);
    });
  }

}
