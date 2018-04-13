import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-store-store-to-reward-dialog',
  templateUrl: './store-to-reward-dialog.component.html',
  styleUrls: ['./_store-to-reward-dialog.scss']
})

export class StoreToRewardDialogComponent implements OnInit {

  currency: string = 'USD';
  sub: any;

  stepOneBonus: boolean = false;
  stepTwoBonus: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<StoreToRewardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
    this.sub = this.userService.store.subscribe((data) => {
      if(data) {
        this.currency = data.currency.toUpperCase();
        this.stepOneBonus = data.firstShareBonus;
        this.stepTwoBonus = data.firstOrderBonus;
      }
    });
  }

  ngOnInit():void {

  }

  close():void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
    this.dialogRef.close();
  }

}
