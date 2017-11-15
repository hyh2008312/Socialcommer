import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginService } from '../login.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { UserService } from '../../shared/services/user/user.service';

import { SignUpComponent } from '../sign-up/sign-up.component';
import { ResetPasswordComponent } from "../reset-password/reset-password.component";
import { InviteCodeComponent } from "../invite-code/invite-code.component";

import { GoogleSignInSuccess } from 'angular-google-signin';
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
      'required': 'This field is required',
      'minlength': 'Password must contain at least 6 characters.'
    }
  };

  public dialogRef: MatDialogRef<LoginComponent>;
  public systemConstant: SystemConstant = new SystemConstant();

  constructor(
    private router: Router,
    private service: LoginService,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.loginGroup = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });

    this.loginGroup.valueChanges.subscribe(data => this.onValueChanged(data));

  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    this.token = googleUser.getAuthResponse().id_token;
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
        if(data && data.store && data.store.length>0) {
          self.userService.addStore(data.store[0]);
        }

        if(data && data.isInvite) {
          self.close();
          self.router.navigateByUrl('shop/dashboard');

        } else {
          if(self.dialogRef) {
            self.dialogRef.close();
            self.openInviteCode();
          } else {
            self.router.navigateByUrl('cp/invitation');
          }
        }
      });
    }).catch((data) => {
      self.loginErr = data;
    });

  }

  googleLogin() {
    let self = this;
    self.service.googleLogin({
      id_token: this.token
    }).then((data) => {
      if(data) {
        self.loginErr = false;
        let token = {
          access_token: data.token.accessToken,
          refresh_token: data.token.refreshToken,
          expires_in: data.token.expiresIn,
        };
        self.auth.setAccessToken(token);
        self.userService.addUser(data.user);
        self.auth.inviteToken(data.user.isInvite);
        if(data.user && data.user.store && data.user.store.length > 0) {
          self.userService.addStore(data.user.store[0]);
        }

        if(data.user && data.user.isInvite) {
          self.close();
          self.router.navigate(['/shop/dashboard']);
        } else {
          if(self.dialogRef) {
            self.dialogRef.close();
            self.openInviteCode();
          } else {
            self.router.navigate(['/cp/invitation']);
          }
        }
      }

    });
  }

  openSignUp(): void {
    this.close();

    let dialogRef = this.dialog.open(SignUpComponent, {
      data: {}
    });

    dialogRef.componentInstance.dialogRef = dialogRef;

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openResetPassword(): void {
    this.close();

    let dialogRef = this.dialog.open(ResetPasswordComponent, {
      data: {}
    });

    dialogRef.componentInstance.dialogRef = dialogRef;

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openInviteCode(): void {
    this.close();

    let dialogRef = this.dialog.open(InviteCodeComponent, {
      data: {}
    });

    dialogRef.componentInstance.dialogRef = dialogRef;

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  close():void {
    if(this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
