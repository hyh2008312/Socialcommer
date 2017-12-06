import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { StoreTemplateRouter } from '../../config/app.constant';
import { StoreService } from '../store.service';
import { Store } from '../store';

@Component({
  selector: 'app-main-page',
  templateUrl: './store-main.component.html',
  styleUrls: ['../store.scss','../../shop/shop.scss']
})

export class StoreMainComponent implements OnInit {

  storeRouter: any;
  store: any;

  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private storeTemplateRouter: StoreTemplateRouter
  ) {
    this.storeRouter = this.storeTemplateRouter.router;

    this.store = this.activatedRoute.snapshot.data['data'];


  }

  ngOnInit():void {
    let storeName = this.activatedRoute.snapshot.params['name'];
    let self = this;
    let routerArray = this.router.url.split(storeName);
    this.storeService.addStore(this.store);
    if(routerArray[1] != '') {
      let allRouter = routerArray[1].split('/');
      let uid = allRouter[1];
      let lastRouter = '';
      let replaceRouter = [];
      if(allRouter.length > 2) {
        lastRouter = routerArray[1].split('/' + uid + '/')[1];
        replaceRouter = lastRouter.split('/');
      }
      if (this.store.templateId == 1) {
        if(uid != this.store.templateId) {
          if(replaceRouter.length > 0) {
            if(self.storeRouter[parseInt(uid)-1][replaceRouter[0]] != self.storeRouter[1][replaceRouter[0]]) {
              self.router.navigate([`/store/${storeName}/${this.store.templateId}`]);
            } else {

              self.router.navigate([`/store/${storeName}/${this.store.templateId}/${lastRouter}`]);
            }
          } else {
            self.router.navigate([`/store/${storeName}/${this.store.templateId}/${lastRouter}`]);
          }
        }
      } else {
        if(this.store.uid > 1) {
          if(uid != this.store.uid) {
            if(replaceRouter.length > 0) {
              if(self.storeRouter[parseInt(uid)-1][replaceRouter[0]] != self.storeRouter[this.store.uid - 1][replaceRouter[0]]) {
                self.router.navigate([`/store/${storeName}/${this.store.uid}`]);
              } else {
                self.router.navigate([`/store/${storeName}/${this.store.uid}${lastRouter}`]);
              }
            } else {
              self.router.navigate([`/store/${storeName}/${this.store.uid}${lastRouter}`]);
            }
          }
        }
      }
    } else {
      if (this.store.templateId == 1) {
        self.router.navigate([`/store/${storeName}/${this.store.templateId}`]);
      } else {
        if (this.store.uid > 1) {
          self.router.navigate([`/store/${storeName}/${this.store.uid}`]);
        }
      }

    }

  }

}
