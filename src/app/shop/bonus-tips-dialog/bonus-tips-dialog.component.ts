import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-shop-bonus-tips-dialog',
  templateUrl: './bonus-tips-dialog.component.html',
  styleUrls: ['./_bonus-tips-dialog.scss']
})

export class BonusTipsDialogComponent implements OnInit {

  storeCurrency: string = 'USD';
  sub:any;

  constructor(
    public dialogRef: MatDialogRef<BonusTipsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
    this.sub = this.userService.store.subscribe((data) => {
      if(data) {
        this.storeCurrency = data.currency.toUpperCase();
      }
    });
  }

  ngOnInit():void {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  close():void {
    this.dialogRef.close();
  }


}
