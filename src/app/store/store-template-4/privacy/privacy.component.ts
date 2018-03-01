import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-4-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['../store-template-4.scss']
})

export class PrivacyComponent implements OnInit {
  store: Store = new Store();
  contextList: any = {};
  imageList: any = {};
  ownerId: any;
  text: string;
  ownerFirstName: string;
  ownerLastName: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    let self = this;
    this.storeService.store.subscribe((data) => {
      if (data) {
        self.store = data;
        self.contextList = data.context ? data.context : {};
        self.imageList = data.images ? data.images : {};
        self.text = data.description;
        self.ownerFirstName = data.ownerFirstName;
        self.ownerLastName = data.ownerLastName;
      }
    });
  }
}
