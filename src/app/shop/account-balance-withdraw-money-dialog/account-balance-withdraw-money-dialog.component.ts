import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { UserService } from  '../../shared/services/user/user.service';

import { ShopService } from '../shop.service';

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
  disabled: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AccountBalanceWithdrawMoneyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private shopService: ShopService
  ) {
    this.balanceForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      amount: ['', [
        Validators.required,
        Validators.pattern(/^[-]?([1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|\.[0-9]{1,2})$/)
      ]]
    });

    this.balanceForm.patchValue({
      amount: this.data.availableBalance
    });

    this.checkoutIsEnoughWithDraw();

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

  checkoutIsEnoughWithDraw() {
    if(this.data.availableBalance >= 50) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  isWithDrawNumberLargeThenAvailable($event) {
    if($event > this.data.availableBalance) {
      this.balanceForm.patchValue({
        amount: this.data.availableBalance
      });
    } else if($event < 0) {
      this.balanceForm.patchValue({
        amount: 0
      });
    }
  }

  confirm(): void {
    if(this.balanceForm.invalid) {
      return;
    }
    this.status = 2;
  }

  back() {
    this.status = 1;
  }

  complete() {
    if(this.balanceForm.invalid) {
      return;
    }
    let params = this.balanceForm.value;
    let self = this;

    this.disabled = false;
    this.shopService.withDrawMoney(params).then((data) => {
      self.data.availableBalance = self.data.availableBalance - self.balanceForm.value.amount;
      self.data.totalWithdrawals = parseFloat(self.data.totalWithdrawals) + parseFloat(self.balanceForm.value.amount);
      self.data.isWithDraw = true;
      self.checkoutIsEnoughWithDraw();
      self.status = 3;
    });

  }
}
