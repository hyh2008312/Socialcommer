import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store-template-3-store-blog',
  templateUrl: './store-blog-card.component.html',
  styleUrls: ['./store-blog-card.scss']
})

export class StoreBlogCardComponent implements OnInit {
  @Input() blog:any = [];
  @Input() status: number = 0;

  constructor(

  ) {

  }

  ngOnInit():void {

  }


}
