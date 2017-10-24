import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantService } from  '../../shared/services/constant/constant.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../shop.scss']
})

export class SettingsComponent implements OnInit {

  settingForm : FormGroup;
  emailForm: FormGroup;

  settingErr : any = false;
  emailErr: any = false;

  country: string;

  countries: Object[];

  previewImgFile: Object;

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    private constant: ConstantService
  ) {

    this.countries = this.constant.getCountries();

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

    this.emailForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });

    this.settingForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.emailForm.valueChanges.subscribe(data => this.onEmailFormValueChanged(data));
  }

  ngOnInit():void {

  }

  //存储错误信息
  formErrors = {
    'currentPassword': '',
    'password': '',
    'confirmPassword':'',
    'email': ''
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
    },
    'email':{
      'required': 'Email is required.',
      'email': 'Please enter a valid email address.'
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

  onEmailFormValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.emailForm.get(field);
      //表单字段已修改或无效
      if (control && control.dirty && !control.valid) {
        //取出对应字段可能的错误信息
        const messages = this.validationMessages[field];
        //从errors里取出错误类型，再拼上该错误对应的信息
        for(const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
          break;
        }
      }

    }

  }

  changeEmail(): void {
    if(!this.emailForm.valid) {
      return;
    }

    this.shopService.changeEmail({
      email: this.emailForm.value.email
    });
  }

  changePassword():void {
    if(!this.emailForm.valid) {
      return;
    }

    this.shopService.changePassword({
      currentPassword: this.settingForm.value.currentPassword,
      password: this.settingForm.value.password
    });
  }

}
