import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../shop.scss']
})

export class SettingsComponent implements OnInit {

  country: string;

  countries = [{
    code: 'IN',
    value: 'INDIA'
  },{
    code: 'US',
    value: 'US'
  }];

  previewImgFile: Object;

  constructor(

  ) { }

  ngOnInit():void {
  }

}
