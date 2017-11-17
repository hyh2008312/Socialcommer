import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit():void {}

}
