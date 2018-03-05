import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store } from '../../store';

@Component({
  selector: 'app-shop-template-2-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['../_store-template-2.scss']
})

export class AboutMeComponent implements OnInit {
  store: Store = new Store();
  aboutBanner:string = 'https://media.socialcommer.com/source/web/template/3/02-pic.jpg';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {

    let self = this;

    let firstLoad = false;
    this.storeService.store.subscribe((data) => {
      if(data && !firstLoad) {
        firstLoad = true;
        self.store = data;
      }
    });
  }
}
