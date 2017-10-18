import { Component, OnInit, Inject} from '@angular/core';

import { ShopService } from '../shop.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['../shop.scss']
})

export class CatalogComponent implements OnInit {

  showToggles : boolean = false;

  constructor( ) { }

  ngOnInit():void {
  }

  openToggle() {
    this.showToggles = !this.showToggles;
  }

}
