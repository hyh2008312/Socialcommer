import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ShopService } from '../shop.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SnackBarSuccessComponent } from '../snack-bar-success/snack-bar-success.component';

@Component({
  selector: 'app-setting-password-dialog',
  templateUrl: './setting-password-dialog.component.html',
  styleUrls: ['../shop.scss']
})

export class SettingsPasswordDialogComponent implements OnInit {

  settingForm : FormGroup;

  settingErr : any = false;

  constructor(
    public dialogRef: MatDialogRef<SettingsPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private shopService: ShopService,
    public snackBar: MatSnackBar
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
    'confirmPassword': ''
  };
  //错误对应的提示
  validationMessages = {
    'currentPassword': {
      'required': 'This field is required.',
      'minlength': 'Password must contain at least 6 characters.'
    },
    'password': {
      'required': 'This field is required.',
      'minlength': 'Password must contain at least 6 characters.'
    },
    'confirmPassword':{
      'required': 'This field is required.',
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


  close():void {
    this.dialogRef.close();
  }

  changePassword():void {
    if(!this.settingForm.valid) {
      return;
    }

    let self = this;
    self.shopService.changePassword({
      currentPassword: this.settingForm.value.currentPassword,
      password: this.settingForm.value.password
    }).then((data) => {
      self.settingErr = false;
      self.close();
      self.openSnackBar();
    }).catch((data) => {
      self.settingErr = data;
    });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }

}
