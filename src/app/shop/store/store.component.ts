import { Component, OnInit } from '@angular/core';

import { ShopService } from '../shop.service';
import { ConstantService } from  '../../shared/services/constant/constant.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['../shop.scss']
})

export class StoreComponent implements OnInit {

  currency: string;

  public currencies: Object[];

  checked: boolean;

  constructor(
    private constantService : ConstantService
  ) {
    this.currencies = this.constantService.getCurrencies();
  }

  ngOnInit():void {
  }

}
