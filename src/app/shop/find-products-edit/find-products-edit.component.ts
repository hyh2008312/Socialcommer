import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ENTER } from '@angular/cdk/keycodes';
const COMMA = 188;

@Component({
  selector: 'app-find-products-edit',
  templateUrl: './find-products-edit.component.html',
  styleUrls: ['../../store/store.scss', '../shop.scss']
})

export class FindProductsEditComponent implements OnInit {

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
      title: ['', [
        Validators.required
      ]],
      tags: ['', [
        Validators.required
      ]],
      sale_price: ['', [
        Validators.required
      ]],
      original_price: ['', [
        Validators.required
      ]]
    });
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
    this.router.navigate(['/shop/products']);
  }

}
