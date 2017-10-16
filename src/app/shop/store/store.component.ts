import { Component, OnInit } from '@angular/core';

import { ShopService } from '../shop.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['../shop.scss']
})

export class StoreComponent implements OnInit {

  currency: string;

  currencies = [{
    code: 'INR',
    value: 'INR'
  },{
    code: 'USD',
    value: 'USD'
  }];

  checked: boolean;

  constructor(

  ) { }

  ngOnInit():void {
  }

}
