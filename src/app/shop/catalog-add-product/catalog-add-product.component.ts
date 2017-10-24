import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ENTER } from '@angular/cdk/keycodes';
const COMMA = 188;

@Component({
  selector: 'app-catalog-add-product',
  templateUrl: './catalog-add-product.component.html',
  styleUrls: ['../../store/store.scss','../shop.scss']
})

export class CatalogAddProductComponent implements OnInit {

  public ngxCropperConfig: Object;

  productForm : FormGroup;

  ngOnInit() {

  }

  constructor(
    public router: Router,
    private fb: FormBuilder
  ) {
    this.ngxCropperConfig = {
      url: null, // image server url
      maxsize: 512000, // image max size, default 500k = 512000bit
      title: 'Apply your image size and position', // edit modal title, this is default
      uploadBtnName: 'Upload Image', // default Upload Image
      uploadBtnClass: null, // default bootstrap styles, btn btn-primary
      cancelBtnName: 'Cancel', // default Cancel
      cancelBtnClass: null, // default bootstrap styles, btn btn-default
      applyBtnName: 'Apply', // default Apply
      applyBtnClass: null, // default bootstrap styles, btn btn-primary
      fdName: 'file', // default 'file', this is  Content-Disposition: form-data; name="file"; filename="fire.jpg"
      aspectRatio: 1 / 1// default 1 / 1, for example: 16 / 9, 4 / 3 ...
    };

    this.productForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      tags: ['', [
        Validators.required
      ]],
      salePrice: ['', [
        Validators.required
      ]],
      originalPrice: ['', [
        Validators.required
      ]]
    });

    this.productForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  //存储错误信息
  formErrors = {
    'name': '',
    'tags': '',
    'salePrice':'',
    'originalPrice': ''
  };
  //错误对应的提示
  validationMessages = {
    'name': {
      'required': 'Name is required.'
    },
    'tags': {
      'required': 'Tag is required.'
    },
    'salePrice':{
      'required': 'Sale price is required.'
    },
    'originalPrice':{
      'required': 'Original price is required.'
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
      const control = this.productForm.get(field);
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

  previewImgFile: Object;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  tags = [];

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our person
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    let index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  public editor;
  public editorContent = "insert content...";

  close():void {
    this.router.navigate(['/shop/listings']);
  }

  create() {

  }
}
