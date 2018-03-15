import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-4-about',
  templateUrl: './about.component.html',
  styleUrls: ['../_store-template-4.scss']
})

export class AboutComponent implements OnInit {
  store: Store = new Store();
  contextList: any = {};
  imageList: any = {};
  ownerId: any;
  text: string;
  ownerFirstName: string;
  ownerLastName: string;
  //退换货的天数
  returnDays: string = '30';

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
        let countryCode = data.country.code;
        if (countryCode == 'US') {
          self.returnDays = '30';
        } else if (countryCode == 'IN') {
          self.returnDays = '10';
        }
      }
    });
  }
}
