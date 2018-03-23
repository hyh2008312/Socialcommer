import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shop-dashboard-reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./_reward-item.scss']
})

export class RewardItemComponent implements OnInit {

  currency: string = 'USD';

  rewardList = [{
    image: 'https://media.socialcommer.com/image/other/d0b981c0-febf-4be1-95de-e71cfdeeb6b6.jpg',
    money: 10.99
  }, {
    image: 'https://media.socialcommer.com/image/other/02f4adb2-ac13-4f69-964c-3612129f5a8b.jpg',
    money: 10.99
  }, {
    image: 'https://media.socialcommer.com/image/other/df869cd7-a1cb-432f-9e5f-7ae3825e97cd.jpg',
    money: 12.99
  }];

  constructor(

  ) {

  }

  ngOnInit(): void {
  }

}
