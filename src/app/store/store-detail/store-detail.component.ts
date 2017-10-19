import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['../store.scss']
})

export class StoreDetailComponent implements OnInit {

  public shareLink: string;
  public text = 'Here you let your customers get to know you. Tell them a little bit about yourself and why you create this business.'
    + 'Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills or training'
    + 'that make you an expert in your field? Show your customers that there are read people with instersting stories working'
    + 'behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust you brad.';

  constructor(
    public router: Router
  ) { }

  ngOnInit():void {
    this.shareLink = window.location.href;
  }

  close():void {
    this.router.navigate(['./store']);
  }

}
