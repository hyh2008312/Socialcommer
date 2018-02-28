import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-shop-bonus-item',
  templateUrl: './bonus-item.component.html',
  styleUrls: ['./_bonus-item.scss']
})

export class BonusItemComponent implements OnInit {

  @Input() monthSale: any = 300;

  bonusList: any[] = [{
    bonus: 50,
    sales: 500
  }, {
    bonus: 150,
    sales: 1000
  }, {
    bonus: 350,
    sales: 2000
  }, {
    bonus: 600,
    sales: 3000
  }, {
    bonus: 1000,
    sales: 4000
  }];

  currency: string = 'USD';

  constructor(private userService: UserService) {
    this.userService.store.subscribe((data) => {
      if(data) {
        this.currency = data.currency.toUpperCase();
      }
    });
  }

  ngOnInit(): void {
  }
}
