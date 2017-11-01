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

  constructor(
    private userService: UserService
  ) { }

  ngOnInit():void {
    let self = this;
    self.userService.currentUser.subscribe((data) => {
      console.log(data);
      if(data) {
        self.avatar = data.avatar;
      }
    });
  }

}
