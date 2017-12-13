import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store-cart-main',
  templateUrl: './store-cart-main.component.html',
  styleUrls: ['../store-cart.scss']
})

export class StoreCartMainComponent implements OnInit{

  homeLink:string = '';

  isTotalDialogOpen: boolean = false;

  constructor(
    private storeService: StoreService
  ) {

  }

  ngOnInit() {
    let self = this;

    self.storeService.store.subscribe((data) => {
      if(data) {
        let uid = data.templateId == 1? data.templateId:data.uid;
        self.homeLink = `/store/${data.displayName}/${uid}`;
      }
    });
  }

  openDialog() {
    this.isTotalDialogOpen = !this.isTotalDialogOpen;
  }

}
