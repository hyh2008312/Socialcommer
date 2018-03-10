import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-account-balance-withdraw-money-dialog',
  templateUrl: './account-balance-withdraw-money-dialog.component.html',
  styleUrls: ['../_account.scss']
})
export class AccountBalanceWithdrawMoneyDialogComponent implements OnInit {
  // 区分不同的布局界面 1：体现金额不足的提示  2.正常的体现界面  3.去添加银行卡
  status: number = 1;
  money: number;
  balanceForm: FormGroup;
  sub: any;
  currency: string = 'USD';

  constructor(
    public dialogRef: MatDialogRef<AccountBalanceWithdrawMoneyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.balanceForm = this.fb.group({
      paypalAccount: ['', [
        Validators.required,
        Validators.email
      ]]
    });

    this.sub = this.userService.store.subscribe((data) => {
      if(data) {
        this.currency = data.currency.toUpperCase();
      }
    });
  }

  ngOnInit(): void {

  }

  close(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.status = 2;
  }

  back() {
    this.status = 1;
  }
}
