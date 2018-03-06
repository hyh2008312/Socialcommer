import { Input, Output, Component, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-statistic-item',
  templateUrl: './statistic-item.component.html',
  styleUrls: ['../shop.scss']
})

export class StatisticItemComponent implements OnInit {

  @Input() index: any = 0;
  @Input() data: any = null;
  currency: string = 'USD';

  sub: any;

  constructor(
    private userService: UserService
  ) {
    this.sub = this.userService.store.subscribe((data) => {
      if(data) {
        this.currency = data.currency.toUpperCase();
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
