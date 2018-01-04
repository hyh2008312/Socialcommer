import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../store.service';
import {UserService} from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-shop-template-4',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store-template-4.scss']
})

export class MainPageComponent implements OnInit {
  storeName: string = '';
  text: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private userService: UserService
  ) {

  }

  ngOnInit():void {
    let self = this;
    self.userService.store.subscribe((data) => {
      if( data ) {
        self.storeName =data.name;
        self.storeService.getStore( data.displayName).then((data) => {
          self.text = data.description;
          self.storeName = data.context && data.context.nameTag != ''? data.context.nameTag: data.name;
          self.storeService.addStore(data);
        });
      }
    });
  }

  ngOnDestroy() {

  }

}
