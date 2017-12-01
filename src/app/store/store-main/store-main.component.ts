import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { StoreService } from '../store.service';
import { Store } from '../store';

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
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {
    let storeName = this.activatedRoute.snapshot.params['name'];
    let self = this;
    this.storeService.getStore(storeName).then((data) => {
      if(data) {
        this.storeService.addStore(data);
        if(data.templateId == 1) {
          self.router.navigate([`/store/${storeName}/${data.templateId}`]);
          return;
        }
        if(data.uid > 1) {
          self.router.navigate([`/store/${storeName}/${data.uid}`]);
        }
      }
    });

  }

}
