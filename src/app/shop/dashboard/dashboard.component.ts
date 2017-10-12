import { Component, OnInit } from '@angular/core';

import { ShopService } from '../shop.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../shop.scss']
})

export class DashboardComponent implements OnInit {

  timeOverview: string = 'All time';

  timeStatistic: string = 'All time';

  times = [{
    code: 'Yesterday',
    value: 'Yesterday'
  }, {
    code: 'Last 7 days',
    value: 'Last 7 days'
  }, {
    code: 'Last 30 days',
    value: 'Last 30 days'
  }, {
    code: 'All time',
    value: 'All time'
  }];

  constructor(

  ) { }

  ngOnInit():void {
  }
}
