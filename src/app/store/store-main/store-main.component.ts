import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { StoreService } from '../store.service';
import { Store } from '../store';

import { ConstantService } from '../../shared/services/constant/constant.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './store-main.component.html',
  styleUrls: ['../store.scss','../../shop/shop.scss']
})

export class StoreMainComponent implements OnInit {

  type: number = 1;

  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private constantService: ConstantService
  ) {

  }

  ngOnInit():void {
    let storeName = this.activatedRoute.snapshot.params['name'];
    let self = this;
    let routerArray = this.router.url.split(storeName);
    if(routerArray[1] != '') {
      let allRouter = routerArray[1].split('/');
      let uid = allRouter[1];
      let lastRouter = '';
      if(allRouter.length > 2) {
        lastRouter = routerArray[1].split('/' + uid)[1];
      }
      this.storeService.getStore(storeName).then((data) => {
        if (data) {
          this.storeService.addStore(data);
          if (data.templateId == 1) {
            if(uid != data.templateId) {
              self.router.navigate([`/store/${storeName}/${data.templateId}${lastRouter}`]);
            }
            return;
          }
          if(data.uid > 1) {
            if(uid != data.uid) {
              self.router.navigate([`/store/${storeName}/${data.uid}${lastRouter}`]);
            }
          }
        }
      });
    } else {
      this.storeService.getStore(storeName).then((data) => {
        if (data) {
          this.storeService.addStore(data);
          if (data.templateId == 1) {
            self.router.navigate([`/store/${storeName}/${data.templateId}`]);
            return;
          }
          if (data.uid > 1) {
            self.router.navigate([`/store/${storeName}/${data.uid}`]);
          }
        }
      });
    }

  }

}
