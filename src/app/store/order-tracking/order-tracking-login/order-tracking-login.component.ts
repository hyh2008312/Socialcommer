import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrderTrackingService } from '../order-tracking.service';

import { ForgetOrderNumberDialogComponent } from '../forget-order-number-dialog/forget-order-number-dialog.component';

@Component({
  selector: 'app-order-tracking-login',
  templateUrl: './order-tracking-login.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class OrderTrackingLoginComponent{

  loginGroup : FormGroup;

  loginErr : any = false;

  //存储错误信息
  formErrors = {
    'emailAddress': '',
    'orderNumber': ''
  };

  //错误对应的提示
  validationMessages = {
    'email': {
      'required': 'This field is required'
    },
    'number':{
      'required': 'This field is required'
    }
  };

  constructor(
    private fb: FormBuilder,
    private orderTrackingService: OrderTrackingService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginGroup = this.fb.group({
      email: ['', [
        Validators.required
      ]],
      number: ['', [
        Validators.required
      ]]
    });

    this.loginGroup.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  /**
   * 表单值改变时，重新校验
   * @param data
   */
  onValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.loginGroup.get(field);
      //表单字段已修改或无效
      if (control && control.dirty && !control.valid) {
        //取出对应字段可能的错误信息
        const messages = this.validationMessages[field];
        //从errors里取出错误类型，再拼上该错误对应的信息
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
          break;
        }
      }

    }

  }

  login() {
    if(this.loginGroup.invalid) {
      return;
    }
    let order = this.loginGroup.value;
    let self = this;
    self.orderTrackingService.getOrder(order).then((data) => {
      self.loginErr = false;
      self.reSetOrder(data);
      self.orderTrackingService.addOrder(data);
      self.router.navigate(['./detail'], {relativeTo: self.activatedRoute});
    }).catch((data) => {
      self.loginErr = data;
    });
  }

  forgetOrderNumber() {
    let dialogRef = this.dialog.open(ForgetOrderNumberDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  reSetOrder(order) {
    let supplierArray = [];
    let lineObject: any = {};
    for(let value of order.lines) {
      let index = supplierArray.findIndex((item) => {
        return item == value.supplierName;
      });
      if(index == -1) {
        if(!lineObject[value.supplierName]) {
          lineObject[value.supplierName] = [];
        }
        supplierArray.push(value.supplierName);
      }
      lineObject[value.supplierName].push(value);
    }
    let newLineArray = [];
    for(let k in lineObject) {
      let item = {
        supplier: k,
        lines: lineObject[k]
      };
      newLineArray.push(item);
    }
    order.supplyLine = newLineArray;
  }

}
