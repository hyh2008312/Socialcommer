import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-4-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['../_store-template-4.scss']
})

export class AboutMeComponent implements OnInit {
  store: Store = new Store();
  aboutMeSrc = 'https://media.socialcommer.com/source/web/template/3/02-pic.jpg';
  aboutMeTag = '<p>Here you let your customers get to know you. Tell them a little bit about ' +
    'yourself and why you create this business. Show your customers that there are real people with ' +
    'interesting stories working behind the scenes.</p>';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    let self = this;
    let firstLoad = false;
    this.storeService.store.subscribe((data) => {
      if (data && !firstLoad) {
        firstLoad = true;
        self.store = data;
      }
    });
  }
}
