import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, NavigationStart, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-store-front',
  templateUrl: './store-front.component.html',
  styleUrls: ['../shop.scss']
})

export class StoreFrontComponent implements OnInit {

  loading: boolean = false;
  selectedIndex: number = 0;
  sub: any

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.sub = this.router.events.subscribe((s) => {
      if(s instanceof NavigationStart) {
        this.loading = true;
      }
      if(s instanceof NavigationEnd) {
        this.loading = false;
      }
    });
  }

  ngOnInit():void {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  close() {
    this.loading = false;
  }
}
