import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../shop.scss']
})

export class SettingsComponent implements OnInit {

  settingForm : FormGroup;

  settingErr : any = false;

  country: string;

  countries = [{
    code: 'IN',
    value: 'INDIA'
  },{
    code: 'US',
    value: 'US'
  }];

  previewImgFile: Object;

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService
  ) {
    this.settingForm = this.fb.group({
      currentPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });

    this.settingForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  ngOnInit():void {

  }

  //存储错误信息
  formErrors = {
    'currentPassword': '',
    'password': '',
    'confirmPassword':''
  };
  //错误对应的提示
  validationMessages = {
    'currentPassword': {
      'required': 'CurrentPassword is required.',
      'minlength': 'Password must contain at least 6 characters.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must contain at least 6 characters.'
    },
    'confirmPassword':{
      'required': 'ConfirmPassword is required.',
      'minlength': 'ConfirmPassword must contain at least 6 characters.',
      'validateEqual': 'ConfirmPassword is different from Password.'
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
      const control = this.settingForm.get(field);
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

  doSubmit():void {
    if(!this.settingForm.valid) {
      return;
    }

    this.shopService.changePassword({
      currentPassword: this.settingForm.value.currentPassword,
      password: this.settingForm.value.password
    });
  }

}
