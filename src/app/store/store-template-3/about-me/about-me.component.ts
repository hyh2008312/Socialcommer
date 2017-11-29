import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store } from '../../store';

@Component({
  selector: 'app-store-template-3-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class AboutMeComponent implements OnInit {
  store: Store = new Store();
  public shareLink: string;
  public text = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {
    this.shareLink = window.location.href;
    let self = this;

    let firstLoad = false;
    this.storeService.store.subscribe((data) => {
      if(data && !firstLoad) {
        firstLoad = true;
        self.store = data;
        self.text = data.description;
      }
    });
  }
}
