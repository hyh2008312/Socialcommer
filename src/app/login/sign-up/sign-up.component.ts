import { Component,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginService } from '../login.service';
import { ConstantService } from  '../../shared/services/constant/constant.service';
import { AuthenticationService } from  '../../shared/services/authentication/authentication.service';
import { UserService } from '../../shared/services/user/user.service';

import { Subject } from "rxjs/Subject";

import { LoginComponent } from '../login/login.component';

import { AuthService } from "angular2-social-login";
import { SystemConstant } from '../../config/app.api';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../login.scss']
})

export class SignUpComponent {

  step: number = 0;

  token: any;
  public systemConstant: SystemConstant = new SystemConstant();

  country: string;
  currency: string;
  storeName: any;

  public countries: Object[];
  public currencies: Object[];

  signUpGroup : FormGroup;
  storeForm : FormGroup;

  public signUpErr: any = false;
  public storeErr: any = false;

  sub: any;

  //存储错误信息
  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password' : '',
    'country' : '',
    'name': '',
    'currency': '',
    'displayName' : ''
  };

  //错误对应的提示
  validationMessages = {
    'firstName': {
      'required': 'This field is required.',
    },
    'lastName': {
      'required': 'This field is required.',
    },
    'email':{
      'required': 'This field is required.'
    },
    'password':{
      'required': 'This field is required.',
      'minlength': 'Password must contain at least 6 characters.'
    },
    'country':{
      'required': 'Password is required.'
    },
    'name': {
      'required': 'This field is required.'
    },
    'currency': {
      'required': 'This field is required.'
    },
    'displayName': {
      'required': 'This field is required.',
      'pattern': 'Permalink only lowercase alphanumeric and "-" allowed.'
    }
  };

  public dialogRef: MatDialogRef<SignUpComponent>;

  constructor(
    private router : Router,
    private service: LoginService,
    private fb: FormBuilder,
    private constant: ConstantService,
    private auth: AuthenticationService,
    private routerInfo :ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    public _auth: AuthService
  ) {
    this.signUpGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required
      ]],
      country: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });

    this.storeForm = this.fb.group({
      name: ['', Validators.required],
      currency: ['', Validators.required],
      displayName: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9\.-]*$')
      ]]
    });

    this.countries = this.constant.getCountries();
    this.currencies = this.constant.getCurrencies();

    this.signUpGroup.valueChanges.subscribe(data => this.onSignUpGroupValueChanged(data));
    this.storeForm.valueChanges.subscribe(data => this.onStoreFormValueChanged(data));

    this.auth.isAuthorized().subscribe((auth) => {
      if(auth && this.routerInfo.snapshot.queryParams["step"] == 1) {
        this.step = 1;
      }
    });
  }

  /**
   * 表单值改变时，重新校验
   * @param data
   */
  onSignUpGroupValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.signUpGroup.get(field);
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

  onStoreFormValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.storeForm.get(field);
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

  signUp() {
    if(!this.signUpGroup.valid) {
      return;
    }

    let self = this;
    self.service.signUp(this.signUpGroup.value).then((data) => {
      self.signUpErr = false;
      let loginObject = {
        username: self.signUpGroup.value.email,
        password: self.signUpGroup.value.password
      };
      self.service.login(loginObject).then((data)=>{
        self.auth.setAccessToken(data);
        self.step = 1;
      });
    }).catch((data) => {
      self.signUpErr = data;
    });
  }

  googleLogin(provider) {
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        console.log(data);
        //user data
        //name, image, uid, provider, uid, email, token (accessToken for Facebook & google, no token for linkedIn), idToken(only for google)
      }
    )
  }

  complete() {
    if(!this.storeForm.valid) {
      return;
    }

    let self = this;

    self.service.createStore(this.storeForm.value).then((data)=>{
      self.userService.getUser().then((data) => {
        self.userService.addUser(data);
        self.userService.addStore(data.store[0]);
        if(self.routerInfo.snapshot.queryParams["step"] == 1) {
          self.router.navigate(['/shop/toDoList']);
        } else {
          self.step = 2;
        }

      });
    }).catch((data) => {
      self.storeErr = data;
    });
  }

  openLogIn(): void {
    this.close();

    let dialogRef = this.dialog.open(LoginComponent, {
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

  ngOnDestroy(){
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

}
