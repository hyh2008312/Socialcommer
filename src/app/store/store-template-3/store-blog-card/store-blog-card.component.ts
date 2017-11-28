import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store-template-3-store-blog-card',
  templateUrl: './store-blog-card.component.html',
  styleUrls: ['./store-blog-card.scss']
})

export class StoreBlogCardComponent implements OnInit {
  @Input() blog:any = [];
  @Input() status: number = 0;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit():void {

  }

  jumpLink() {
    let link = '';
    switch (this.status) {
      case 0:
        link = `/blog/${this.blog.id}`;
        break;
      case 1:
        link = `/${this.blog.id}`;
        break;
    }

    this.router.navigate([this.router.url + link]);
  }


}
