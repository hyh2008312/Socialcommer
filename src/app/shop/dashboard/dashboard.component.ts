import { Component, OnInit } from '@angular/core';

import { ShopService } from '../shop.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../shop.scss']
})

export class DashboardComponent implements OnInit {

  timeOverview: string = 'All Time';

  timeStatistic: string = 'All Time';

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
    code: 'All Time',
    value: 'All Time'
  }];

  constructor(

  ) { }

  ngOnInit():void {
  }
}
