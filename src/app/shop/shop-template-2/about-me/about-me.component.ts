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
  productNumber:number=0;
  //是否为新手引导
  isGuide: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {
    let url = this.router.url;
    this.isGuide = url.indexOf('guide/preview') >= 0;
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
  jumpCart(): void {
    if(this.isGuide){
      this.router.navigate([`/shop/guide/preview/2/cart`]);
    }else {
      this.router.navigate([`/shop/templates/preview/2/cart`]);
    }

  }
}
