import { Component, OnInit } from '@angular/core';

import { UserService } from  '../../shared/services/user/user.service';
import { User } from  '../../shared/services/user/user';

@Component({
  selector: 'app-store-template',
  templateUrl: './store-template.component.html',
  styleUrls: ['../../store/store.scss','../shop.scss']
})

export class StoreTemplateComponent implements OnInit {

  public categories:any = [{
    id: 0,
    name: 'All'
  }, {
    id: 0,
    name: 'Electronics'
  }, {
    id: 0,
    name: 'Home'
  }, {
    id: 0,
    name: 'Kitchen'
  }];
  public category: any = {
    id: 0,
    name : 'All'
  };
  public shareLink: string;
  public text = '';
  user: User = new User();

  constructor(
    private userService: UserService
  ) {
    let self = this;
    self.userService.currentUser.subscribe((data) => {
      if(data) {
        self.user = data;
      }
    });
  }

  ngOnInit():void { }

}
