import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store } from '../../store';

@Component({
  selector: 'app-store-template-3-store-blog',
  templateUrl: './store-blog.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class StoreBlogComponent implements OnInit {
  public blog:any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {

  }


}
