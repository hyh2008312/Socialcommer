import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShopOrderTrackingService } from '../shop-order-tracking.service';

@Component({
  selector: 'app-order-cancel-item-dialog',
  templateUrl: './cancel-item-dialog.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class CancelItemDialogComponent implements OnInit {

  orderForm : FormGroup;

  orderFormErr: any = false;

  reasons: any = [{
    name: "Order Created by Mistake"
  }, {
    name: "I Don't Want It Anymore"
  }, {
    name: "Found Cheaper Item Somewhere Else"
  }, {
    name: "Need to Change My Order Information"
  }, {
    name: "Other"
  }];

  constructor(
    public dialogRef: MatDialogRef<CancelItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderTrackingService: ShopOrderTrackingService
  ) {
    this.orderForm = this.fb.group({
      reason: ['', Validators.required]
    });

    this.orderForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  //存储错误信息
  formErrors = {
    'reason': ''
  };
  //错误对应的提示
  validationMessages = {
    'reason': {
      'required': 'This field is required.'
    }
  };

  /**
   * 表单值改变时，重新校验
   * @param data
   */
  onValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.orderForm.get(field);
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

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  cancelItem() {
    if(this.orderForm.invalid) {
      return;
    }
    let order = {
      id: this.data.order.id,
      number: this.data.number,
      email: this.data.email,
      reason: this.orderForm.value.reason
    };
    let self = this;
    self.orderTrackingService.cancelOrder(order).then((data) => {
      self.data.isCancel = true;
      self.data.order = data;
    });
  }

}
