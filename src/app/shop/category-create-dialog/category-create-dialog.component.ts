import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-category-create-dialog',
  templateUrl: './category-create-dialog.component.html',
  styleUrls: ['../shop.scss']
})

export class CategoryCreateDialogComponent implements OnInit {

  categoryForm: FormGroup;
  categoryErr: any;

  constructor(
    public dialogRef: MatDialogRef<CategoryCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private shopService: ShopService
  ) {

    this.categoryForm = this.fb.group({
      name: ['', [
        Validators.required
      ]]
    });

    this.categoryForm.valueChanges.subscribe(data => this.onValueChanged(data));

  }

  //存储错误信息
  formErrors = {
    'name': ''
  };
  //错误对应的提示
  validationMessages = {
    'name': {
      'required': 'This field is required.'
    }
  };

  onValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.categoryForm.get(field);
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

  close():void {
    this.dialogRef.close();
  }

  changeCategory() {
    if(!this.categoryForm.valid) {
      return;
    }

    let self = this;
    this.shopService.createProductCategory(this.categoryForm.value).then((data) => {

      self.close();
      self.data.category.unshift(data);
    }).catch((data) => {
      self.categoryErr = data;
    });
  }

}
