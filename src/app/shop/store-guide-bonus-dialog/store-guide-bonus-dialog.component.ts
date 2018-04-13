import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UserService } from '../../shared/services/user/user.service';
import {ShopService} from '../shop.service';

@Component({
  selector: 'app-store-guide-bonus-dialog',
  templateUrl: './store-guide-bonus-dialog.component.html',
  styleUrls: ['./_store-guide-bonus-dialog.scss']
})

export class StoreGuideBonusDialogComponent implements OnInit {

  currency: string = 'USD';
  sub: any;

  constructor(
    public dialogRef: MatDialogRef<StoreGuideBonusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private shopServie: ShopService
  ) {
    this.data.shareLink = this.data.shareLink + '?source=share';
    this.sub = this.userService.store.subscribe((data) => {
      if(data) {
        this.currency = data.currency.toUpperCase();
      }
    });
    this.guideSuccess();
  }

  ngOnInit():void {

  }

  close():void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
    this.dialogRef.close();
  }

  guideSuccess() {
    let self = this;
    self.shopServie.changeGuideStep({
      step: 'finished'
    }).then((data) => {
      self.userService.addStore(data);
    });
  }

}
