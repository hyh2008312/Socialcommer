import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../store.service';
import {UserService} from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-shop-template-2',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store-template-2.scss']
})

export class MainPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private userService: UserService
  ) {

  }

  ngOnInit():void {

    let storeName = this.activatedRoute.snapshot.params['name'];
    let self = this;
    this.storeService.getStore(storeName).then((data) => {

      this.storeService.addStore(data);
    });
  }

  ngOnDestroy() {

  }

}
