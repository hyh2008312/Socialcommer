import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store } from '../../store';

@Component({
  selector: 'app-store-template-2-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['../store-template-2.scss']
})

export class AboutMeComponent implements OnInit {
  store: Store = new Store();
  contextList: any = {};
  imageList: any = {};
  ownerId: any;
  text:string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {
    let self = this;
    this.storeService.store.subscribe((data) => {
      if(data) {
        self.store = data;
        self.contextList = data.context?data.context: {};
        self.imageList = data.images? data.images: {};
        self.text = data.description;
      }
    });
  }
  jumpOrderList(): void {
    this.router.navigate([`./store/${this.store.displayName}/order`]);
  }
}
