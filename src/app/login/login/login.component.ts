import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../login.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { UserService } from '../../shared/services/user/user.service';

import { AuthService } from "angular2-social-login";
import { SystemConstant } from '../../config/app.api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login.scss']
})

export class LoginComponent implements OnInit {

  loginGroup : FormGroup;

  loginErr : any = false;

  token: any;

  //存储错误信息
  formErrors = {
    'username': '',
    'password': ''
  };

  //错误对应的提示
  validationMessages = {
    'username': {
      'required': 'This field is required'
    },
    'password':{
      'required': 'This field is required'
    }
  };

  facebookLoginSub: any;
  googleLoginSub: any;

  constructor(
    private router: Router,
    private service: LoginService,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private userService: UserService,
    public _auth: AuthService,
    private changeDetectorRef:ChangeDetectorRef
  ) {
    this.loginGroup = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
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

  ngOnInit():void {

  }

  login() {
    if(!this.loginGroup.valid) {
      return;
    }

    let self = this;
    let _setLogin = false;
    self.service.login(this.loginGroup.value).then((data) => {
      self.loginErr = false;
      self.auth.setAccessToken(data);
      self.userService.getUser().then((data) => {
        self.userService.addUser(data);
        self.auth.inviteToken(data.isInvite);
       /* if(data && data.store && data.store.length>0) {
          self.userService.addStore(data.store[0]);
          if(data && data.isInvite) {
            self.router.navigate(['/shop/dashboard']);
          } else {
            self.router.navigate(['/account/invitation']);
          }
        } else {
          self.router.navigate(['/account/signup'], {queryParams: {step: 1}});
        }*/
        self.router.navigate(['/shop/dashboard']);
      });
    }).catch((data) => {
      self.loginErr = data;
    });

  }

  googleLogin(provider) {
    let self = this;
    let first = false;
    this.googleLoginSub = this._auth.login(provider).subscribe(
      (data) => {
        if(data) {
          self.service.googleLogin(data).then((res) => {
            self.loginErr = false;
            if(res && !first) {
              first = true;

              let token = {
                access_token: res.token.accessToken,
                refresh_token: res.token.refreshToken,
                expires_in: res.token.expiresIn
              };
              self.auth.setAccessToken(token);
              self.userService.addUser(res.user);
              self.auth.inviteToken(res.user.isInvite);
              if(res.user.firstLogin) {
                self.router.navigate(['/account/signup'], {queryParams:{tab: 'settingProfile'}});
              } else {
                if(res.user && res.user.store && res.user.store.length>0) {
                  self.userService.addStore(res.user.store[0]);

                  if(res.user && res.user.isInvite) {
                    self.router.navigate(['/shop/dashboard']);

                  } else {
                    self.router.navigate(['/account/invitation']);
                  }
                } else {
                  self.router.navigate(['/account/signup'], {queryParams: {step: 1}});
                }

              }
              self.changeDetectorRef.markForCheck();
              self.changeDetectorRef.detectChanges();
            }
          });
        }
      }
    )
  }

  facebookLogin(provider) {
    let self = this;
    let first = false;
    this.facebookLoginSub = this._auth.login(provider).subscribe(
        (data) => {
          if(data) {
            self.service.facebookLogin(data).then((res) => {
              self.loginErr = false;
              if(res && !first) {
                first = true;

                let token = {
                  access_token: res.token.accessToken,
                  refresh_token: res.token.refreshToken,
                  expires_in: res.token.expiresIn
                };
                self.auth.setAccessToken(token);
                self.userService.addUser(res.user);
                self.auth.inviteToken(res.user.isInvite);
                if(res.user.firstLogin) {
                  self.router.navigate(['/account/signup'], {queryParams:{tab: 'settingProfile'}});
                } else {
                  if(res.user && res.user.store && res.user.store.length>0) {
                    self.userService.addStore(res.user.store[0]);

                    if(res.user && res.user.isInvite) {
                      self.router.navigate(['/shop/dashboard']);

                    } else {
                      self.router.navigate(['/account/invitation']);
                    }
                  } else {
                    self.router.navigate(['/account/signup'], {queryParams: {step: 1}});
                  }
                }
                self.changeDetectorRef.markForCheck();
                self.changeDetectorRef.detectChanges();
              }
            });
          }
        }
      )
  }


  ngOnDestroy(){
    if(this.googleLoginSub) {
      this.googleLoginSub.unsubscribe();
    }
    if(this.facebookLoginSub) {
      this.facebookLoginSub.unsubscribe();
    }
  }
}
