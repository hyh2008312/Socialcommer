import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { StoreTemplateRouter } from '../../config/app.constant';
import { StoreService } from '../store.service';
import { Store } from '../store';

import { ConstantService } from '../../shared/services/constant/constant.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './store-main.component.html',
  styleUrls: ['../store.scss','../../shop/shop.scss']
})

export class StoreMainComponent implements OnInit {

  storeRouter: any;

  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private storeTemplateRouter: StoreTemplateRouter
  ) {
    this.storeRouter = this.storeTemplateRouter.router;
  }

  ngOnInit():void {
    let storeName = this.activatedRoute.snapshot.params['name'];
    let self = this;
    let routerArray = this.router.url.split(storeName);
    if(routerArray[1] && routerArray[1] != '') {
      let allRouter = routerArray[1].split('/');
      let uid = allRouter[1];

      let lastRouter = '';
      let replaceRouter = [];
      if(allRouter.length > 2) {
        lastRouter = routerArray[1].split('/' + uid + '/')[1];
        replaceRouter = lastRouter.split('/');
      }
      this.storeService.getStore(storeName).then((data) => {
        if (data) {
          this.storeService.addStore(data);
          if(uid != 'cart' && uid != 'order' && uid!='message' && uid != data.templateId) {
            if(replaceRouter.length > 0) {
              if(self.storeRouter[parseInt(uid)-1][replaceRouter[0]] != self.storeRouter[data.uid - 1][replaceRouter[0]]) {
                self.router.navigate([`/store/${storeName}/${data.templateId}`]);
              } else {
                self.router.navigate([`/store/${storeName}/${data.templateId}/${lastRouter}`]);
              }
            } else {
              self.router.navigate([`/store/${storeName}/${data.templateId}/${lastRouter}`]);
            }
          }
        }
      });
    } else {
      self.storeService.getStore(storeName).then((data) => {
        if (data) {
          self.storeService.addStore(data);
          if(data.templateId) {
            self.router.navigate([`/store/${storeName}/${data.templateId}`]);
          } else {
            self.router.navigate([`/store/${storeName}/1`]);
          }

        }
      });
    }

  }

}
