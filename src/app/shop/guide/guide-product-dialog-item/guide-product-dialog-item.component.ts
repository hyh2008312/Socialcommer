import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { GuideService } from '../guide.service';
import { UserService } from '../../../shared/services/user/user.service';
import { MatDialog } from "@angular/material";


@Component({
  selector: 'app-shop-guide-product-dialog-item',
  templateUrl: './guide-product-dialog-item.component.html',
  styleUrls: ['../_guide.scss']
})

export class GuideProductDialogItemComponent implements OnInit {

  @Input() product: any = {};

  currency: string = 'USD';

  sub: any;

  constructor(
    private guideService: GuideService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.sub = this.userService.store.subscribe((data) => {
      if(data) {
        this.currency = data.currency.toUpperCase();
      }
    });
  }

  ngOnInit():void {

  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

}
