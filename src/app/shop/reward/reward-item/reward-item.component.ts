import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shop-reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./_reward-item.scss']
})

export class RewardItemComponent implements OnInit {

  currency: string = 'USD';

  rewardList = [{
    image: 'https://media.socialcommer.com/source/web/pic/1.jpg',
    title: 'Earphones with Microphone and Volume Control Stereo In ear Headphones Earbuds for iPhone iPod iPad Samsung and More Android Smartphones,3.9 Ft/Black',
    money: 10.99
  }, {
    image: 'https://media.socialcommer.com/source/web/pic/2.jpg',
    title: 'BS-MALL(TM) Premium 14 Pcs Synthetic Foundation Powder Concealers Eye Shadows Silver Black Makeup Brush Sets(Rose Golden)',
    money: 10.99
  }, {
    image: 'https://media.socialcommer.com/source/web/pic/3.jpg',
    title: 'NatureHike 15L Waterproof Dry Bag Pouch Camping Boating Kayaking Rafting Canoeing Red Blue Green Orange NH15S002-D',
    money: 12.99
  }];

  constructor(

  ) {

  }

  ngOnInit(): void {
  }

}
