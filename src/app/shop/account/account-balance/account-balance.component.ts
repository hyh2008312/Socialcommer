import {Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {MatDialog} from "@angular/material";
import { UserService } from  '../../../shared/services/user/user.service';

import { AccountService } from "../account.service";

import {AccountBalanceWithdrawMoneyDialogComponent} from "../account-balance-withdraw-money-dialog/account-balance-withdraw-money-dialog.component";

@Component({
  selector: 'app-account-balance-main',
  templateUrl: './account-balance.component.html',
  styleUrls: ['../_account.scss']
})

export class AccountBalanceComponent implements OnInit {

  summary: any = {};

  paymentList: any;
  paymentListIndex = 1;

  // MatPaginator Inputs
  length: number = 0;
  pageSize = 12;
  pageSizeOptions = [6, 12];
  isShowTip: boolean = false;
  currency: string = 'USD';

  sub: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService,
    private shopService: AccountService
  ) {
    this.sub = this.userService.store.subscribe((data) => {
      if(data) {
        this.currency = data.currency.toUpperCase();
      }
    });

    this.shopService.getPaymentSummary().then((data) => {
      this.summary = data;
    });
  }

  // MatPaginator Output
  changePage(event) {
    this.pageSize = event.pageSize;
    this.paymentListIndex = event.pageIndex + 1;
    this.changePaymentHistory();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  ngOnInit(): void {
    this.changePaymentHistory();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  //是否进行显示 tip
  changeShowTip(isShow: boolean): void {
    this.isShowTip = isShow;
  }


  //打开提现按钮
  openWithdrawMoney() {
    let dialogRef = this.dialog.open(AccountBalanceWithdrawMoneyDialogComponent, {
      disableClose: true,
      data: {
        availableBalance: this.summary.availableBalance,
        totalWithdrawals: this.summary.totalWithdrawals,
        isWithDraw: false,
        name: 'Luzhenqiang'
      }
    });

    let self = this;
    dialogRef.afterClosed().subscribe(result => {

      if(dialogRef.componentInstance.data.isWithDraw) {
        self.summary.availableBalance = dialogRef.componentInstance.data.availableBalance;
        self.summary.totalWithdrawals = dialogRef.componentInstance.data.totalWithdrawals;
        self.paymentListIndex = 1;
        self.changePaymentHistory();
      }
    });
  }

  changePaymentHistory() {
    let params = {
      page: this.paymentListIndex,
      page_size: this.pageSize
    };

    this.shopService.getPaymentHistory(params).then((data) => {
      this.length = data.count;
      this.paymentList = [...data.results];
    });
  }
}
