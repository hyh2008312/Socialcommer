import {Input, Component, OnInit, OnDestroy} from '@angular/core';

import { UserService } from  '../../../shared/services/user/user.service';

@Component({
  selector: 'app-shop-orders-item',
  templateUrl: './orders-item.component.html',
  styleUrls: ['../_orders.scss']
})

export class OrdersItemComponent implements OnInit, OnDestroy {

  @Input() status: number = 0;
  @Input() product: any;
  @Input() index: number = 0;
  @Input() page: number = 1;
  @Input() pageSize: number = 1;

  currency: string = 'USD';
  sub: any;

  constructor(
    private userService: UserService
  ) {
    let self = this;
    self.sub = self.userService.store.subscribe((data) => {
      if(data) {
        self.currency = data.currency.toUpperCase();
      }
    });
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
  }
}