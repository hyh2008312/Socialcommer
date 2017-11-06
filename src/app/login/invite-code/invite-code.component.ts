import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-invite-code',
  templateUrl: './invite-code.component.html',
  styleUrls: ['../login.scss']
})

export class InviteCodeComponent implements OnInit {

  inviteForm : FormGroup;
  inviteErr : any = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.inviteForm = this.fb.group({
      code: ['', [
        Validators.required
      ]]
    });

    this.inviteForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  ngOnInit():void {
  }

  //存储错误信息
  formErrors = {
    'code': ''
  };

  //错误对应的提示
  validationMessages = {
    'code': {
      'required': 'This field is required.'
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
      const control = this.inviteForm.get(field);
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

  validateCode() {
    if(!this.inviteForm.valid) {
      return;
    }
    let self = this;
    this.loginService.validateCode(this.inviteForm.value).then((data)=> {

    }).catch((data) => {
      self.inviteErr = data;
    });
  }

}
