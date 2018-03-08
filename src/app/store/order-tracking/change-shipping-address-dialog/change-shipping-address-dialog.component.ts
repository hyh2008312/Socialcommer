import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrderTrackingService } from '../order-tracking.service';

@Component({
  selector: 'app-order-change-shipping-address-dialog',
  templateUrl: './change-shipping-address-dialog.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class ChangeShippingAddressDialogComponent implements OnInit {

  shippingForm : FormGroup;
  shippingFormErr: any = false;
  countries:any;
  states: any;

  modified: boolean = false;

  postCodeName: string = 'Postal / Zip Code';
  phoneCode: string = '+1';

  constructor(
    public dialogRef: MatDialogRef<ChangeShippingAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderTrackingService: OrderTrackingService
  ) {

    this.orderTrackingService.getCountryList().then((data) => {

    });
    this.shippingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      city: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      postcode: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });

    this.shippingForm.valueChanges.subscribe(data => this.onValueChanged(data, this.shippingForm));

    if(this.data.order.shippingAddress) {
      this.countries = [];
      this.countries.push(this.data.order.shippingAddress.country);
      if(this.data.order.shippingAddress.country.code == 'IN') {
        this.postCodeName = 'Pincode';
        this.phoneCode = '+91';
      }
      this.shippingForm.patchValue({
        firstName: this.data.order.shippingAddress.firstName,
        lastName: this.data.order.shippingAddress.lastName,
        line1: this.data.order.shippingAddress.line1,
        line2: this.data.order.shippingAddress.line2,
        city: this.data.order.shippingAddress.city,
        countryId: this.data.order.shippingAddress.country.id,
        stateId: this.data.order.shippingAddress.state.id,
        postcode: this.data.order.shippingAddress.postcode,
        phoneNumber: this.data.order.shippingAddress.phoneNumber,
      });
      this.changeShippingState(this.data.order.shippingAddress.country.id);
    }
  }

  ngOnInit():void {

  }

  //存储错误信息
  formErrors = {
    'firstName': '',
    'lastName': '',
    'line1': '',
    'city': '',
    'countryId': '',
    'stateId': '',
    'postcode': '',
    'phoneNumber': ''
  };
  //错误对应的提示
  validationMessages = {
    'firstName': {
      'required': 'This field is required.',
    },
    'lastName': {
      'required': 'This field is required.',
    },
    'line1': {
      'required': 'This field is required.',
    },
    'city': {
      'required': 'This field is required.',
    },
    'countryId': {
      'required': 'This field is required.',
    },
    'stateId': {
      'required': 'This field is required.',
    },
    'postcode': {
      'required': 'This field is required.',
    },
    'phoneNumber': {
      'required': 'This field is required.',
    }
  };

  /**
   * 表单值改变时，重新校验
   * @param data
   */
  onValueChanged(data, form) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = form.get(field);
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

  changeShippingState($event) {
    let cid = $event;
    this.orderTrackingService.getStateList({
      cid
    }).then((data)=> {
      this.states = data;
    });
  }

  close():void {
    this.dialogRef.close();
  }

  changeAddress() {
    if(this.shippingForm.invalid) {
      return;
    }
    let order = this.shippingForm.value;
    order.id = this.data.order.id;
    order.email = this.data.email;
    order.number = this.data.number;

    let self = this;
    self.orderTrackingService.changeAddress(order).then((data) => {
      self.shippingFormErr = false;
      self.data.isAddressChange = true;
      self.data.order = data;
    }).catch((data) => {
      self.shippingFormErr = data;
    });
  }

}
