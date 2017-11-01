import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['../store.scss']
})

export class StoreListComponent implements OnInit {

  public categories = ['All','Electronics','Home','Kitchen'];
  public category = 'All';
  public shareLink: string;
  public text = '';

  constructor(
    private router: Router
  ) {

  }

  ngOnInit():void {
    this.shareLink = window.location.href;
  }

}
