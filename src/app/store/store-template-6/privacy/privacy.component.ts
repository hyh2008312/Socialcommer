import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-6-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['../_store-template-6.scss']
})

export class PrivacyComponent implements OnInit {
  public shareLink: string;
  public text = '';
  store: Store = new Store();
  contextList: any = {};
  imageList: any = {};

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

    let self = this;

    this.storeService.store.subscribe((data) => {
      if (data) {
        self.store = data;
        self.contextList = data.context ? data.context : {};
        self.imageList = data.images ? data.images : {};
        self.text = data.description;
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
      }
    });
  }
}
