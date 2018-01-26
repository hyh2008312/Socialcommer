import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrderTrackingService } from '../order-tracking.service';

import { ReturnRequestDialogComponent } from '../return-request-dialog/return-request-dialog.component';

@Component({
  selector: 'app-order-return-progress',
  templateUrl: './return-progress.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class ReturnProgressComponent{

  claimGroup : FormGroup;

  loginErr : any = false;

  //存储错误信息
  formErrors = {
    'claim': ''
  };

  //错误对应的提示
  validationMessages = {
    'claim': {
      'required': 'This field is required'
    }
  };

  constructor(
    private fb: FormBuilder,
    private orderTrackingService: OrderTrackingService,
    private dialog: MatDialog
  ) {

  }

  /**
   * 表单值改变时，重新校验
   * @param data
   */
  onValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.claimGroup.get(field);
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


  editRequest() {
    let dialogRef = this.dialog.open(ReturnRequestDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
