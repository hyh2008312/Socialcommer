import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../store.service';

import { Store } from '../store';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store.scss']
})

export class MainPageComponent implements OnInit {

  public categories:any = [];
  public category: any = {
    id: null,
    name : ''
  };
  public shareLink: string;
  public text = 'Here you let your customers get to know you. Tell them a little bit about yourself and why you create this business.'
  + 'Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills or training'
  + 'that make you an expert in your field? Show your customers that there are read people with instersting stories working'
  + 'behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust you brad.';

  store: Store = new Store();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {
    let storeName = this.activatedRoute.snapshot.params['name'];
    let self = this;
    this.storeService.getStore(storeName).then((data) => {
      self.store = data;
      self.categories = [...data.category];
      self.category = self.categories[0];
    });
  }

  ngOnInit():void {
    this.shareLink = window.location.href;
  }

  jumpList():void {
    let storeName = this.activatedRoute.snapshot.params['name'];
    this.router.navigate([`store/${storeName}/list`]);
  }

}
