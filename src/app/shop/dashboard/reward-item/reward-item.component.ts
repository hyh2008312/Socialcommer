import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shop-dashboard-reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./_reward-item.scss']
})

export class RewardItemComponent implements OnInit {

  currency: string = 'USD';

  rewardList = [{
    image: 'https://media.socialcommer.com/source/web/pic/1.jpg',
    money: 10.99
  }, {
    image: 'https://media.socialcommer.com/source/web/pic/2.jpg',
    money: 10.99
  }, {
    image: 'https://media.socialcommer.com/source/web/pic/3.jpg',
    money: 12.99
  }];

  constructor(

  ) {

  }

  ngOnInit(): void {
  }

}
