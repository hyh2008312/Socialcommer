import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store-template-3',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class MainPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {
    let storeName = this.activatedRoute.snapshot.params['name'];
    let self = this;
    this.storeService.getStore(storeName).then((data) => {

      this.storeService.addStore(data);
    });
  }

  ngOnDestroy() {

  }

}
