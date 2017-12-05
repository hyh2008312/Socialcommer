import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShopService } from '../shop.service';
import { ConstantService } from  '../../shared/services/constant/constant.service';
import { UserService } from  '../../shared/services/user/user.service';

import { MatSnackBar } from '@angular/material';
import { SnackBarSuccessComponent } from '../snack-bar-success/snack-bar-success.component';
import { SettingsPasswordDialogComponent } from '../setting-password-dialog/setting-password-dialog.component'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../shop.scss']
})

export class SettingsComponent implements OnInit {

  profileForm: FormGroup;
  emailForm: FormGroup;

  profileErr: any = false;
  emailErr: any = false;

  country: string;

  countries: Object[];

  previewImgFile: any = null;
  previewImgSrcs: any = null;

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    private constant: ConstantService,
    private userService: UserService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog
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
      biography: [''],
      youtube: [''],
      instagram: [''],
      facebook: [''],
      twitter: ['']
    });

    this.emailForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });

    this.profileForm.valueChanges.subscribe(data => this.onProfileFormValueChanged(data));
    this.emailForm.valueChanges.subscribe(data => this.onEmailFormValueChanged(data));
  }

  ngOnInit():void {
    let self = this;
    self.shopService.getUserProfile().then((data) => {
      self.profileForm.setValue({
        firstName: data.firstName,
        lastName: data.lastName,
        country: data.country,
        biography: data.biography,
        youtube: '',
        instagram: '',
        facebook: '',
        twitter: ''
      });
      self.previewImgSrcs = data.avatar;
      self.previewImgFile = data.avatar;
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
    'email': ''
  };
  //错误对应的提示
  validationMessages = {
    'firstName': {
      'required': 'This field is required.'
    },
    'lastName': {
      'required': 'This field is required.'
    },
    'country': {
      'required': 'This field is required.'
    },
    'email':{
      'required': 'This field is required.',
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
    user.avatar = this.previewImgFile;
    let self = this;
    this.shopService.changeUserProfile(user).then((data) => {
      self.openSnackBar();
      self.userService.getUser().then((data)=> {
        self.userService.addUser(data);
      })
    });
  }

  changeEmail(): void {
    if(!this.emailForm.valid) {
      return;
    }

    let self = this;
    self.shopService.changeEmail({
      email: this.emailForm.value.email
    }).then((data) => {
      self.openSnackBar();
    });
  }

  passwordDialog() {
    let dialogRef = this.dialog.open(SettingsPasswordDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }

}
