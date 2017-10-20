import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../login.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login.scss']
})

export class LoginComponent implements OnInit {

  loginGroup : FormGroup;

  loginErr : any = false;

  //存储错误信息
  formErrors = {
    'username': '',
    'password': ''
  };

  //错误对应的提示
  validationMessages = {
    'username': {
      'required': 'Username is required.',
    },
    'password':{
      'required': 'Password is required.',
      'minlength': 'Password must contain at least 6 characters.'
    }
  };

  constructor(
    private router: Router,
    private service: LoginService,
    private fb: FormBuilder,
    private auth: AuthenticationService
  ) {
    this.loginGroup = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
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

  ngOnInit():void {
  }

  login() {
    if(!this.loginGroup.valid) {
      return;
    }

    let self = this;
    self.service.login(this.loginGroup.value).then((data) => {
      self.loginErr = false;
      this.auth.setAccessToken(data);
      this.router.navigateByUrl('shop/1/dashboard');
    }).catch((data) => {
      self.loginErr = data;
    });

  }
}
