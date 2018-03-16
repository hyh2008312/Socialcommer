import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from  '../../shared/services/user/user.service';


@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['../_account.scss']
})

export class AccountItemComponent implements OnInit {
  @Input() item: any = {};
  currency: string = "USD";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.userService.store.subscribe((data) => {
      if(data) {
        this.currency = data.currency.toUpperCase();
      }
    });
  }

  ngOnInit(): void {
  }
}
