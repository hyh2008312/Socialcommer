import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store-template-2',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store-template-2.scss']
})

export class MainPageComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {
    let routerArray = this.router.url.split('/');
    this.storeService.getStore(routerArray[2]).then((data) => {

      this.storeService.addStore(data);
    });
  }

  ngOnDestroy() {

  }

}
