import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantService } from  '../../shared/services/constant/constant.service';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../shop.scss']
})

export class SettingsComponent implements OnInit {

  profileForm: FormGroup;
  settingForm : FormGroup;
  emailForm: FormGroup;

  profileErr: any = false;
  settingErr : any = false;
  emailErr: any = false;

  country: string;

  countries: Object[];

  previewImgFile: any = null;
  previewImgSrcs: any = null;

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    private constant: ConstantService,
    private userService: UserService
  ) {

    this.countries = this.constant.getCountries();

    this.profileForm = this.fb.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      country: ['', [
        Validators.required
      ]],
      biography: ['', [
        Validators.required
      ]]
    });

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

    this.profileForm.valueChanges.subscribe(data => this.onProfileFormValueChanged(data));
    this.settingForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.emailForm.valueChanges.subscribe(data => this.onEmailFormValueChanged(data));
  }

  ngOnInit():void {
    let self = this;
    self.shopService.getUserProfile().then((data) => {
      self.profileForm.setValue({
        firstName: data.firstName,
        lastName: data.lastName,
        country: data.country,
        biography: data.biography
      });
      self.previewImgSrcs = data.avatarUrl;
      self.previewImgFile = data.avatarId;
    });

    self.userService.currentUser.subscribe((data) => {
      if(data) {
        self.emailForm.setValue({
          email: data.email
        });
      }
    });

  }

  //存储错误信息
  formErrors = {
    'firstName': '',
    'lastName': '',
    'country': '',
    'biography': '',
    'currentPassword': '',
    'password': '',
    'confirmPassword': '',
    'email': ''
  };
  //错误对应的提示
  validationMessages = {
    'firstName': {
      'required': 'First name is required.'
    },
    'lastName': {
      'required': 'Last name is required.'
    },
    'country': {
      'required': 'Country is required.'
    },
    'biography': {
      'required': 'Biography is required.'
    },
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
  onProfileFormValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.profileForm.get(field);
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

  changeUserProfile(): void {
    if(!this.profileForm.valid) {
      return;
    }

    let user = this.profileForm.value;
    user.avatarId = this.previewImgFile;
    this.shopService.changeUserProfile(user).then((data) => {
      console.log(data)
    });
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
